import { z } from "zod";

export const questionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(4, "Question text is too short"),
  order: z.number().min(0),
});

export const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(4, "Title is required").max(100, "Title is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
export type QuestionSchema = z.infer<typeof questionSchema>;
