import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
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
import { ArrowLeft, Edit, Share2, MessageSquare } from "lucide-react";

const FormDetailsPage = async ({
  params,
}: {
  params: Promise<{ formId: string }>;
}) => {
  const { formId } = await params;

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
        select: {
          responses: true,
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
          <Link href="/dashboard/forms">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forms
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{form.title}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Responses</CardTitle>
            <CardDescription>Total form responses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{form._count.responses}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href={`/dashboard/forms/${formId}/edit`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Form
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/dashboard/forms/${formId}/responses`}>
            <MessageSquare className="w-4 h-4 mr-2" />
            View Responses
          </Link>
        </Button>
        <DialogCloseButton formUrl={formUrl}>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Form
          </Button>
        </DialogCloseButton>
      </div>
    </div>
  );
};

export default FormDetailsPage;
