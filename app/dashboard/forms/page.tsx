import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/db";
import FormList from "../../components/form/form-list";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Forms</h1>
        <p className="text-gray-500 mt-1">
          Create an amazing form to collect data from your users
        </p>
      </div>

      <FormList forms={forms} />
    </div>
  );
}
