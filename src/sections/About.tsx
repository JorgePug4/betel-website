import * as React from "react";
import { motion } from "framer-motion";
import { FaDove, FaFireAlt, FaUsers } from "react-icons/fa";
import SectionHeading from "@components/SectionHeading";
import { fadeLeft, fadeRight, viewport } from "@/animations/variants";

const highlights = [
  { icon: FaFireAlt, label: "Proclamación del Kerigma", color: "text-flame" },
  { icon: FaUsers, label: "Acompañamiento juvenil", color: "text-hope" },
  { icon: FaDove, label: "Encuentro con Dios", color: "text-spirit" },
];

export const About: React.FC = () => {
  return (
    <section
      id="quienes-somos"
      className="section-padding relative overflow-hidden"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="¿Quiénes Somos?"
          title={
            <>
              Una comunidad unida en{" "}
              <span className="text-gradient-spirit">un mismo sentir</span>
            </>
          }
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          {/* Tarjeta de texto */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="glass-light rounded-3xl p-8 sm:p-10 shadow-glass"
          >
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              La{" "}
              <strong className="text-spirit">
                Comunidad Bet-el Casa Abierta
              </strong>{" "}
              es una agrupación de creyentes que, unidos en un mismo sentir en
              Cristo Jesús, tiene como propósito fundamental anunciar el Plan de
              Salvación y acompañar a los jóvenes en su proceso de encuentro con
              Dios.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              Nuestra labor se desarrolla principalmente a través de{" "}
              <strong className="text-flame">retiros espirituales</strong>,
              espacios de formación y reflexión donde se proclama el{" "}
              <strong className="text-hope-life">Kerigma</strong>, el primer
              anuncio de la fe cristiana que invita a la conversión y a la
              experiencia personal del amor de Dios.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <h.icon className={h.color} /> {h.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Ilustración */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-vision p-1 shadow-glow">
              <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-[2.3rem] bg-surface-dark/90 p-10 text-center">
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-spirit text-5xl text-white shadow-glow"
                >
                  <FaDove />
                </motion.div>
                <p className="font-display text-2xl font-bold text-white">
                  Caminamos con los jóvenes
                </p>
                <p className="text-white/70">
                  hacia un encuentro personal y transformador con Jesús.
                </p>
                <div className="grid w-full grid-cols-3 gap-3 pt-2">
                  {["Fe", "Esperanza", "Unidad"].map((v) => (
                    <span
                      key={v}
                      className="rounded-xl bg-white/10 py-2 text-sm font-semibold text-white"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
