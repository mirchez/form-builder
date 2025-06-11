import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mails, BookPlus, Eye, Plus, BarChart3 } from "lucide-react";
import prisma from "@/lib/db";
import { IaFormBuilder } from "@/components/layout/IaFormBuilder";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/**
 * Dashboard page component that displays an overview of forms and responses
 */
export default async function Dashboard() {
  const userId: string = "user_2yJmJm0tlXrXbuO7REU7s9coEiF";

  const formsCount = await prisma.form.count({
    where: {
      userId,
    },
  });

  const responseCount = await prisma.formResponse.count({
    where: {
      form: {
        userId,
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const recentForm = await prisma.form.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header section with welcome message and theme toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Welcome back, {user?.name || "user"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Manage your forms and track responses with ease
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Summary cards grid - displays key metrics and actions */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Forms summary card */}
          <div className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Your Forms
                </h2>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {formsCount}
              </p>
              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white border-0 rounded-xl transition-all duration-200"
              >
                <Link
                  href="/dashboard/forms"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View All Forms
                </Link>
              </Button>
            </div>
          </div>

          {/* Responses summary card */}
          <div className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Total Responses
                </h2>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {responseCount}
              </p>
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Across all your forms
              </div>
            </div>
          </div>

          {/* Create new form card */}
          <div className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Create New
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Start building a new form
              </p>
              <Button
                asChild
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white border-0 rounded-xl transition-all duration-200"
              >
                <Link
                  href="/dashboard/forms/create"
                  className="flex items-center gap-2"
                >
                  <BookPlus className="w-4 h-4" />
                  Create Form
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Recent forms section */}
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          {recentForm ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl border border-slate-200/30 dark:border-slate-600/30">
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {recentForm.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {recentForm._count.responses} responses · Created{" "}
                    {new Date(recentForm.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Link
                      href={`/dashboard/forms/${recentForm.id}`}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Link
                      href={`/dashboard/forms/${recentForm.id}/responses`}
                      className="flex items-center gap-2"
                    >
                      <Mails className="w-4 h-4" />
                      Responses
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookPlus className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No forms created yet
              </p>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl"
              >
                <Link href="/dashboard/forms/create">
                  Create your first form
                </Link>
              </Button>
            </div>
          )}
        </div>

        <IaFormBuilder />
      </div>
    </div>
  );
}
