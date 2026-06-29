import * as React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SITE } from "@utils/constants";

export const FloatingWhatsApp: React.FC = () => (
  <motion.a
    href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
      "¡Hola! Quiero conocer más sobre la Comunidad Bet-el Casa Abierta.",
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escríbenos por WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
    className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)]"
  >
    <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
    <FaWhatsapp className="relative" />
  </motion.a>
);

export default FloatingWhatsApp;
