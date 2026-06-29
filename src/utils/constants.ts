import {
  FaFireAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaDove,
  FaBookOpen,
  FaPrayingHands,
  FaSeedling,
  FaHeart,
} from "react-icons/fa";
import { GiCampfire } from "react-icons/gi";
import type {
  NavLink,
  IdentityCard,
  MissionStep,
  Testimonial,
  CommunityEvent,
  GalleryImage,
} from "@apptypes/index";

export const SITE = {
  name: "Comunidad Bet-el Casa Abierta",
  shortName: "Bet-el",
  slogan: "Proclamamos, formamos y caminamos con Cristo",
  phone: "+52 5545436232",
  whatsapp: "+52 5545436232",
  address: "CDMX, México",
  social: {
    instagram: "https://instagram.com/comunidadbetel",
    facebook: "https://facebook.com/comunidadbetel",
    youtube: "https://youtube.com/@comunidadbetel",
    tiktok: "https://tiktok.com/@comunidadbetel",
  },
};

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Nuestra Identidad", href: "#identidad" },
  { label: "Misión", href: "#mision" },
  { label: "Visión", href: "#vision" },
  { label: "Galería", href: "#galeria" },
  { label: "Eventos", href: "#eventos" },
  { label: "Contacto", href: "#contacto" },
];

export const IDENTITY_CARDS: IdentityCard[] = [
  {
    icon: FaFireAlt,
    title: "Proclamar el Kerigma",
    description: "Anunciar con fidelidad y alegría la Buena Nueva.",
    gradient: "from-flame-light via-flame to-flame-fire",
  },
  {
    icon: FaUsers,
    title: "Formar Jóvenes",
    description: "Acompañarlos en su crecimiento espiritual y humano.",
    gradient: "from-hope via-hope-life to-spirit",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Recordar la Promesa",
    description: "Mantener viva la certeza de que Cristo camina con nosotros.",
    gradient: "from-spirit via-spirit-deep to-spirit-deep",
  },
];

export const MISSION_STEPS: MissionStep[] = [
  {
    icon: FaDove,
    title: "Evangelización",
    description:
      "Promover la evangelización llevando el mensaje de salvación a los jóvenes de hoy.",
  },
  {
    icon: GiCampfire,
    title: "Retiros Espirituales",
    description:
      "Crear espacios de encuentro personal con Jesús a través de retiros transformadores.",
  },
  {
    icon: FaSeedling,
    title: "Formación de Discípulos",
    description:
      "Acompañar a cada joven en su proceso de conversión y crecimiento en la fe.",
  },
  {
    icon: FaPrayingHands,
    title: "Vida en Comunidad",
    description:
      "Caminar juntos viviendo conforme a las enseñanzas de Cristo, en unidad y amor.",
  },
];

export const VISION_PILLARS = [
  { icon: FaDove, label: "Guiados por el Espíritu Santo" },
  { icon: FaSeedling, label: "Vida espiritual fortalecida" },
  { icon: FaHeart, label: "Jóvenes y familias unidas" },
  { icon: FaBookOpen, label: "Discípulos enviados al mundo" },
];

export const BIBLE_VERSE = {
  reference: "Mateo 28:18-20 (NTV)",
  text: `Jesús se acercó y dijo a sus discípulos: «Se me ha dado toda autoridad en el cielo y en la tierra. Por lo tanto, vayan y hagan discípulos de todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo. Enseñen a los nuevos discípulos a obedecer todos los mandatos que les he dado. Y tengan por seguro esto: que estoy con ustedes siempre, hasta el fin de los tiempos.»`,
  caption:
    "Llamados a la evangelización de jóvenes para formar discípulos de Cristo, vivir conforme a sus enseñanzas y recordar que Él está presente con nosotros.",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "María Fernanda",
    role: "Joven de la comunidad",
    quote:
      "En el retiro encontré un Dios vivo y cercano. Mi vida cambió por completo cuando entendí cuánto me ama.",
  },
  {
    id: "2",
    name: "Diego Alonso",
    role: "Discípulo en formación",
    quote:
      "Bet-el se convirtió en mi segunda casa. Aquí aprendí a caminar con Cristo y a servir con alegría.",
  },
  {
    id: "3",
    name: "Camila Rojas",
    role: "Servidora de retiros",
    quote:
      "El Kerigma me confrontó con el amor del Padre. Hoy quiero que más jóvenes vivan esta misma experiencia.",
  },
];

// Galería estática.
// Coloca tus fotos en `static/images/gallery/` y referencia la ruta en `imageUrl`
// (por ejemplo "/images/gallery/retiro-2026.jpg").
// Si `imageUrl` queda vacío se muestra un marcador de color con degradado.
export const GALLERY_IMAGES: GalleryImage[] = [
  
];

// Próximo retiro destacado (se promociona en el Hero).
export const NEXT_RETREAT = {
  title: "Retiro de Jóvenes",
  date: "30 de julio al 01 de agosto de 2026",
  href: "#eventos",
};

// Eventos estáticos.
export const EVENTS: CommunityEvent[] = [
  {
    id: "1",
    name: "Retiro de Jóvenes 'Encuentro'",
    date: "30 de julio al 01 de agosto de 2026",
    location: "CDMX, México zona sur Alvaro Obregón",
    description:
      "Un fin de semana para tener un encuentro personal con Jesús a través del Kerigma, la oración y la comunidad.",
    // Imagen (flyer/cartel) que se despliega con el botón "Más información".
    // Coloca el archivo en `static/images/events/` y referencia su ruta.
    imageUrl: "/images/events/encuentro.png",
    infoImage: "/images/events/propaganda_retiro.jpg"
  },
];

// Enlaces de navegación visibles: oculta las secciones vacías
// (galería sin imágenes / eventos sin elementos).
export const VISIBLE_NAV_LINKS: NavLink[] = NAV_LINKS.filter((link) => {
  if (link.href === "#galeria" && GALLERY_IMAGES.length === 0) return false;
  if (link.href === "#eventos" && EVENTS.length === 0) return false;
  return true;
});
