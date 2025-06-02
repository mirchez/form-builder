import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import FormList from "@/components/form/form-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function FormPage() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const forms = await prisma.form.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              My Forms
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
              Create an amazing form to collect data from your users
            </p>
          </div>
          <Button
            asChild
            className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white"
          >
            <Link
              href="/dashboard/forms/create"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Form
            </Link>
          </Button>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <FormList forms={forms} />
        </div>
      </div>
    </div>
  );
}
