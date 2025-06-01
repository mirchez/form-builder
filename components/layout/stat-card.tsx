"use client";

import type { ReactNode } from "react";
import { DashboardCard } from "@/components/layout/dashboard-card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  action,
}: StatCardProps) {
  return (
    <DashboardCard>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="mt-4">{action}</div>}
    </DashboardCard>
  );
}
