import * as React from "react";
import { FaUpload, FaTrashAlt, FaSpinner, FaImages } from "react-icons/fa";
import {
  storageAdminService,
  STORAGE_FOLDERS,
  type StorageFolder,
  type StorageFile,
} from "@/services/storageAdminService";
import { useToast } from "@/admin/components/Toast";
import { useConfirm } from "@/admin/components/ConfirmDialog";
import { Skeleton, ErrorState } from "@components/StateViews";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export const StorageManager: React.FC = () => {
  const { notify } = useToast();
  const { confirm } = useConfirm();
  const [folder, setFolder] = React.useState<StorageFolder>(STORAGE_FOLDERS[0]);
  const [files, setFiles] = React.useState<StorageFile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState<number | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setFiles(await storageAdminService.list(folder));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al listar.");
    } finally {
      setLoading(false);
    }
  }, [folder]);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleUpload = async (file: File) => {
    setProgress(0);
    try {
      await storageAdminService.upload(folder, file, setProgress);
      notify("Imagen subida.", "success");
      await load();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error al subir.", "error");
    } finally {
      setProgress(null);
    }
  };

  const handleDelete = async (f: StorageFile) => {
    const ok = await confirm({
      title: "Eliminar imagen",
      message: `¿Eliminar "${f.name}"? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      danger: true,
    });
    if (!ok) return;
    try {
      await storageAdminService.remove(f.fullPath);
      notify("Imagen eliminada.", "success");
      await load();
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error al eliminar.", "error");
    }
  };

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-dark dark:text-white">
            Almacenamiento
          </h1>
          <p className="text-sm text-slate-500">
            Gestiona las imágenes de Firebase Storage.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-spirit px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          {progress !== null ? (
            <>
              <FaSpinner className="animate-spin" /> {progress}%
            </>
          ) : (
            <>
              <FaUpload /> Subir a “{folder}”
            </>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={progress !== null}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              e.target.value = "";
            }}
          />
        </label>
      </header>

      {/* Tabs de carpetas */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STORAGE_FOLDERS.map((f) => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              folder === f
                ? "bg-spirit text-white"
                : "bg-spirit/10 text-spirit hover:bg-spirit/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      )}
      {error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && files.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 py-16 text-slate-400 dark:border-white/10">
          <FaImages className="text-3xl" />
          <p>No hay imágenes en “{folder}”.</p>
        </div>
      )}

      {!loading && !error && files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((f) => (
            <div
              key={f.fullPath}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-glass dark:border-white/10 dark:bg-surface-dark-soft"
            >
              <img
                src={f.url}
                alt={f.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-3">
                <p className="truncate text-xs font-medium text-surface-dark dark:text-slate-200">
                  {f.name}
                </p>
                <p className="text-[11px] text-slate-400">{formatSize(f.size)}</p>
                <p className="mt-1 truncate text-[10px] text-slate-400">
                  {f.fullPath}
                </p>
              </div>
              <button
                onClick={() => handleDelete(f)}
                aria-label={`Eliminar ${f.name}`}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-flame-fire text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <FaTrashAlt className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default StorageManager;
