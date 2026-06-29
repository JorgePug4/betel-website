import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaWhatsapp,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import SectionHeading from "@components/SectionHeading";
import { contactSchema, type ContactFormData } from "@utils/validation";
import { SITE } from "@utils/constants";
import { fadeLeft, fadeRight, viewport } from "@/animations/variants";

const inputBase =
  "peer w-full rounded-xl border border-black/10 bg-white/70 py-3.5 pl-11 pr-4 text-surface-dark outline-none transition-all placeholder:text-slate-400 focus:border-spirit focus:ring-2 focus:ring-spirit/30 dark:border-white/10 dark:bg-white/5 dark:text-white";

export const Contact: React.FC = () => {
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  // Sin backend: el mensaje se envía por WhatsApp con los datos del formulario.
  const onSubmit = (data: ContactFormData) => {
    const text = [
      "¡Hola! Quiero unirme a la Comunidad Bet-el Casa Abierta.",
      "",
      `Nombre: ${data.name}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.phone}`,
      "",
      `Mensaje: ${data.message}`,
    ].join("\n");

    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section
      id="contacto"
      className="section-padding relative overflow-hidden bg-slate-50 dark:bg-surface-dark-soft/40"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="Contacto"
          title={
            <>
              Únete a la{" "}
              <span className="text-gradient-spirit">comunidad</span>
            </>
          }
          subtitle="Escríbenos y da el primer paso hacia una experiencia personal con Jesús."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Información */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-gradient-vision p-8 text-white shadow-glow">
              <div>
                <h3 className="font-display text-2xl font-bold">Hablemos</h3>
                <p className="mt-3 text-white/85">
                  Estamos para acompañarte. Contáctanos por el medio que
                  prefieras.
                </p>
              </div>

              <ul className="space-y-5">
                <li>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 transition-opacity hover:opacity-80"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <FaWhatsapp />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-white/60">
                        WhatsApp
                      </span>
                      {SITE.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-4 transition-opacity hover:opacity-80"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                      <FaEnvelope />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-white/60">
                        Correo
                      </span>
                      {SITE.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <FaMapMarkerAlt />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-white/60">
                      Ubicación
                    </span>
                    {SITE.address}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.form
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="glass-light space-y-5 rounded-3xl p-8 shadow-glass lg:col-span-3"
          >
            {/* Nombre */}
            <div>
              <div className="relative">
                <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-spirit" />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Nombre completo"
                  aria-invalid={!!errors.name}
                  className={inputBase}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-flame-fire">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Correo y teléfono */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Correo electrónico"
                    aria-invalid={!!errors.email}
                    className={inputBase}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-flame-fire">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <div className="relative">
                  <FaPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Teléfono"
                    aria-invalid={!!errors.phone}
                    className={inputBase}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-flame-fire">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <div className="relative">
                <FaCommentDots className="pointer-events-none absolute left-4 top-4 text-slate-400" />
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  aria-invalid={!!errors.message}
                  className={`${inputBase} resize-none pt-3.5`}
                />
              </div>
              {errors.message && (
                <p className="mt-1.5 text-sm text-flame-fire">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-hope py-4 font-semibold text-white shadow-glow-hope transition-all hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-lg" /> Enviar por WhatsApp
            </button>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-hope/15 p-3 text-sm font-medium text-hope-life"
                role="status"
              >
                <FaCheckCircle /> Te redirigimos a WhatsApp para completar el
                envío. ¡Gracias por escribirnos!
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
