"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface ShareFormLinkProps {
  formId: string;
}

export default function ShareFormLink({ formId }: ShareFormLinkProps) {
  const shareUrl = `${window.location.origin}/forms/${formId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={shareUrl}
        readOnly
        className="flex-1 p-2 border rounded-md bg-muted"
      />
      <Button onClick={handleCopy} size="icon" variant="outline">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
