import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastValue {
  notify: (message: string, type?: ToastType) => void;
}

const ToastContext = React.createContext<ToastValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const notify = React.useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, type, message }]);
      setTimeout(
        () => setToasts((t) => t.filter((x) => x.id !== id)),
        4500,
      );
    },
    [],
  );

  const remove = (id: number) =>
    setToasts((t) => t.filter((x) => x.id !== id));

  const value = React.useMemo(() => ({ notify }), [notify]);

  const styles: Record<ToastType, string> = {
    success: "border-hope/40 bg-hope/10 text-hope-life",
    error: "border-flame/40 bg-flame/10 text-flame-fire",
    info: "border-spirit/40 bg-spirit/10 text-spirit-deep dark:text-spirit",
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex w-[min(92vw,360px)] flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className={`flex items-start gap-3 rounded-xl border bg-white p-4 shadow-glass backdrop-blur dark:bg-surface-dark ${styles[t.type]}`}
              role={t.type === "error" ? "alert" : "status"}
            >
              {t.type === "error" ? (
                <FaExclamationTriangle className="mt-0.5 shrink-0" />
              ) : (
                <FaCheckCircle className="mt-0.5 shrink-0" />
              )}
              <p className="flex-1 text-sm font-medium">{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                aria-label="Cerrar"
                className="opacity-60 hover:opacity-100"
              >
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastValue => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastProvider");
  return ctx;
};
