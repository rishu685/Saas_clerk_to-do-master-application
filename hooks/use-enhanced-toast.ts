"use client";

import { useToast as useOriginalToast } from "@/hooks/use-toast";

interface EnhancedToastOptions {
  title?: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useEnhancedToast() {
  const { toast: originalToast, dismiss } = useOriginalToast();

  const toast = ({
    title,
    description,
    type = "info",
    duration = 5000,
    action,
  }: EnhancedToastOptions) => {
    const getVariant = () => {
      switch (type) {
        case "error":
        case "warning":
          return "destructive" as const;
        default:
          return "default" as const;
      }
    };

    return originalToast({
      title,
      description,
      variant: getVariant(),
      duration,
    });
  };

  // Convenience methods
  const success = (title: string, description?: string) =>
    toast({ title, description, type: "success" });

  const error = (title: string, description?: string) =>
    toast({ title, description, type: "error" });

  const warning = (title: string, description?: string) =>
    toast({ title, description, type: "warning" });

  const info = (title: string, description?: string) =>
    toast({ title, description, type: "info" });

  const promise = async <T,>(
    promise: Promise<T>,
    {
      loading,
      success: successMessage,
      error: errorMessage,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ): Promise<T> => {
    const loadingToast = info(loading);

    try {
      const result = await promise;
      dismiss(loadingToast.id);
      success(
        typeof successMessage === "function"
          ? successMessage(result)
          : successMessage
      );
      return result;
    } catch (err) {
      dismiss(loadingToast.id);
      const errorMsg =
        typeof errorMessage === "function"
          ? errorMessage(err as Error)
          : errorMessage;
      error("Error", errorMsg);
      throw err;
    }
  };

  return {
    toast,
    success,
    error,
    warning,
    info,
    promise,
    dismiss,
  };
}