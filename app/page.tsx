import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
     <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold "> 
          <Link href="/">Form Builder</Link>
        </h1>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton ><Button>Sign In</Button></SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn> 
        </div>
      </div>
     </header>
     <main className="bg-blue-50 flex-1">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 capitalize">Build your form in minutes</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto capitalize">
            Create beautiful, responsive forms with our builder, collect responses, and analyze data - all in one place.
          </p>
          <SignedIn>
            <Button asChild size='lg'>
              <Link href="/dashboard/forms/create">Create Form</Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton >
              <Button>Get Started</Button>
            </SignInButton>
          </SignedOut>
        </div>
     </main>
    </div>
  );
}
