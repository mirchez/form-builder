import prisma from "@/lib/db";
import FormList from "@/components/form/form-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function FormPage() {
  const forms = await prisma.form.findMany({
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forms</h1>
        <Button asChild>
          <Link href="/dashboard/forms/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Form
          </Link>
        </Button>
      </div>

      <FormList forms={forms} />
    </div>
  );
}
