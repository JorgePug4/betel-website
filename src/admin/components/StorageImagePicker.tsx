import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearch, FaImages, FaSpinner, FaCheck } from "react-icons/fa";
import {
  storageAdminService,
  type StorageFolder,
  type StorageFile,
} from "@/services/storageAdminService";

interface Props {
  folder: StorageFolder;
  /** Ruta actualmente seleccionada (para resaltarla). */
  selectedPath?: string;
  onSelect: (fullPath: string) => void;
  onClose: () => void;
}

/**
 * Selector de imágenes ya existentes en una carpeta de Firebase Storage.
 * Muestra miniatura + nombre de archivo con búsqueda, para reutilizar
 * imágenes sin volver a subirlas.
 */
export const StorageImagePicker: React.FC<Props> = ({
  folder,
  selectedPath,
  onSelect,
  onClose,
}) => {
  const [files, setFiles] = React.useState<StorageFile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    storageAdminService
      .list(folder)
      .then((data) => {
        if (active) setFiles(data);
      })
      .catch((err) => {
        if (active)
          setError(
            err instanceof Error ? err.message : "Error al listar imágenes.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [folder]);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return files;
    const q = search.toLowerCase();
    return files.filter((f) => f.name.toLowerCase().includes(q));
  }, [files, search]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Elegir imagen de ${folder}`}
        className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-white p-5 shadow-glass dark:bg-surface-dark"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-surface-dark dark:text-white">
              Imágenes en “{folder}”
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
            >
              <FaTimes />
            </button>
          </div>

          <div className="relative mb-4">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre..."
              className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-spirit dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center gap-2 py-12 text-slate-400">
                <FaSpinner className="animate-spin" /> Cargando imágenes…
              </div>
            )}

            {error && (
              <p className="py-8 text-center text-sm text-flame-fire">{error}</p>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
                <FaImages className="text-3xl" />
                <p className="text-sm">
                  {files.length === 0
                    ? `No hay imágenes en “${folder}”.`
                    : "Sin coincidencias."}
                </p>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {filtered.map((f) => {
                  const selected = f.fullPath === selectedPath;
                  return (
                    <li key={f.fullPath}>
                      <button
                        type="button"
                        onClick={() => onSelect(f.fullPath)}
                        className={`group relative w-full overflow-hidden rounded-xl border text-left transition-all ${
                          selected
                            ? "border-spirit ring-2 ring-spirit"
                            : "border-black/5 hover:border-spirit/50 dark:border-white/10"
                        }`}
                      >
                        <img
                          src={f.url}
                          alt={f.name}
                          loading="lazy"
                          className="aspect-square w-full object-cover"
                        />
                        {selected && (
                          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-spirit text-xs text-white">
                            <FaCheck />
                          </span>
                        )}
                        <span
                          className="block truncate px-2 py-1.5 text-xs font-medium text-surface-dark dark:text-slate-200"
                          title={f.name}
                        >
                          {f.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StorageImagePicker;
