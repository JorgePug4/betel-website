import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase/config";
import { toFriendlyError } from "@/firebase/errors";

export interface StorageFile {
  name: string;
  fullPath: string;
  url: string;
  size: number;
  contentType: string;
}

/** Carpetas administrables en Storage. */
export const STORAGE_FOLDERS = ["events", "gallery", "siteConfig"] as const;
export type StorageFolder = (typeof STORAGE_FOLDERS)[number];

function requireStorage() {
  if (!storage) throw new Error("Storage no está disponible.");
  return storage;
}

export const storageAdminService = {
  /** Lista los archivos de una carpeta con su URL y metadatos. */
  async list(folder: StorageFolder): Promise<StorageFile[]> {
    const s = requireStorage();
    try {
      const res = await listAll(ref(s, folder));
      return Promise.all(
        res.items.map(async (item) => {
          const [url, meta] = await Promise.all([
            getDownloadURL(item),
            getMetadata(item),
          ]);
          return {
            name: item.name,
            fullPath: item.fullPath,
            url,
            size: meta.size,
            contentType: meta.contentType ?? "",
          } satisfies StorageFile;
        }),
      );
    } catch (err) {
      throw new Error(toFriendlyError(err, "No se pudieron listar los archivos."));
    }
  },

  /**
   * Sube un archivo reportando el progreso (0-100). Si `fullPath` apunta a un
   * archivo existente, lo reemplaza. Devuelve la URL de descarga.
   */
  upload(
    folder: StorageFolder,
    file: File,
    onProgress?: (percent: number) => void,
    fileName?: string,
  ): Promise<string> {
    const s = requireStorage();
    const name = fileName || `${Date.now()}-${file.name}`;
    const objectRef = ref(s, `${folder}/${name}`);
    const task = uploadBytesResumable(objectRef, file, {
      contentType: file.type,
    });

    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        (snap) => {
          const pct = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100,
          );
          onProgress?.(pct);
        },
        (err) =>
          reject(new Error(toFriendlyError(err, "No se pudo subir el archivo."))),
        async () => {
          try {
            resolve(await getDownloadURL(task.snapshot.ref));
          } catch (err) {
            reject(
              new Error(toFriendlyError(err, "No se pudo obtener la URL.")),
            );
          }
        },
      );
    });
  },

  /** Reemplaza un archivo existente conservando su nombre/ruta. */
  replace(
    fullPath: string,
    file: File,
    onProgress?: (percent: number) => void,
  ): Promise<string> {
    const [folder, ...rest] = fullPath.split("/");
    return this.upload(
      folder as StorageFolder,
      file,
      onProgress,
      rest.join("/"),
    );
  },

  /** Elimina un archivo por su ruta completa. */
  async remove(fullPath: string): Promise<void> {
    const s = requireStorage();
    try {
      await deleteObject(ref(s, fullPath));
    } catch (err) {
      throw new Error(toFriendlyError(err, "No se pudo eliminar el archivo."));
    }
  },
};
