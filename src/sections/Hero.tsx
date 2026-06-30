import * as React from "react";
import { motion } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";
import { FaArrowRight, FaFireAlt, FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import ParticleBackground from "@components/ParticleBackground";
import ScrollIndicator from "@components/ScrollIndicator";
import Button from "@components/Button";
import { SITE } from "@utils/constants";
import { useNextRetreat } from "@/context/ContentContext";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scrollTo = (sel: string) =>
  document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });

export const Hero: React.FC = () => {
  const { data: retreat } = useNextRetreat();

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white transition-colors duration-500 dark:bg-surface-dark"
    >
      {/* Fondo claro con degradados suaves */}
      <div className="absolute inset-0 bg-gradient-to-b from-spirit/10 via-white to-hope/10 dark:from-transparent dark:via-surface-dark dark:to-surface-dark" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20" />

      {/* Orbes de luz */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-spirit/20 blur-[110px]"
      />
      <motion.div
        animate={{ y: [0, 28, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-flame/15 blur-[120px]"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-hope/15 blur-[120px]"
      />

      <ParticleBackground count={26} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-max relative z-10 flex flex-col items-center px-5 pt-28 pb-16 text-center sm:px-8"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-6 w-28 sm:w-36">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <StaticImage
              src="../assets/logo.png"
              alt="Logo Comunidad Bet-el Casa Abierta"
              width={144}
              layout="constrained"
              placeholder="blurred"
              formats={["auto", "webp", "avif"]}
              loading="eager"
              className="drop-shadow-xl"
            />
          </motion.div>
        </motion.div>

        <motion.span
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-spirit/20 bg-spirit/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-spirit-deep dark:text-spirit"
        >
          <FaFireAlt className="text-flame" /> Comunidad cristiana juvenil
        </motion.span>

        <motion.h1
          variants={item}
          className="heading-xl max-w-4xl text-4xl text-surface-dark dark:text-white sm:text-6xl md:text-7xl"
        >
          Comunidad <span className="text-gradient-flame">Bet-el</span>{" "}
          <span className="block sm:inline">Casa Abierta</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-white/80 sm:text-xl"
        >
          {SITE.slogan}
        </motion.p>

        {/* Botón promocional del próximo retiro (solo si existe en Firebase) */}
        {retreat && (
          <motion.button
            variants={item}
            onClick={() => scrollTo(retreat.href)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-9 flex items-center gap-3 rounded-2xl bg-gradient-flame px-5 py-3 text-left text-white shadow-glow-flame"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <FaCalendarAlt className="text-lg" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
                Próximo retiro · {retreat.date}
              </span>
              <span className="font-display text-base font-bold">
                {retreat.title}
              </span>
            </span>
            <FaArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </motion.button>
        )}

        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            onClick={() => scrollTo("#quienes-somos")}
            icon={<FaArrowRight />}
          >
            Conoce más
          </Button>
          {/* Botón de inscripción: visible/oculto en tiempo real según Firebase */}
          {retreat?.showRegistrationButton && (
            <Button
              as="a"
              variant="outline"
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                retreat.whatsappText ||
                  `¡Hola! Quiero inscribirme en el ${retreat.title}.`,
              )}`}
              icon={<FaWhatsapp />}
            >
              Inscríbete por WhatsApp
            </Button>
          )}
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
