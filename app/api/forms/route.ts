import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Form } from "@/types/types";

//create a form api
export async function POST(req: NextRequest) {
  try {
    const { title, description, questions }: Form = await req.json();

    //validation
    if (!title || !questions || questions.length === 0) {
      return new NextResponse("Invalid form data, Please review your form", {
        status: 400,
      });
    }

    // Generate a unique ID for the user
    const userId: string = "user_2yJmJm0tlXrXbuO7REU7s9coEiF";

    //save form in the database
    const form = await prisma.form.create({
      data: {
        title,
        description,
        userId,
        questions: {
          create: questions.map((q: { text: string; order: number }) => ({
            text: q.text,
            order: q.order,
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
