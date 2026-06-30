import {
  collection,
  onSnapshot,
  query,
  orderBy,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/firebase/config";
import { resolveImageUrl } from "@/firebase/storage";
import type { GalleryImage, GalleryDoc } from "@apptypes/index";

const COLLECTION = "gallery";

/**
 * Suscribe en tiempo real a las imágenes de la galería (activas y ordenadas).
 * Resuelve las URLs desde Storage. Devuelve la función de baja.
 */
export function subscribeGallery(
  onData: (images: GalleryImage[]) => void,
  onError: (error: unknown) => void,
): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    onData([]);
    return () => {};
  }

  // Ordena por "order" (índice automático). El filtro de "active" es en cliente
  // para evitar requerir un índice compuesto.
  const q = query(collection(db, COLLECTION), orderBy("order", "asc"));

  return onSnapshot(
    q,
    async (snapshot) => {
      try {
        const activeDocs = snapshot.docs.filter(
          (d) => (d.data() as GalleryDoc).active !== false,
        );
        const images = await Promise.all(
          activeDocs.map(async (d) => {
            const data = d.data() as GalleryDoc;
            const imageUrl = await resolveImageUrl(data.imagePath);
            return {
              id: d.id,
              title: data.title,
              imageUrl: imageUrl ?? "",
            } satisfies GalleryImage;
          }),
        );
        // Descarta imágenes que no se pudieron resolver.
        onData(images.filter((img) => img.imageUrl));
      } catch (err) {
        onError(err);
      }
    },
    onError,
  );
}
