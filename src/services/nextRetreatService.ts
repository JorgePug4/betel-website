import { doc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/firebase/config";
import { resolveImageUrl } from "@/firebase/storage";
import type { NextRetreat, NextRetreatDoc } from "@apptypes/index";

// Documento único de configuración del próximo retiro.
const COLLECTION = "siteConfig";
const DOC_ID = "nextRetreat";

/**
 * Suscribe en tiempo real al documento del próximo retiro.
 * El campo `showRegistrationButton` permite mostrar/ocultar el botón de
 * inscripción al instante, sin redeploy. Devuelve la función de baja.
 */
export function subscribeNextRetreat(
  onData: (retreat: NextRetreat | null) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    onData(null);
    return () => {};
  }

  return onSnapshot(
    doc(db, COLLECTION, DOC_ID),
    async (snap) => {
      try {
        if (!snap.exists()) {
          onData(null);
          return;
        }
        const data = snap.data() as NextRetreatDoc;
        const imageUrl = await resolveImageUrl(data.imagePath);
        onData({
          title: data.title,
          date: data.date,
          href: data.href || "#eventos",
          imageUrl,
          showRegistrationButton: data.showRegistrationButton ?? false,
          whatsappText: data.whatsappText,
        });
      } catch (err) {
        onError(err);
      }
    },
    onError,
  );
}
