import { getAuth, type Auth } from "firebase/auth";
import { app, isFirebaseConfigured } from "@/firebase/config";

/**
 * Instancia de Firebase Authentication.
 * Es null si Firebase no está configurado o estamos en SSR sin app.
 */
let authInstance: Auth | null = null;

if (isFirebaseConfigured && app) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
