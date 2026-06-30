import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";

/**
 * Caché en memoria de URLs de descarga para evitar pedir la misma URL a
 * Storage en cada snapshot (optimiza lecturas y latencia).
 */
const urlCache = new Map<string, string>();

/**
 * Resuelve la URL pública de una imagen a partir de:
 *  - una URL completa (http/https) → se usa tal cual
 *  - una ruta pública local (empieza con "/") → se usa tal cual
 *  - una ruta de Firebase Storage (ej. "events/foo.jpg") → getDownloadURL()
 */
export async function resolveImageUrl(
  pathOrUrl?: string,
): Promise<string | undefined> {
  if (!pathOrUrl) return undefined;

  if (/^https?:\/\//.test(pathOrUrl) || pathOrUrl.startsWith("/")) {
    return pathOrUrl;
  }

  const cached = urlCache.get(pathOrUrl);
  if (cached) return cached;

  if (!storage) return undefined;

  const url = await getDownloadURL(ref(storage, pathOrUrl));
  urlCache.set(pathOrUrl, url);
  return url;
}

/** Resuelve varias rutas en paralelo (reutiliza la caché). */
export function resolveImageUrls(
  paths: (string | undefined)[],
): Promise<(string | undefined)[]> {
  return Promise.all(paths.map((p) => resolveImageUrl(p)));
}
