import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { DialogCloseButton } from "@/components/form/share-form-link";
import { ArrowLeft, Edit, Eye, Share2, MessageSquare } from "lucide-react";

const FormDetailsPage = async ({
  params,
}: {
  params: Promise<{ formId: string }>;
}) => {
  const { formId } = await params;
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const formUrl: string = `${
    process.env.NEXT_PUBLIC_APP_URL || ""
  }/forms/${formId}`;

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
      _count: {
        //aggregation function, see more on prisma docs
        select: {
          responses: true,
        },
      },
    },
  });

  if (!form || form.userId !== userId) {
    redirect("/dashboard/forms");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Link href="/dashboard/forms">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {form?.title}
              </h1>
              {form.description && (
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                  {form.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Link
                href={`/dashboard/forms/${formId}/edit`}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Link
                href={`/dashboard/forms/${formId}/responses`}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Responses ({form._count.responses})
              </Link>
            </Button>
          </div>
        </div>

        {/* Share Form Card */}
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Share2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Share your form
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Share this link and start to collect responses
            </p>
          </div>
          <div className="p-6">
            <div className="flex bg-slate-50/50 dark:bg-slate-700/30 items-center justify-between p-4 rounded-xl border border-slate-200/30 dark:border-slate-600/30">
              <p className="truncate text-slate-700 dark:text-slate-300 font-mono text-sm">
                {formUrl}
              </p>
              <DialogCloseButton link={formUrl} />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Questions ({form.questions.length})
              </h2>
            </div>
          </div>
          <div className="p-6">
            {form.questions.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  No questions added yet
                </p>
                <Button
                  asChild
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <Link href={`/dashboard/forms/${formId}/edit`}>
                    Add Questions
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {form.questions.map((question, idx) => (
                  <div
                    key={question.id}
                    className="group p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl border border-slate-200/30 dark:border-slate-600/30 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white leading-relaxed">
                        {question.text}
                      </p>
                    </div>
                    {/* <div className="mt-2 ml-9">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-200/50 dark:bg-slate-600/30 text-slate-600 dark:text-slate-400">
                        {question.type}
                      </span>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetailsPage;
