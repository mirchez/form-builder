"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteFormButtonProps {
  formId: string;
}

export default function DeleteFormButton({ formId }: DeleteFormButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    try {
      setIsPending(true);
      const response = await fetch(`/api/forms/${formId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete form");
      }

      toast.success("Form deleted successfully");
      router.push("/dashboard/forms");
      router.refresh();
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Failed to delete form");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
