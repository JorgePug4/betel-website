import * as React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaSpinner, FaUpload, FaSave } from "react-icons/fa";
import type { FieldConfig } from "@/admin/collections.config";
import { storageAdminService } from "@/services/storageAdminService";
import { useToast } from "@/admin/components/Toast";

type Values = Record<string, unknown>;

interface Props {
  title: string;
  fields: FieldConfig[];
  initial?: Values | null;
  onCancel: () => void;
  onSubmit: (values: Values) => Promise<void>;
}

function defaultFor(field: FieldConfig): unknown {
  if (field.type === "boolean") return false;
  if (field.type === "number") return "";
  return "";
}

export const DocumentForm: React.FC<Props> = ({
  title,
  fields,
  initial,
  onCancel,
  onSubmit,
}) => {
  const { notify } = useToast();
  const [values, setValues] = React.useState<Values>(() => {
    const v: Values = {};
    fields.forEach((f) => {
      v[f.key] = initial?.[f.key] ?? defaultFor(f);
    });
    return v;
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [uploading, setUploading] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  const setField = (key: string, value: unknown) =>
    setValues((v) => ({ ...v, [key]: value }));

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      const val = values[f.key];
      if (f.required && (val === "" || val === undefined || val === null)) {
        next[f.key] = "Este campo es obligatorio.";
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleUpload = async (field: FieldConfig, file: File) => {
    if (!field.storageFolder) return;
    setUploading(field.key);
    setProgress(0);
    try {
      const path = `${field.storageFolder}/${Date.now()}-${file.name}`;
      // Sube y guarda la RUTA (no la URL) para ser consistentes con la app.
      await storageAdminService.upload(
        field.storageFolder,
        file,
        setProgress,
        path.split("/").slice(1).join("/"),
      );
      setField(field.key, path);
      notify("Imagen subida correctamente.", "success");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error al subir.", "error");
    } finally {
      setUploading(null);
    }
  };

  const buildPayload = (): Values => {
    const payload: Values = {};
    fields.forEach((f) => {
      const val = values[f.key];
      if (f.type === "number") {
        if (val === "" || val === null) return;
        payload[f.key] = Number(val);
      } else if (f.type === "boolean") {
        payload[f.key] = Boolean(val);
      } else {
        payload[f.key] = val ?? "";
      }
    });
    return payload;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await onSubmit(buildPayload());
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-surface-dark outline-none focus:ring-2 focus:ring-spirit dark:border-white/10 dark:bg-white/5 dark:text-white";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="my-8 w-full max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-glass dark:bg-surface-dark"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-surface-dark dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
          >
            <FaTimes />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div
              key={f.key}
              className={f.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
                {f.label}
                {f.required && <span className="text-flame-fire"> *</span>}
              </label>

              {f.type === "textarea" && (
                <textarea
                  rows={3}
                  value={String(values[f.key] ?? "")}
                  onChange={(e) => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className={`${inputClass} resize-none`}
                />
              )}

              {(f.type === "text" || f.type === "datetime") && (
                <input
                  type={f.type === "datetime" ? "text" : "text"}
                  value={String(values[f.key] ?? "")}
                  onChange={(e) => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className={inputClass}
                />
              )}

              {f.type === "number" && (
                <input
                  type="number"
                  value={String(values[f.key] ?? "")}
                  onChange={(e) => setField(f.key, e.target.value)}
                  className={inputClass}
                />
              )}

              {f.type === "boolean" && (
                <label className="mt-1 inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(values[f.key])}
                    onChange={(e) => setField(f.key, e.target.checked)}
                    className="h-5 w-5 rounded border-black/20 text-spirit focus:ring-spirit"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {Boolean(values[f.key]) ? "Sí" : "No"}
                  </span>
                </label>
              )}

              {f.type === "image" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={String(values[f.key] ?? "")}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder="ruta/en/storage.jpg o URL"
                    className={inputClass}
                  />
                  <div className="flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-spirit/10 px-3 py-1.5 text-xs font-semibold text-spirit">
                      <FaUpload />
                      Subir imagen
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(f, file);
                        }}
                      />
                    </label>
                    {uploading === f.key && (
                      <span className="text-xs text-slate-500">
                        Subiendo… {progress}%
                      </span>
                    )}
                    {typeof values[f.key] === "string" &&
                      values[f.key] !== "" && (
                        <span className="truncate text-xs text-hope-life">
                          ✓ {String(values[f.key])}
                        </span>
                      )}
                  </div>
                </div>
              )}

              {errors[f.key] && (
                <p className="mt-1 text-xs text-flame-fire">{errors[f.key]}</p>
              )}
              {f.help && (
                <p className="mt-1 text-xs text-slate-400">{f.help}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || uploading !== null}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-spirit px-6 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            Guardar
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default DocumentForm;
