import { FormBuilder } from "@/components/form/form-builder";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!form) {
    redirect("/dashboard/forms");
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/forms/${formId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Form</h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
        <FormBuilder form={form} />
      </div>
    </div>
  );
}
