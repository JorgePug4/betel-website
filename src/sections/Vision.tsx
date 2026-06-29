import * as React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import ParticleBackground from "@components/ParticleBackground";
import { VISION_PILLARS } from "@utils/constants";
import { fadeUp, staggerContainer, viewport } from "@/animations/variants";

export const Vision: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Fondo con gradiente azul y naranja */}
      <div className="absolute inset-0 bg-gradient-vision" />
      <div className="absolute inset-0 bg-surface-dark/30" />
      <ParticleBackground count={22} />
      {/* Iluminación */}
      <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-flame-light/30 blur-[120px]" />
      <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-spirit/30 blur-[120px]" />

      <div className="container-max relative px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            <FaStar className="text-flame-light" /> Nuestra Visión
          </span>
          <h2 className="heading-xl mt-6 text-3xl text-white sm:text-5xl">
            Una comunidad guiada por el{" "}
            <span className="text-flame-light">Espíritu Santo</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
            Ser una comunidad cristiana que, guiada por el Espíritu Santo,
            fortalezca la vida espiritual de los jóvenes y sus familias,
            formando discípulos que transformen su entorno con el amor de Cristo.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VISION_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.label}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-2xl text-white">
                <pillar.icon />
              </span>
              <p className="text-sm font-semibold text-white">{pillar.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
