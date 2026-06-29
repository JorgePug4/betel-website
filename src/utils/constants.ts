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
  email: "contacto@comunidadbetel.org",
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
  { id: "1", title: "Retiro de jóvenes", imageUrl: "https://scontent.fmex26-1.fna.fbcdn.net/v/t39.30808-6/732908711_122106492441364093_6256236769554845915_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=s1080x1350&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFwPEBL-4dThCBLDTcRa4i-JRQGUg6TxLglFAZSDpPEuPZtub4xQ12iww5-rmHzofwJfyWwFiPmG9M_PJMt6FH9&_nc_ohc=QgsFP7Bj3PgQ7kNvwFDmmW8&_nc_oc=AdodsjECaLoJgfZ0ovfSQybK0eRhghghEw2OoEzeY0ehkrUPigukV7_NO37fIsggzzHRXLPS6gq4nuWj8c5GcyMY&_nc_zt=23&_nc_ht=scontent.fmex26-1.fna&_nc_gid=3fTxNTr6NuuNRRJ2aqU28A&_nc_ss=7b2a8&oh=00_Af_maCh6LkY4NmTc5SGrvadNVOcxsxrJYVO-kJjhTbfF1Q&oe=6A47994D" }
];

// Próximo retiro destacado (se promociona en el Hero).
export const NEXT_RETREAT = {
  title: "Retiro de Jóvenes “Encuentro”",
  date: "Próximamente 2026",
  href: "#eventos",
};

// Eventos estáticos.
export const EVENTS: CommunityEvent[] = [
  {
    id: "1",
    name: "Retiro de Jóvenes 'Encuentro'",
    date: "Próximamente 2026",
    location: "Casa de Retiros, Lima",
    description:
      "Un fin de semana para tener un encuentro personal con Jesús a través del Kerigma, la oración y la comunidad.",
  },
  {
    id: "2",
    name: "Noche de Adoración",
    date: "Cada último viernes",
    location: "Local de la comunidad",
    description:
      "Una noche de alabanza, adoración y palabra para renovar nuestra fe y crecer juntos en el Espíritu.",
  },
  {
    id: "3",
    name: "Formación de Discípulos",
    date: "Inscripciones abiertas",
    location: "Modalidad presencial",
    description:
      "Espacios de formación continua para profundizar en la fe y vivir conforme a las enseñanzas de Cristo.",
  },
];
