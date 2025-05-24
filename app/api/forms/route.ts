import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

//create a form api
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description, questions } = await req.json();

    //validation
    if (!title || !questions || questions.length === 0) {
      return new NextResponse("Invalid form data, Please review your form", {
        status: 400,
      });
    }

    //save form in the database
    const form = await prisma.form.create({
      data: {
        title,
        description,
        userId,
        questions: {
          create: questions.map((q: { text: string }, idx: number) => ({
            text: q.text,
            order: idx,
          })),
        },
      },
      include: {
        questions: true, //include questions in the response
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error creating form:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
