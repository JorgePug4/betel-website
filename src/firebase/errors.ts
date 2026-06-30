import { FirebaseError } from "firebase/app";

/**
 * Manejo de errores centralizado: convierte cualquier error (de Firebase o no)
 * en un mensaje claro en español para mostrar en la UI, y registra el detalle
 * técnico en consola para depuración.
 */
export function toFriendlyError(error: unknown, fallback: string): string {
  if (error instanceof FirebaseError) {
    // eslint-disable-next-line no-console
    console.error(`[Firebase:${error.code}]`, error.message);
    switch (error.code) {
      case "permission-denied":
        return "No tienes permisos para realizar esta acción.";
      case "unavailable":
        return "Servicio no disponible. Revisa tu conexión e inténtalo de nuevo.";
      case "not-found":
        return "No se encontró la información solicitada.";
      case "resource-exhausted":
        return "Se alcanzó el límite de solicitudes. Inténtalo más tarde.";
      case "unauthenticated":
        return "Necesitas iniciar sesión para continuar.";
      default:
        return fallback;
    }
  }

  // eslint-disable-next-line no-console
  console.error("[Error]", error);
  return error instanceof Error ? error.message || fallback : fallback;
}
