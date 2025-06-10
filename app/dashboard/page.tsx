import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mails, BookPlus, Eye, Plus, BarChart3 } from "lucide-react";
import prisma from "@/lib/db";
import { IaFormBuilder } from "@/components/layout/IaFormBuilder";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/**
 * Dashboard page component that displays an overview of forms and responses
 * Contains summary cards and recent form information
 */
export default async function Dashboard() {
  const formsCount = await prisma.form.count();
  const responseCount = await prisma.formResponse.count();

  //get recent form
  const recentForm = await prisma.form.findFirst({
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/forms/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BookPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Forms</p>
              <h2 className="text-2xl font-bold">{formsCount}</h2>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Mails className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Responses</p>
              <h2 className="text-2xl font-bold">{responseCount}</h2>
            </div>
          </div>
        </div>
      </div>

      {recentForm && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Form</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{recentForm.title}</h3>
              <p className="text-sm text-muted-foreground">
                {recentForm._count.responses} responses
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/forms/${recentForm.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/forms/${recentForm.id}/responses`}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Responses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">AI Form Builder</h2>
        <IaFormBuilder />
      </div>
    </div>
  );
}
