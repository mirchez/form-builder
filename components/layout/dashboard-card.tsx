"use client";

import type { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function DashboardCard({
  children,
  className = "",
  hover = true,
}: DashboardCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900 
        border border-gray-100 dark:border-gray-800 
        rounded-xl p-6 
        transition-all duration-300 ease-out
        ${
          hover
            ? "hover:shadow-lg hover:-translate-y-1 hover:border-gray-200 dark:hover:border-gray-700"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
