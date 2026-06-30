import * as React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { FaExpand } from "react-icons/fa";
import SectionHeading from "@components/SectionHeading";
import Lightbox from "@components/Lightbox";
import { Skeleton, ErrorState } from "@components/StateViews";
import { useContent } from "@/context/ContentContext";
import { fadeUp, viewport } from "@/animations/variants";

export const Gallery: React.FC = () => {
  const { gallery, retry } = useContent();
  const { data: images, loading, error } = gallery;
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  // Oculta la sección solo cuando ya cargó sin errores y no hay imágenes.
  if (!loading && !error && images.length === 0) return null;

  return (
    <section
      id="galeria"
      className="section-padding relative overflow-hidden bg-slate-50 dark:bg-surface-dark-soft/40"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="Galería"
          title={
            <>
              Momentos que{" "}
              <span className="text-gradient-spirit">transforman vidas</span>
            </>
          }
          subtitle="Retiros, encuentros y celebraciones donde los jóvenes experimentan el amor de Dios."
        />

        {loading && (
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full rounded-3xl" />
            ))}
          </div>
        )}

        {error && <ErrorState message={error} onRetry={retry} />}

        {!loading && !error && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14"
          >
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop={images.length > 2}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 140,
                modifier: 2,
                slideShadows: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1.1 },
                640: { slidesPerView: 1.8 },
                1024: { slidesPerView: 2.6 },
              }}
              className="!pb-14"
            >
              {images.map((img, i) => (
                <SwiperSlide key={img.id}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-glass"
                    aria-label={`Ver ${img.title}`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      width={640}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex w-full items-center justify-between p-5 text-white">
                        <span className="font-semibold">{img.title}</span>
                        <FaExpand />
                      </span>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
};

export default Gallery;
