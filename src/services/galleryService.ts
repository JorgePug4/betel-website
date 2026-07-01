import {
  collection,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/firebase/config";
import { resolveImageUrl } from "@/firebase/storage";
import type { GalleryImage, GalleryDoc } from "@apptypes/index";

const COLLECTION = "gallery";

// Documentos sin "order" se colocan al final (en vez de excluirse).
const orderOf = (o?: number) => (typeof o === "number" ? o : 9999);

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

  // Sin orderBy en la consulta: no se excluyen documentos sin "order".
  return onSnapshot(
    collection(db, COLLECTION),
    async (snapshot) => {
      try {
        const activeDocs = snapshot.docs
          .filter((d) => (d.data() as GalleryDoc).active !== false)
          .sort(
            (a, b) =>
              orderOf((a.data() as GalleryDoc).order) -
              orderOf((b.data() as GalleryDoc).order),
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
