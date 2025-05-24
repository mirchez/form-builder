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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{form?.title}</h1>
          {form.description && (
            <p className="text-gray-500 mt-1">{form.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/forms/${formId}/edit`}>Edit</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/forms/${formId}/responses`}>
              View Responses ({form._count.responses})
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Share your form</CardTitle>
          <CardDescription>
            Share this link and start to collect responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="p-2 border rounded-md bg-gray-50">{formUrl}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Questions</h2>
        <div className="space-y-2">
          {form.questions.map((question, idx) => (
            <Card key={question.id}>
              <CardContent className="p-4">
                <p className="font-medium">
                  {idx + 1}. {question.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormDetailsPage;
