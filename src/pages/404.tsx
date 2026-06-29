import * as React from "react";
import { Link, type HeadFC } from "gatsby";
import { FaHome } from "react-icons/fa";
import ParticleBackground from "@components/ParticleBackground";
import SEO from "@seo/SEO";

const NotFoundPage: React.FC = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-dark px-5 text-center">
      <div className="absolute inset-0 bg-gradient-hero" />
      <ParticleBackground count={24} />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="heading-xl text-7xl text-gradient-flame sm:text-9xl">
          404
        </h1>
        <p className="mt-4 text-xl font-semibold text-white">
          Esta página no fue encontrada
        </p>
        <p className="mt-2 max-w-md text-white/70">
          Pero el camino siempre está abierto. Volvamos juntos al inicio.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-spirit px-7 py-3.5 font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
        >
          <FaHome /> Volver al inicio
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <SEO title="Página no encontrada" />;
