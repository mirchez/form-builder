import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto p-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold">
            Form Builder
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/forms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Forms
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/dashboard/forms/create">Create Form</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
