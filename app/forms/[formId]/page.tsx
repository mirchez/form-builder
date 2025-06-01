import FormPreview from "@/components/form/form-preview";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PublicFormPage({
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
        orderBy: { order: "asc" },
      },
    },
  });

  if (!form) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500 py-12">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <FormPreview form={form} />
        </div>
      </div>
    </div>
  );
}
