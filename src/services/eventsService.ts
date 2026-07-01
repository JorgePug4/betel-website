import {
  collection,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/firebase/config";
import { resolveImageUrl } from "@/firebase/storage";
import type { CommunityEvent, EventDoc } from "@apptypes/index";

const COLLECTION = "events";

// Documentos sin "order" se colocan al final (en vez de excluirse).
const orderOf = (o?: number) => (typeof o === "number" ? o : 9999);

/**
 * Suscribe en tiempo real a los eventos activos (ordenados).
 * Resuelve las imágenes desde Storage y entrega modelos de dominio.
 * Devuelve la función de baja (unsubscribe).
 */
export function subscribeEvents(
  onData: (events: CommunityEvent[]) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    onData([]);
    return () => {};
  }

  // Sin orderBy en la consulta: así NO se excluyen documentos sin "order".
  // El filtro de "active" y el orden se hacen en cliente.
  return onSnapshot(
    collection(db, COLLECTION),
    async (snapshot) => {
      try {
        const activeDocs = snapshot.docs
          .filter((d) => (d.data() as EventDoc).active !== false)
          .sort(
            (a, b) =>
              orderOf((a.data() as EventDoc).order) -
              orderOf((b.data() as EventDoc).order),
          );
        const events = await Promise.all(
          activeDocs.map(async (d) => {
            const data = d.data() as EventDoc;
            const [imageUrl, infoImage] = await Promise.all([
              resolveImageUrl(data.imagePath),
              resolveImageUrl(data.infoImagePath),
            ]);
            return {
              id: d.id,
              name: data.name,
              date: data.date,
              location: data.location,
              description: data.description,
              imageUrl,
              infoImage,
              mapUrl: data.mapUrl,
              mapQuery: data.mapQuery,
              startDate: data.startDate,
              endDate: data.endDate,
            } satisfies CommunityEvent;
          }),
        );
        onData(events);
      } catch (err) {
        onError(err);
      }
    },
    onError,
  );
}
