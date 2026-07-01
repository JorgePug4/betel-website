import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

interface ConfirmValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = React.createContext<ConfirmValue | undefined>(undefined);

/** Provider que expone `confirm()` (devuelve una promesa booleana). */
export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [opts, setOpts] = React.useState<ConfirmOptions | null>(null);
  const resolver = React.useRef<(value: boolean) => void>();

  const confirm = React.useCallback((options: ConfirmOptions) => {
    setOpts(options);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = (result: boolean) => {
    resolver.current?.(result);
    resolver.current = undefined;
    setOpts(null);
  };

  const value = React.useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {opts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-glass dark:bg-surface-dark"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-flame/10 text-flame-fire">
                  <FaExclamationTriangle />
                </span>
                <h3 className="font-display text-lg font-bold text-surface-dark dark:text-white">
                  {opts.title ?? "Confirmar acción"}
                </h3>
              </div>
              <p className="mb-6 text-slate-600 dark:text-slate-300">
                {opts.message}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => close(false)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => close(true)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white ${
                    opts.danger
                      ? "bg-flame-fire hover:bg-flame"
                      : "bg-gradient-spirit"
                  }`}
                >
                  {opts.confirmLabel ?? "Confirmar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmValue => {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx)
    throw new Error("useConfirm debe usarse dentro de ConfirmProvider");
  return ctx;
};
