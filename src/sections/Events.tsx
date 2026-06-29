import * as React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import SectionHeading from "@components/SectionHeading";
import { EVENTS, SITE } from "@utils/constants";
import { fadeUp, staggerContainer, viewport } from "@/animations/variants";

const accents = ["bg-gradient-spirit", "bg-gradient-flame", "bg-gradient-hope"];

export const Events: React.FC = () => {
  return (
    <section id="eventos" className="section-padding relative overflow-hidden">
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {EVENTS.map((event, i) => (
            <motion.article
              key={event.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-glass dark:border-white/10 dark:bg-surface-dark"
            >
              {/* Cabecera con acento de color o imagen */}
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
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                    `Hola, quiero información sobre: ${event.name}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-spirit transition-all hover:gap-3"
                >
                  Quiero participar <FaArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
