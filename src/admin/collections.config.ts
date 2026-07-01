import type { StorageFolder } from "@/services/storageAdminService";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "image"
  | "datetime";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** Carpeta de Storage para campos de tipo "image". */
  storageFolder?: StorageFolder;
}

export interface CollectionConfig {
  /** Nombre de la colección en Firestore. */
  id: string;
  /** Etiqueta visible en la UI. */
  label: string;
  /** Campo usado como título de cada fila. */
  titleField: string;
  /** Campo por el que se ordena (debe existir en todos los docs). */
  orderField?: string;
  /** Documento único (singleton), p. ej. siteConfig/nextRetreat. */
  singletonId?: string;
  /** Solo lectura + borrado (sin crear/editar), p. ej. mensajes de contacto. */
  readOnly?: boolean;
  fields: FieldConfig[];
}

/**
 * Registro central de colecciones administrables. Agregar una colección nueva
 * = añadir una entrada aquí (no se toca la UI). Principio Open/Closed.
 */
export const COLLECTIONS: CollectionConfig[] = [
  {
    id: "events",
    label: "Eventos",
    titleField: "name",
    orderField: "order",
    fields: [
      { key: "name", label: "Nombre", type: "text", required: true },
      {
        key: "date",
        label: "Fecha (texto visible)",
        type: "text",
        required: true,
        placeholder: "30 de julio al 01 de agosto de 2026",
      },
      { key: "location", label: "Ubicación", type: "text", required: true },
      {
        key: "description",
        label: "Descripción",
        type: "textarea",
        required: true,
      },
      {
        key: "imagePath",
        label: "Imagen de portada",
        type: "image",
        storageFolder: "events",
      },
      {
        key: "infoImagePath",
        label: "Flyer (Más información)",
        type: "image",
        storageFolder: "events",
      },
      {
        key: "mapUrl",
        label: "URL de Google Maps",
        type: "text",
        placeholder: "https://maps.app.goo.gl/...",
      },
      { key: "mapQuery", label: "Dirección (búsqueda Maps)", type: "text" },
      { key: "order", label: "Orden", type: "number" },
      { key: "active", label: "Activo (visible en el sitio)", type: "boolean" },
      { key: "startDate", label: "Inicio ISO (SEO)", type: "datetime" },
      { key: "endDate", label: "Fin ISO (SEO)", type: "datetime" },
    ],
  },
  {
    id: "gallery",
    label: "Galería",
    titleField: "title",
    orderField: "order",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      {
        key: "imagePath",
        label: "Imagen",
        type: "image",
        storageFolder: "gallery",
        required: true,
      },
      { key: "order", label: "Orden", type: "number" },
      { key: "active", label: "Activo (visible)", type: "boolean" },
    ],
  },
  {
    id: "siteConfig",
    label: "Próximo Retiro",
    titleField: "title",
    singletonId: "nextRetreat",
    fields: [
      { key: "title", label: "Título", type: "text", required: true },
      { key: "date", label: "Fecha (texto)", type: "text", required: true },
      {
        key: "href",
        label: "Enlace del CTA",
        type: "text",
        placeholder: "#eventos",
      },
      {
        key: "imagePath",
        label: "Imagen",
        type: "image",
        storageFolder: "siteConfig",
      },
      {
        key: "showRegistrationButton",
        label: "Mostrar botón de inscripción",
        type: "boolean",
      },
      {
        key: "whatsappText",
        label: "Mensaje de WhatsApp",
        type: "textarea",
      },
    ],
  },
  {
    id: "contactMessages",
    label: "Mensajes de Contacto",
    titleField: "name",
    orderField: "createdAt",
    readOnly: true,
    fields: [
      { key: "name", label: "Nombre", type: "text" },
      { key: "email", label: "Correo", type: "text" },
      { key: "phone", label: "Teléfono", type: "text" },
      { key: "message", label: "Mensaje", type: "textarea" },
    ],
  },
];
