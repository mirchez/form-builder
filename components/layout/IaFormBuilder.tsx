"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const IaFormBuilder = () => {
  const [aiPrompt, setAiPrompt] = useState("");

  const handleIaPropmt = () => {
    toast.warning("AI Tool Not Aviable In Demo Yet, Coming Soon!");
  };

  return (
    <Card className="mt-8 shadow-lg border-2 border-dashed border-border hover:border-primary transition-colors">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            AI Form Builder
          </h3>
          <p className="text-muted-foreground">
            Describe your form requirements and let AI create it for you
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Textarea
            placeholder="Example: Create a customer feedback form with rating scales, multiple choice questions about our service quality, and an optional comment section..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="min-h-[120px] mb-4 resize-none"
          />
          <Button
            className="w-full"
            size="lg"
            disabled={!aiPrompt.trim()}
            onClick={handleIaPropmt}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Build Form with AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
