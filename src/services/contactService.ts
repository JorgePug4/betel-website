import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/firebase/config";
import { toFriendlyError } from "@/firebase/errors";
import type { ContactMessage } from "@apptypes/index";

const COLLECTION = "contactMessages";

/**
 * Guarda un mensaje de contacto en Firestore.
 * Lanza un Error con mensaje amigable si algo falla.
 */
export async function sendContactMessage(data: ContactMessage): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "El formulario no está disponible por el momento. Escríbenos por WhatsApp.",
    );
  }

  try {
    await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      handled: false,
    });
  } catch (err) {
    throw new Error(
      toFriendlyError(err, "No se pudo enviar el mensaje. Inténtalo de nuevo."),
    );
  }
}
