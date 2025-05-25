"use client";
import { Questions } from "@/types/types";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Answer[]>(() =>
    form.questions.map((q) => ({ questionId: q.id, text: "" }))
  ); //we ensure that the function is only call one time.
  const router = useRouter();

  const handleAnswerChange = (formQuestionId: string, value: string) => {
    setAnswers((prev) => {
      return prev.map((a) =>
        a.questionId === formQuestionId ? { ...a, text: value } : a
      );
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //validate required fields
    const emptyAnswers = answers.some((a) => !a.text.trim());
    if (emptyAnswers) {
      toast.error("All the questions must be answered");
      return;
    }

    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: form.id,
          answers,
          respondentEmail: email,
          respondentName: name,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success("Response Submitted!", {
        description:
          "Thanks for completing the form, we really apreciate your opinion!",
      });

      //reset form
      setEmail("");
      setName("");
      setAnswers(form.questions.map((q) => ({ questionId: q.id, text: "" })));

      //redirect user
      router.replace("/");
    } catch (error) {
      console.log("Error submitting: ", error);
      toast.error("Error Saving Responses - Please Try Again.", {
        description: "Something went wrong, please try again!",
      });
    }
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
            value={email}
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
                  value={answers.find((a) => a.questionId === q.id)?.text || ""}
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
