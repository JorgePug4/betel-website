import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaInfoCircle,
  FaTimes,
  FaMapMarkedAlt,
} from "react-icons/fa";
import SectionHeading from "@components/SectionHeading";
import { CardsSkeleton, ErrorState } from "@components/StateViews";
import { SITE } from "@utils/constants";
import { useContent } from "@/context/ContentContext";
import { fadeUp, staggerContainer, viewport } from "@/animations/variants";

const accents = ["bg-gradient-spirit", "bg-gradient-flame", "bg-gradient-hope"];

/**
 * Devuelve el enlace de Google Maps de un evento, o null si no hay datos.
 * Prioriza `mapUrl` (link completo); si no, construye la búsqueda con `mapQuery`.
 */
function getMapsHref(event: {
  mapUrl?: string;
  mapQuery?: string;
}): string | null {
  if (event.mapUrl && event.mapUrl.trim()) return event.mapUrl.trim();
  if (event.mapQuery && event.mapQuery.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      event.mapQuery.trim(),
    )}`;
  }
  return null;
}

export const Events: React.FC = () => {
  const { events, retry } = useContent();
  const { data, loading, error } = events;

  // Imagen activa del modal "Más información".
  const [info, setInfo] = React.useState<{ url: string; name: string } | null>(
    null,
  );

  React.useEffect(() => {
    if (!info) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfo(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [info]);

  // Oculta la sección solo cuando ya cargó sin errores y no hay eventos.
  if (!loading && !error && data.length === 0) return null;

  return (
    <section id="eventos" className="section-padding relative overflow-hidden">
      <h2 className="sr-only">Eventos y retiros de la comunidad</h2>
      <div className="container-max">
        <SectionHeading
          eyebrow="Eventos y Retiros"
          title={
            <>
              Vive tu próximo{" "}
              <span className="text-gradient-flame">encuentro con Jesús</span>
            </>
          }
          subtitle="Espacios diseñados para que experimentes el amor de Dios y crezcas en comunidad."
        />

        {loading && <CardsSkeleton count={3} />}
        {error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {data.map((event, i) => (
              <motion.article
                key={event.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-glass dark:border-white/10 dark:bg-surface-dark"
              >
                <div
                  className={`relative h-40 ${accents[i % accents.length]} overflow-hidden`}
                >
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      width={400}
                      height={160}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <FaCalendarAlt /> {event.date}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-display text-xl font-bold text-surface-dark dark:text-white">
                    {event.name}
                  </h3>
                  <p className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <FaMapMarkerAlt className="text-flame" /> {event.location}
                  </p>
                  <p className="flex-1 leading-relaxed text-slate-600 dark:text-slate-300">
                    {event.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {event.infoImage && (
                      <button
                        type="button"
                        onClick={() =>
                          setInfo({ url: event.infoImage!, name: event.name })
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-spirit/10 px-4 py-2 text-sm font-semibold text-spirit transition-colors hover:bg-spirit/20"
                      >
                        <FaInfoCircle /> Más información
                      </button>
                    )}
                    {getMapsHref(event) && (
                      <a
                        href={getMapsHref(event)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-hope/10 px-4 py-2 text-sm font-semibold text-hope-life transition-colors hover:bg-hope/20"
                      >
                        <FaMapMarkedAlt /> Ver en mapa
                      </a>
                    )}
                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                        `Hola, quiero información sobre: ${event.name}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-spirit transition-all hover:gap-3"
                    >
                      Quiero participar <FaArrowRight />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal con la imagen del evento */}
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInfo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={info.name}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setInfo(null)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <FaTimes />
            </button>
            <motion.figure
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-3xl"
            >
              <img
                src={info.url}
                alt={info.name}
                decoding="async"
                className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 text-center text-white/90">
                {info.name}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
