import * as React from "react";
import { subscribeEvents } from "@/services/eventsService";
import { subscribeGallery } from "@/services/galleryService";
import { subscribeNextRetreat } from "@/services/nextRetreatService";
import { toFriendlyError } from "@/firebase/errors";
import type {
  CommunityEvent,
  GalleryImage,
  NextRetreat,
} from "@apptypes/index";

export interface AsyncSlice<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface ContentValue {
  events: AsyncSlice<CommunityEvent[]>;
  gallery: AsyncSlice<GalleryImage[]>;
  nextRetreat: AsyncSlice<NextRetreat | null>;
  /** Re-suscribe todas las fuentes (reintento manual tras un error). */
  retry: () => void;
}

const initialSlice = <T,>(data: T): AsyncSlice<T> => ({
  data,
  loading: true,
  error: null,
});

const ContentContext = React.createContext<ContentValue | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = React.useState<AsyncSlice<CommunityEvent[]>>(
    initialSlice<CommunityEvent[]>([]),
  );
  const [gallery, setGallery] = React.useState<AsyncSlice<GalleryImage[]>>(
    initialSlice<GalleryImage[]>([]),
  );
  const [nextRetreat, setNextRetreat] = React.useState<
    AsyncSlice<NextRetreat | null>
  >(initialSlice<NextRetreat | null>(null));

  const [retryKey, setRetryKey] = React.useState(0);
  const retry = React.useCallback(() => setRetryKey((k) => k + 1), []);

  React.useEffect(() => {
    setEvents(initialSlice<CommunityEvent[]>([]));
    setGallery(initialSlice<GalleryImage[]>([]));
    setNextRetreat(initialSlice<NextRetreat | null>(null));

    const unsubEvents = subscribeEvents(
      (data) => setEvents({ data, loading: false, error: null }),
      (err) =>
        setEvents((s) => ({
          ...s,
          loading: false,
          error: toFriendlyError(err, "No se pudieron cargar los eventos."),
        })),
    );

    const unsubGallery = subscribeGallery(
      (data) => setGallery({ data, loading: false, error: null }),
      (err) =>
        setGallery((s) => ({
          ...s,
          loading: false,
          error: toFriendlyError(err, "No se pudo cargar la galería."),
        })),
    );

    const unsubRetreat = subscribeNextRetreat(
      (data) => setNextRetreat({ data, loading: false, error: null }),
      (err) =>
        setNextRetreat((s) => ({
          ...s,
          loading: false,
          error: toFriendlyError(
            err,
            "No se pudo cargar el próximo retiro.",
          ),
        })),
    );

    return () => {
      unsubEvents();
      unsubGallery();
      unsubRetreat();
    };
  }, [retryKey]);

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
