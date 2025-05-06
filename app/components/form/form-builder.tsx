"use client";

import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Form } from "@/types/types";
import { createForm } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const initialValue: Form = {
  title: "",
  description: "",
  questions: [
    {
      id: "1",
      text: "",
    },
  ],
};

export const FormBuilder = () => {
  const router = useRouter();
  const [form, setForm] = useState<Form>(initialValue);
  const [isPending, setIsPending] = useState(false);

  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, { id: uuidv4(), text: "" }],
    }));
  };

  const removeQuestion = (idx: number) => {
    const newQuestions = form.questions.filter((_, i) => i !== idx);
    setForm((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const handleQuestionChange = (idx: number, newText: string) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[idx].text = newText;
    setForm((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //validate form
    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    //validate questions
    const isQuestionEmpty = form.questions.some(
      (question) => !question.text.trim()
    );
    if (isQuestionEmpty) {
      toast.error("Please fill all the questions fields");
      return;
    }

    try {
      setIsPending(true);
      //imitate api call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={onHandleSubmit}>
      <div className="space-y-4">
        {/* Title and Description */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter title"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter Form Description"
            className="mt-1 resize-none"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Questions</h3>
          {/*Reminder: We add type="button" so it does not submit the form, by default button in forms are made for sending data to the action. */}
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer"
            onClick={addQuestion}
          >
            <Plus className="w-4 h-4" />
            Add Question
          </Button>
        </div>

        {/* Questions */}
        {form.questions.length > 0 &&
          form.questions.map((question, idx) => (
            <div key={question.id} className="space-y-2 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <Label htmlFor={`question-${idx + 1}`}>
                  Question {idx + 1}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => removeQuestion(idx)}
                >
                  <Minus className="w-4 h-4" />
                  Remove
                </Button>
              </div>
              <Textarea
                id={question.id}
                value={question.text}
                onChange={(e) => handleQuestionChange(idx, e.target.value)}
                placeholder="Enter Question"
                className="resize-none mt-1"
              />
            </div>
          ))}
      </div>

      {/*Submit and Cancel Button TODO: add pending animation*/}

      {form.questions.length > 0 && (
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Form"}
          </Button>
        </div>
      )}
    </form>
  );
};
