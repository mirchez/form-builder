"use client";
import { Questions } from "@/types/types";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type FormPreviewProps = {
  form: {
    id: string;
    title: string;
    description: string | null;
    questions: Questions[];
  };
};

type Answer = {
  questionId: string;
  text: string;
};

const FormPreview = ({ form }: FormPreviewProps) => {
  const [name, setName] = useState("");
  const [emai, setEmail] = useState("");
  const [answer, setAnswer] = useState<Answer[]>(() =>
    form.questions.map((q) => ({ questionId: q.id, text: "" }))
  ); //we ensure that the function is only call one time.

  const handleAnswerChange = (formQuestionId: string, value: string) => {
    setAnswer((prev) => {
      return prev.map((a) =>
        a.questionId === formQuestionId ? { ...a, text: value } : a
      );
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //validate required fields
  };

  return (
    <div className="mx-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{form.title}</h1>
        {form.description && (
          <p className="mt-2 text-gray-600">{form.description}</p>
        )}
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label htmlFor="Name">Name (optional)</label>
          <Input
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="Email">Email (optional)</label>
          <Input
            type="email"
            placeholder="Enter Your Email"
            value={emai}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="space-y-6">
          {form.questions
            .sort((a, b) => a.order - b.order)
            .map((q, i) => (
              <div className="space-y-2" key={q.id}>
                <label htmlFor="Question">
                  {i + 1}. {q.text}
                </label>
                <Textarea
                  placeholder="Your Answer"
                  value={answer.find((a) => a.questionId === q.id)?.text || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                ></Textarea>
              </div>
            ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit Response</Button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
