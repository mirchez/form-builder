import FormResponse from "@/components/form/form-response";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Inbox } from "lucide-react";

export default async function FormResponsesPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
      userId,
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

  console.log({ form });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Link href={`/dashboard/forms/${formId}`}>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Responses
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {form.title} -{" "}
                {form.responses.length === 0
                  ? "No responses yet"
                  : `${form.responses.length} Responses`}
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Link href={`/dashboard/forms/${formId}`}>Back to Form</Link>
          </Button>
        </div>

        {form.responses.length === 0 ? (
          <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-200/50 dark:border-slate-700/50 shadow-xl text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Inbox className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No Responses Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Share your form to start collecting responses from your users.
            </p>
            <Button
              asChild
              className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Link href={`/dashboard/forms/${formId}`}>Share Form</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {form.responses.map((response, index) => (
              <div
                key={response.id}
                className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Response #{form.responses.length - index}
                  </h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(response.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <FormResponse response={response} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
