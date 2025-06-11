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
import { Checkbox } from "@/components/ui/checkbox";

interface FormBuilderProps {
  form?: {
    id: string;
    title: string;
    description: string | null;
    questions: {
      id: string;
      text: string;
      order: number;
    }[];
  };
}

export function FormBuilder({ form }: FormBuilderProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<Form>({
    title: form?.title ?? "",
    description: form?.description ?? "",
    questions: form?.questions ?? [],
  });

  const [isPending, setIsPending] = useState(false);
  const { errors, validateForm } = useFormValidation();

  //add hooks for logic
  const addQuestion = () => {
    setFormState((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: uuidv4(),
          text: "",
          type: "text",
          required: false,
          order: prev.questions.length + 1,
        },
      ],
    }));
  };

  const removeQuestion = (idx: number) => {
    const newQuestions = formState.questions.filter((_, i) => i !== idx);
    setFormState((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const handleQuestionChange = (idx: number, newText: string) => {
    const updatedQuestions = [...formState.questions];
    updatedQuestions[idx].text = newText;
    setFormState((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const onHandleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form using Zod
    if (!validateForm(formState as FormSchema)) {
      toast.error("Form is not valid, please review your form");
      return;
    }

    try {
      setIsPending(true);
      const url: string = form?.id ? `/api/forms/${form.id}` : "/api/forms";
      const method: string = form?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data: Form = await response.json();
      toast.success(form?.id ? "Form Updated" : "Form Created", {
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
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
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
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
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
        {formState.questions.length > 0 &&
          formState.questions.map((question, idx) => (
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
              <div className="flex items-center gap-1 justify-end">
                <Checkbox />
                <p className="text-gray-500">
                  Make it a yes or no question (still in process)
                </p>
              </div>
              {errors[`questions.${idx}.text`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`questions.${idx}.text`][0]}
                </p>
              )}
            </div>
          ))}
      </div>

      {formState.questions.length > 0 ? (
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
            {isPending ? "Updating..." : "Update"}
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
}
