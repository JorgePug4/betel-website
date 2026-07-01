import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebase/auth";
import { db } from "@/firebase/config";
import { toFriendlyError } from "@/firebase/errors";

/**
 * Capa de servicio de autenticación. Aísla la UI del SDK de Firebase Auth.
 */

export async function login(email: string, password: string): Promise<User> {
  if (!auth) throw new Error("Autenticación no disponible.");
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err) {
    throw new Error(
      toFriendlyError(err, "Credenciales inválidas. Inténtalo de nuevo."),
    );
  }
}

export async function logout(): Promise<void> {
  if (!auth) return;
  await fbSignOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void): Unsubscribe {
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

/**
 * Determina si un usuario es administrador. Doble verificación:
 *  1) Custom Claim `admin === true` (opción empresarial con Admin SDK).
 *  2) Existencia del documento `admins/{uid}` (opción simple desde consola).
 */
export async function checkIsAdmin(user: User): Promise<boolean> {
  try {
    const token = await user.getIdTokenResult();
    if (token.claims.admin === true) return true;
  } catch {
    /* sigue con la verificación por documento */
  }

  if (!db) return false;
  try {
    const snap = await getDoc(doc(db, "admins", user.uid));
    return snap.exists();
  } catch {
    return false;
  }
}
