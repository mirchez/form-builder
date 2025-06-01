import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500">
      <header className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            <Link href="/">Form Builder</Link>
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
              Build your form in minutes
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create beautiful, responsive forms with our builder, collect
              responses, and analyze data - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <SignedIn>
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-lg px-8 py-6 group"
                >
                  <Link
                    href="/dashboard/forms/create"
                    className="flex items-center gap-2"
                  >
                    Create Form
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <Button
                    size="lg"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-lg px-8 py-6 group"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="group bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Build forms in minutes with our intuitive drag-and-drop
                  interface
                </p>
              </div>

              <div className="group bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Secure & Reliable
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your data is protected with enterprise-grade security
                </p>
              </div>

              <div className="group bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/20 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Powerful Analytics
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Get insights from your form responses with detailed analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
