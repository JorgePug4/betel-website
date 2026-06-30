import type { GatsbySSR } from "gatsby";
import { ThemeProvider } from "./src/context/ThemeContext";
import { ContentProvider } from "./src/context/ContentContext";
import * as React from "react";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(ContentProvider, null, element),
  );
};

// Aplica el tema antes de la hidratación para evitar parpadeo (FOUC)
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setPreBodyComponents,
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: "es" });

  // Fuentes con preconnect + display=swap (no bloqueante, evita el @import lento)
  setHeadComponents([
    React.createElement("link", {
      key: "gf-preconnect-1",
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    }),
    React.createElement("link", {
      key: "gf-preconnect-2",
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    }),
    React.createElement("link", {
      key: "gf-stylesheet",
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap",
    }),
  ]);

  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-init",
      dangerouslySetInnerHTML: {
        __html: `(function(){try{var t=localStorage.getItem('betel-theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
      },
    }),
  ]);
};
