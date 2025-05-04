import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Dashboard page component that displays an overview of forms and responses
 * Contains summary cards and recent form information
 */
export default function Dashboard() {
  const cardsClass: string = "bg-white rounded-lg p-6 border shadow";

  return (
    <div className="space-y-6">
      {/* Header section with welcome message */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, Turbas</h1>
        <p className="text-gray-500 mt-1">Manage your forms and responses </p>
      </div>

      {/* Summary cards grid - displays key metrics and actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Forms summary card - shows total number of forms */}
        <div className={cardsClass}>
          <h2 className="text-xl font-medium">Your Forms</h2>
          <p className="text-3xl font-bold mt-2">4</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/forms">View All Forms</Link>
          </Button>
        </div>

        <div className={cardsClass}>
          <h2 className="text-xl font-medium">Total Responses</h2>
          <p className="text-3xl font-bold mt-2">67</p>
        </div>

        <div className={cardsClass}>
          <h2 className="text-xl font-medium">Create New</h2>
          <p className="text-gray-500 font-bold mt-2">
            Start Building A New Form
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/forms/create">Create Form</Link>
          </Button>
        </div>
      </div>

      {/* Recent forms section - displays the latest form with actions */}
      <div className={cardsClass}>
        <h2 className="text-xl font-medium mb-2">Recent Form</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4 ">
            <div>
              <h3 className="font-medium">This is the title</h3>
              <p>responses . Created on 21 April 2025</p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/dashboard/forms/123`}>View</Link>
              </Button>
              <Button asChild>
                <Link href={`/dashboard/forms/123`}>Responses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
