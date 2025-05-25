import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { formId, answers, respondentName, respondentEmail } = await req.json();
  //check if form exist
  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      questions: true,
    },
  });

  if (!form) return new NextResponse("Form does not exist!", { status: 404 });
  //validate answers
  if (!answers || !Array.isArray(answers))
    return new NextResponse("Answers are required!", { status: 404 });

  //form response
  const formResponse = await prisma.formResponse.create({
    data: {
      formId,
      respondentName,
      respondentEmail,
      answers: {
        create: answers,
      },
    },
  });

  return NextResponse.json(formResponse);
}
