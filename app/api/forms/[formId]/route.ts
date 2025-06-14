import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Form, Questions } from "@/types/types";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!form) {
      return new NextResponse("Form not found", { status: 404 });
    }

    await prisma.form.delete({
      where: {
        id: formId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting form:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;

    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });

    if (!form) {
      return new NextResponse("Form not found", { status: 404 });
    }

    const body = await req.json();
    const { title, description, questions } = body as Form;

    //validations of request
    if (!title || !questions) {
      return new NextResponse("Not valid form, please review your form", {
        status: 400,
      });
    }

    //update form
    const updatedForm = await prisma.form.update({
      where: {
        id: formId,
      },
      data: {
        title,
        description,
      },
    });

    //replacing all existed questions with new ones
    await prisma.question.deleteMany({
      where: {
        formId,
      },
    });

    await prisma.formResponse.deleteMany({
      where: {
        formId,
      },
    });

    await prisma.question.createMany({
      data: questions.map((q: Questions) => ({
        text: q.text,
        formId,
        order: q.order,
      })),
    });

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error("Error updating form:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
