import { FormBuilder } from "@/components/form/form-builder";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Create New Form
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
              Design your form to collect data from your users
            </p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <FormBuilder />
        </div>
      </div>
    </div>
  );
}
