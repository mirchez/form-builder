import { FormBuilder } from "@/components/form/form-builder";
import prisma from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const { userId } = await auth();

  if (!userId) {
    return RedirectToSignIn;
  }

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

  if (form.userId !== userId) {
    redirect("/dashboard/forms");
  }
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Form</h1>
        <p className="text-gray-500 mt-1">
          Update your form details and questions
        </p>
      </div>

      <FormBuilder initialData={form} isEditing />
    </div>
  );
}
