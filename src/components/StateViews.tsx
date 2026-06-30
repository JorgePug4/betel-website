import * as React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

/** Bloque con efecto shimmer para estados de carga. */
export const Skeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div
    className={`animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/10 ${className}`}
    aria-hidden="true"
  />
);

/** Cuadrícula de tarjetas en carga (para galería/eventos). */
export const CardsSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-3xl border border-black/5 dark:border-white/10"
      >
        <Skeleton className="h-40 rounded-none" />
        <div className="space-y-3 p-6">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    ))}
  </div>
);

/** Mensaje de error con botón de reintento. */
export const ErrorState: React.FC<{
  message: string;
  onRetry?: () => void;
}> = ({ message, onRetry }) => (
  <div
    role="alert"
    className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 rounded-3xl border border-flame/20 bg-flame/5 p-8 text-center"
  >
    <FaExclamationTriangle className="text-3xl text-flame-fire" />
    <p className="text-slate-600 dark:text-slate-300">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-spirit px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
      >
        <FaRedo /> Reintentar
      </button>
    )}
  </div>
);
