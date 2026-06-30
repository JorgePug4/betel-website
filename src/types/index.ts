import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

/* ============================================================
 * Modelos de DOMINIO (lo que consume la UI; URLs ya resueltas)
 * ============================================================ */

export interface GalleryImage {
  id: string;
  title: string;
  /** URL de descarga resuelta desde Firebase Storage (o ruta pública). */
  imageUrl: string;
}

export interface CommunityEvent {
  id: string;
  name: string;
  /** Texto visible de la fecha (ej. "Próximamente 2026"). */
  date: string;
  location: string;
  description: string;
  /** URL de portada resuelta desde Storage. */
  imageUrl?: string;
  /** Imagen (flyer) que se despliega al pulsar "Más información". */
  infoImage?: string;
  /** Fecha ISO 8601 (ej. "2026-03-14T09:00") para datos estructurados de Google. */
  startDate?: string;
  endDate?: string;
}

export interface NextRetreat {
  title: string;
  date: string;
  /** Ancla o URL del CTA (por defecto "#eventos"). */
  href: string;
  /** Imagen opcional del próximo retiro. */
  imageUrl?: string;
  /** Controla en tiempo real si se muestra el botón de inscripción. */
  showRegistrationButton: boolean;
  /** Texto opcional para el mensaje de WhatsApp de inscripción. */
  whatsappText?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/* ============================================================
 * Documentos de FIRESTORE (forma cruda; guardan rutas de Storage)
 * ============================================================ */

export interface EventDoc {
  name: string;
  date: string;
  location: string;
  description: string;
  /** Ruta en Storage (ej. "events/encuentro.jpg") o URL completa. */
  imagePath?: string;
  /** Ruta en Storage del flyer de "Más información". */
  infoImagePath?: string;
  order?: number;
  active?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface GalleryDoc {
  title: string;
  imagePath: string;
  order?: number;
  active?: boolean;
}

export interface NextRetreatDoc {
  title: string;
  date: string;
  href?: string;
  imagePath?: string;
  showRegistrationButton?: boolean;
  whatsappText?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface IdentityCard {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
}

export interface MissionStep {
  icon: IconType;
  title: string;
  description: string;
}
