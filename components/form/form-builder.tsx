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
import { useRouter } from "next/navigation";
import { useFormValidation } from "@/hooks/use-form-validation";
import { FormSchema } from "@/utils/validations/form";

const initialValue: Form = {
  title: "",
  description: "",
  questions: [
    {
      id: "1",
      text: "",
      order: 0,
    },
  ],
};

export const FormBuilder = () => {
  const router = useRouter();
  const [form, setForm] = useState<Form>(initialValue);
  const [isPending, setIsPending] = useState(false);
  const { errors, validateForm } = useFormValidation();

  //add hooks for logic
  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: uuidv4(),
          text: "",
          type: "text",
          required: false,
          order: prev.questions.length,
        },
      ],
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

    // Validate form using Zod
    if (!validateForm(form as FormSchema)) {
      toast.error("Form is not valid, please review your form");
      return;
    }

    try {
      setIsPending(true);

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data: Form = await response.json();
      toast.success("Form created!", {
        description:
          "Your form has been saved. You can now share your form with others",
      });
      router.push(`/dashboard/forms/${data.id}`);
      router.refresh();
    } catch (error) {
      console.log("Error creating form:", error);
      toast.error("Ups! Something went wrong, please try again");
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
            required
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter title"
            className={`mt-1 ${errors["title"] ? "border-red-500" : ""}`}
          />
          {errors["title"] && (
            <p className="text-red-500 text-sm mt-1">{errors["title"][0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Enter Form Description"
            className={`mt-1 resize-none ${
              errors["description"] ? "border-red-500" : ""
            }`}
          />
          {errors["description"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["description"][0]}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Questions</h3>
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
                required
                id={question.id}
                value={question.text}
                onChange={(e) => handleQuestionChange(idx, e.target.value)}
                placeholder="Enter Question"
                className={`resize-none mt-1 ${
                  errors[`questions.${idx}.text`] ? "border-red-500" : ""
                }`}
              />
              {errors[`questions.${idx}.text`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`questions.${idx}.text`][0]}
                </p>
              )}
            </div>
          ))}
      </div>

      {form.questions.length > 0 ? (
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
      ) : (
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};
