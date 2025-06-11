import FormResponse from "@/components/form/form-response";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Inbox } from "lucide-react";

export default async function FormResponsesPage({
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
      responses: {
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
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
        <h1 className="text-3xl font-bold">Form Responses</h1>
      </div>

      {form.responses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No responses yet
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Share your form to start collecting responses
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {form.responses.map((response) => (
            <FormResponse key={response.id} response={response} />
          ))}
        </div>
      )}
    </div>
  );
}
