import * as React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@components/SectionHeading";
import { MISSION_STEPS } from "@utils/constants";
import { fadeUp, staggerContainer, viewport } from "@/animations/variants";

export const Mission: React.FC = () => {
  return (
    <section id="mision" className="section-padding relative overflow-hidden">
      <div className="container-max">
        <SectionHeading
          eyebrow="Nuestra Misión"
          title={
            <>
              Evangelizar y formar{" "}
              <span className="text-gradient-hope">discípulos de Cristo</span>
            </>
          }
          subtitle="Promover la evangelización y la formación de discípulos de Cristo mediante retiros espirituales que conduzcan a un encuentro personal con Jesús."
        />

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mt-16"
        >
          {/* Línea vertical/horizontal */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-spirit via-hope to-flame md:left-1/2 md:block" />

          <div className="space-y-10 md:space-y-0">
            {MISSION_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Punto del timeline */}
                  <div className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-spirit text-xl text-white shadow-glow md:left-1/2">
                    <step.icon />
                  </div>

                  {/* Tarjeta */}
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-glass transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-surface-dark">
                      <span className="mb-2 inline-block text-sm font-bold text-spirit">
                        0{i + 1}
                      </span>
                      <h3 className="mb-2 font-display text-lg font-bold text-surface-dark dark:text-white">
                        {step.title}
                      </h3>
                      <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
