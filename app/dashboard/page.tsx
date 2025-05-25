import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mails, BookPlus, Eye } from "lucide-react";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

/**
 * Dashboard page component that displays an overview of forms and responses
 * Contains summary cards and recent form information
 */
export default async function Dashboard() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const cardsClass: string = "bg-white rounded-lg p-6 border shadow";
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

  //get recent form
  const recentForm = await prisma.form.findFirst({
    where: { userId },
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  console.log(user);

  return (
    <div className="space-y-6">
      {/* Header section with welcome message */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.name || "user"}</h1>
        <p className="text-gray-500 mt-1">Manage your forms and responses </p>
      </div>

      {/* Summary cards grid - displays key metrics and actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Forms summary card - shows total number of forms */}
        <div className={cardsClass}>
          <h2 className="text-xl font-medium">Your Forms</h2>
          <p className="text-3xl font-bold mt-2">{formsCount}</p>
          <Button className="mt-4">
            <Eye className="w-4 h-4" />
            <Link href="/dashboard/forms">View All Forms</Link>
          </Button>
        </div>

        <div className={cardsClass}>
          <h2 className="text-xl font-medium">Total Responses</h2>
          <p className="text-3xl font-bold mt-2">{responseCount}</p>
        </div>

        <div className={cardsClass}>
          <h2 className="text-xl font-medium">Create New</h2>
          <p className="text-gray-500 font-bold mt-2">
            Start Building A New Form
          </p>
          <Button className="mt-4">
            <BookPlus className="w-4 h-4" />
            <Link href="/dashboard/forms/create">Create Form</Link>
          </Button>
        </div>
      </div>

      {/* Recent forms section - displays the latest form with actions */}
      <div className={cardsClass}>
        <h2 className="text-xl font-medium mb-2">Recent Form</h2>
        {recentForm ? (
          <div className="space-y-4">
            {/* Form card - displays form title, stats and action buttons */}
            <div className="flex items-center justify-between border-b pb-4 ">
              <div>
                <h3 className="font-medium">{recentForm.title}</h3>
                <p className="text-sm text-gray-500">
                  {recentForm._count.responses} responses · Created on{" "}
                  {new Date(recentForm.createdAt).toDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Eye className="w-4 h-4" />
                  <Link href={`/dashboard/forms/${recentForm.id}`}>View</Link>
                </Button>
                <Button>
                  <Mails className="w-4 h-4" />
                  <Link href={`/dashboard/forms/${recentForm.id}/responses`}>
                    Responses
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p>You have not created any forms yet. Start creating one!</p>
        )}
      </div>
    </div>
  );
}
