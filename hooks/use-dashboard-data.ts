"use client";

import { useState } from "react";

interface DashboardData {
  formsCount: number;
  responseCount: number;
  recentForm: any;
  user: any;
}

export function useDashboardData(initialData: DashboardData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Aquí podrías hacer una llamada a la API para refrescar los datos
    // Por ahora mantenemos los datos iniciales
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    ...data,
    isLoading,
    refreshData,
  };
}
