import * as React from "react";
import type { Unsubscribe } from "firebase/firestore";
import { toFriendlyError } from "@/firebase/errors";

export interface SubscriptionState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface SubscriptionResult<T> extends SubscriptionState<T> {
  /** Re-suscribe la fuente (reintento manual tras un error). */
  retry: () => void;
}

/** Firma de un servicio de suscripción (estilo onSnapshot). */
export type Subscribe<T> = (
  onData: (data: T) => void,
  onError: (error: unknown) => void,
) => Unsubscribe;

/**
 * Hook genérico para suscribirse a una fuente en tiempo real de Firestore.
 *
 * Encapsula:
 *  - estado de carga / datos / error
 *  - reintento manual (retry)
 *  - LIMPIEZA del listener (unsubscribe) al desmontar o re-suscribir,
 *    evitando memory leaks y actualizaciones sobre componentes desmontados.
 *
 * `subscribe` debe ser una referencia ESTABLE (función a nivel de módulo o
 * memoizada con useCallback) para no recrear el listener en cada render.
 */
export function useFirestoreSubscription<T>(
  subscribe: Subscribe<T>,
  initialData: T,
  fallbackMessage = "No se pudo cargar la información.",
): SubscriptionResult<T> {
  const [state, setState] = React.useState<SubscriptionState<T>>({
    data: initialData,
    loading: true,
    error: null,
  });
  const [retryKey, setRetryKey] = React.useState(0);
  const retry = React.useCallback(() => setRetryKey((k) => k + 1), []);

  React.useEffect(() => {
    // Flag para ignorar callbacks que lleguen después del desmontaje
    // (protege contra setState en componentes ya desmontados).
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));

    const unsubscribe = subscribe(
      (data) => {
        if (active) setState({ data, loading: false, error: null });
      },
      (error) => {
        if (active)
          setState((s) => ({
            ...s,
            loading: false,
            error: toFriendlyError(error, fallbackMessage),
          }));
      },
    );

    // Cleanup: corta el listener al desmontar o antes de re-suscribir.
    return () => {
      active = false;
      unsubscribe();
    };
  }, [subscribe, retryKey, fallbackMessage]);

  return { ...state, retry };
}
