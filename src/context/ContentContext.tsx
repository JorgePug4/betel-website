import * as React from "react";
import { subscribeEvents } from "@/services/eventsService";
import { subscribeGallery } from "@/services/galleryService";
import { subscribeNextRetreat } from "@/services/nextRetreatService";
import {
  useFirestoreSubscription,
  type SubscriptionResult,
} from "@/hooks/useFirestoreSubscription";
import type {
  CommunityEvent,
  GalleryImage,
  NextRetreat,
} from "@apptypes/index";

interface ContentValue {
  events: SubscriptionResult<CommunityEvent[]>;
  gallery: SubscriptionResult<GalleryImage[]>;
  nextRetreat: SubscriptionResult<NextRetreat | null>;
  /** Re-suscribe todas las fuentes (reintento global). */
  retry: () => void;
}

// Valores iniciales estables (fuera del componente) para no recrearlos.
const EMPTY_EVENTS: CommunityEvent[] = [];
const EMPTY_GALLERY: GalleryImage[] = [];

const ContentContext = React.createContext<ContentValue | undefined>(undefined);

/**
 * Provee el contenido dinámico de Firebase a toda la app con UNA sola
 * suscripción por colección (compartida vía contexto). Esto deduplica
 * listeners: aunque Navbar, Hero, Events y Gallery usen los datos, solo hay
 * un onSnapshot activo por colección.
 */
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const events = useFirestoreSubscription<CommunityEvent[]>(
    subscribeEvents,
    EMPTY_EVENTS,
    "No se pudieron cargar los eventos.",
  );
  const gallery = useFirestoreSubscription<GalleryImage[]>(
    subscribeGallery,
    EMPTY_GALLERY,
    "No se pudo cargar la galería.",
  );
  const nextRetreat = useFirestoreSubscription<NextRetreat | null>(
    subscribeNextRetreat,
    null,
    "No se pudo cargar el próximo retiro.",
  );

  const retry = React.useCallback(() => {
    events.retry();
    gallery.retry();
    nextRetreat.retry();
  }, [events.retry, gallery.retry, nextRetreat.retry]);

  const value = React.useMemo<ContentValue>(
    () => ({ events, gallery, nextRetreat, retry }),
    [events, gallery, nextRetreat, retry],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContent = (): ContentValue => {
  const ctx = React.useContext(ContentContext);
  if (!ctx)
    throw new Error("useContent debe usarse dentro de ContentProvider");
  return ctx;
};

// Hooks de conveniencia por sección (separación de responsabilidades).
export const useEvents = () => useContent().events;
export const useGallery = () => useContent().gallery;
export const useNextRetreat = () => useContent().nextRetreat;
