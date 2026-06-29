import type { IconType } from "react-icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  /** Ruta pública de la imagen (ej. "/images/gallery/foto.jpg"). Vacío = marcador. */
  imageUrl: string;
}

export interface CommunityEvent {
  id: string;
  name: string;
  /** Texto visible de la fecha (ej. "Próximamente 2026"). */
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
  /** Fecha ISO 8601 (ej. "2026-03-14T09:00") para datos estructurados de Google. */
  startDate?: string;
  endDate?: string;
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
