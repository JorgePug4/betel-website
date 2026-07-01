import * as React from "react";
import { Link } from "gatsby";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaLock,
} from "react-icons/fa";
import BrandLogo from "@components/BrandLogo";
import { SITE } from "@utils/constants";

const socials = [
  { icon: FaInstagram, href: SITE.social.instagram, label: "Instagram" },
  { icon: FaFacebookF, href: SITE.social.facebook, label: "Facebook" },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-dark text-slate-300">
      <div className="absolute inset-0 bg-gradient-vision opacity-[0.12]" />
      <div className="container-max relative grid gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:px-12">
       
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 p-3 w-fit">
            <BrandLogo />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            {SITE.slogan}
          </p>
          <div className="flex gap-3 pt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-spirit transition-all hover:-translate-y-1 hover:bg-gradient-spirit hover:text-white"
              >
                <s.icon />
              </a>
            ))}
          </div>

          {/* Acceso discreto de administración */}
          <Link
            to="/admin"
            aria-label="Acceso de administración"
            title="Administración"
            className="inline-flex items-center gap-1.5 pt-1 text-xs text-slate-600 transition-colors hover:text-spirit"
          >
            <FaLock className="text-[10px]" /> Administración
          </Link>
        </div>

        {/* Llamado */}
        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-white">
            Vive una experiencia con Jesús
          </h3>
          <p className="mb-4 text-sm text-slate-400">
            Escríbenos por WhatsApp y únete a nuestro próximo retiro.
          </p>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-hope px-5 py-3 text-sm font-semibold text-white shadow-glow-hope transition-transform hover:-translate-y-0.5"
          >
            <FaWhatsapp /> Únete ahora
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 px-5 py-6 text-center text-xs text-slate-500 sm:flex-row sm:px-8 sm:text-left lg:px-12">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-gradient-spirit font-medium">{SITE.slogan}</p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
