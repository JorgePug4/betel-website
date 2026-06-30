import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS } from "@utils/constants";
import { useContent } from "@/context/ContentContext";
import BrandLogo from "@components/BrandLogo";
import ThemeToggle from "@components/ThemeToggle";
import Button from "@components/Button";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("#inicio");

  const { events, gallery } = useContent();

  // Oculta "Galería"/"Eventos" solo cuando ya cargó y no hay elementos
  // (evita parpadeo mientras llega la data de Firebase).
  const visibleLinks = React.useMemo(
    () =>
      NAV_LINKS.filter((link) => {
        if (
          link.href === "#galeria" &&
          !gallery.loading &&
          gallery.data.length === 0
        )
          return false;
        if (
          link.href === "#eventos" &&
          !events.loading &&
          events.data.length === 0
        )
          return false;
        return true;
      }),
    [gallery.loading, gallery.data.length, events.loading, events.data.length],
  );

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el enlace activo según la sección visible
  React.useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // El header tiene fondo cuando hay scroll o cuando el menú móvil está abierto.
  // Sin fondo está sobre el Hero (siempre oscuro), por lo que el texto va en blanco.
  const solid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "glass-light shadow-glass py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="container-max flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#inicio");
          }}
          aria-label="Ir al inicio"
        >
          <BrandLogo />
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {visibleLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className={`group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-spirit"
                    : "text-surface-dark/80 hover:text-spirit dark:text-white/80"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-spirit transition-transform duration-300 ${
                    active === link.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            as="a"
            href="#contacto"
            className="hidden sm:inline-flex !px-5 !py-2.5 text-sm"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleNav("#contacto");
            }}
          >
            Únete a la Comunidad
          </Button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full glass-light text-spirit lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-black/5 dark:border-white/10 lg:hidden"
          >
            <ul className="container-max flex flex-col gap-1 px-5 pb-6 pt-4 sm:px-8">
              {visibleLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      active === link.href
                        ? "bg-spirit/10 text-spirit"
                        : "text-surface-dark dark:text-white hover:bg-spirit/10"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  as="a"
                  href="#contacto"
                  fullWidth
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleNav("#contacto");
                  }}
                >
                  Únete a la Comunidad
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
