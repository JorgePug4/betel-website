import * as React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@components/SectionHeading";
import { IDENTITY_CARDS } from "@utils/constants";
import { fadeUp, staggerContainer, viewport } from "@/animations/variants";

export const Identity: React.FC = () => {
  return (
    <section
      id="identidad"
      className="section-padding relative overflow-hidden bg-slate-50 dark:bg-surface-dark-soft/40"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.15] dark:opacity-10" />
      <div className="container-max relative">
        <SectionHeading
          eyebrow="Nuestra Identidad"
          title={
            <>
              Vivir y transmitir la fe{" "}
              <span className="text-gradient-flame">en Cristo Jesús</span>
            </>
          }
          subtitle="La Comunidad Bet-el Casa Abierta se define por su compromiso en vivir y transmitir la fe en Cristo Jesús hacia los jóvenes. Brindando espacios de unidad y amor, para todo aquel que quiera vivir una experiencia personal con Jesús."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="perspective mt-16 grid gap-7 md:grid-cols-3"
        >
          {IDENTITY_CARDS.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              whileHover={{ rotateX: 6, rotateY: -6, y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-glass transition-shadow hover:shadow-glow dark:border-white/10 dark:bg-surface-dark"
            >
              {/* Glow de fondo al hover */}
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${card.gradient} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50`}
              />

              <div
                className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-2xl text-white shadow-lg`}
              >
                <card.icon />
              </div>

              <h3 className="relative mb-3 font-display text-xl font-bold text-surface-dark dark:text-white">
                {card.title}
              </h3>
              <p className="relative leading-relaxed text-slate-600 dark:text-slate-300">
                {card.description}
              </p>

              <span
                className={`relative mt-6 block h-1 w-12 rounded-full bg-gradient-to-r ${card.gradient} transition-all duration-500 group-hover:w-20`}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Identity;
