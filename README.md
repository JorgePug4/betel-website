# Comunidad Bet-el Casa Abierta — Sitio Web

Sitio web estático, moderno y optimizado para SEO de la comunidad cristiana
juvenil **Bet-el Casa Abierta**, construido con **GatsbyJS + TypeScript +
Tailwind CSS + Framer Motion**.

> _"Proclamamos, formamos y caminamos con Cristo"_

---

## 🚀 Tecnologías

- **Gatsby 5** (React 18, TypeScript)
- **Tailwind CSS 3** (modo claro / oscuro)
- **Framer Motion** (animaciones y microinteracciones)
- **Swiper** (carruseles de galería y testimonios)
- **React Hook Form + Zod** (validación del formulario)
- **React Icons**
- SEO con la **Head API** de Gatsby (Open Graph, Twitter Cards, JSON-LD),
  `gatsby-plugin-sitemap` y `robots.txt`

> 100% estático: **no requiere backend ni base de datos**. La galería y los
> eventos se definen en el código y el formulario de contacto envía por WhatsApp.

---

## 📦 Instalación

```bash
npm install
```

Variables de entorno (opcional, solo para el SEO/sitemap):

```bash
cp .env.example .env.development
```

```env
GATSBY_SITE_URL=https://comunidadbetel.org
```

---

## 🧑‍💻 Comandos

```bash
npm run develop     # Servidor de desarrollo (http://localhost:8000)
npm run build       # Build de producción
npm run serve       # Sirve el build
npm run typecheck   # Verifica tipos de TypeScript
npm run clean       # Limpia caché de Gatsby
```

---

## 🖼️ Galería (imágenes estáticas)

1. Coloca tus fotos en `static/images/gallery/`.
2. Referencia cada archivo en [`src/utils/constants.ts`](src/utils/constants.ts)
   dentro de `GALLERY_IMAGES`:

```ts
export const GALLERY_IMAGES = [
  { id: "1", title: "Retiro de jóvenes 2026", imageUrl: "/images/gallery/retiro-2026.jpg" },
  // ...
];
```

Si `imageUrl` queda vacío se muestra un marcador con degradado de color.

---

## 📅 Eventos

Edita el arreglo `EVENTS` en [`src/utils/constants.ts`](src/utils/constants.ts)
(nombre, fecha, ubicación, descripción y, opcionalmente, una imagen).

---

## ✉️ Contacto

El formulario valida los datos (React Hook Form + Zod) y abre **WhatsApp** con
el mensaje prellenado hacia el número configurado en `SITE.whatsapp`
(en `src/utils/constants.ts`). No se almacena nada en ningún servidor.

---

## 🎨 Identidad visual

Paleta extraída del logo:

| Color                  | Hex       |
| ---------------------- | --------- |
| Azul Espíritu Santo    | `#00AEEF` |
| Azul Profundo          | `#005B9A` |
| Verde Esperanza        | `#7ED957` |
| Verde Vida             | `#4CAF50` |
| Naranja Evangelización | `#FF7A00` |
| Amarillo Luz           | `#FFD54F` |
| Rojo Fuego             | `#FF3D00` |

Reemplaza `src/assets/logo.png` por el logo oficial (PNG cuadrado, ≥512px) para
actualizar el favicon y el manifest PWA. Personaliza los datos de contacto y
redes sociales en el objeto `SITE` de `src/utils/constants.ts`.

---

## 📁 Estructura

```text
src/
├── animations/     # Variantes de Framer Motion
├── assets/         # Logo e imágenes
├── components/     # Componentes reutilizables (Navbar, Footer, Button…)
├── context/        # ThemeContext (modo claro/oscuro)
├── layouts/        # Layout principal
├── pages/          # index, 404
├── sections/       # Secciones de la home
├── seo/            # Componente SEO (Head API)
├── styles/         # CSS global + Tailwind
├── types/          # Tipos TypeScript
└── utils/          # Constantes, validación
```

---

## ♿ Accesibilidad y rendimiento

- HTML semántico, roles ARIA y enlace "saltar al contenido".
- Foco visible y soporte de `prefers-reduced-motion`.
- Imágenes con `loading="lazy"`.
- Objetivo Lighthouse: Performance / Accessibility / SEO / Best Practices > 95.

---

Hecho con fe para la **Comunidad Bet-el Casa Abierta**. 🕊️🔥✝️


---------------------------------DEPLOY-----------------------------------------------
npm run build
npx firebase-tools deploy 
