"use server";
import { z } from "zod";
import { State } from "@/types/types";

const questionSchema = z
  .object({
    id: z.string(),
    text: z.string().min(1),
  })
  .required();

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  questions: z.array(questionSchema).min(1),
});

export async function createForm(prevState: State, form: FormData) {
  const questionsData = form.get("questions");
  const parsedQuestions = JSON.parse(questionsData as string);

  //validate the form
  const validatedFields = formSchema.safeParse({
    title: form.get("title"),
    description: form.get("description"),
    questions: parsedQuestions,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "An error occurred while creating the form.",
    };
  }

  try {
    //code to the database
    await new Promise((resolve) => setTimeout(resolve, 3000));
  } catch (error) {}

  // Aquí iría la lógica para guardar el formulario
  return { message: "Form created successfully" };
}
