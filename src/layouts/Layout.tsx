import * as React from "react";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import FloatingWhatsApp from "@components/FloatingWhatsApp";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface-light text-surface-dark transition-colors duration-500 dark:bg-surface-dark dark:text-slate-100">
      <a
        href="#quienes-somos"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-spirit focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
