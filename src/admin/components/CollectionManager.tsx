import * as React from "react";
import {
  FaPlus,
  FaPencilAlt,
  FaTrashAlt,
  FaSearch,
  FaInbox,
} from "react-icons/fa";
import type { CollectionConfig } from "@/admin/collections.config";
import {
  firestoreRepository,
  type DocRecord,
} from "@/services/firestoreRepository";
import { useFirestoreSubscription } from "@/hooks/useFirestoreSubscription";
import { DocumentForm } from "@/admin/components/DocumentForm";
import { useToast } from "@/admin/components/Toast";
import { useConfirm } from "@/admin/components/ConfirmDialog";
import { Skeleton, ErrorState } from "@components/StateViews";

interface Props {
  config: CollectionConfig;
}

export const CollectionManager: React.FC<Props> = ({ config }) => {
  const { notify } = useToast();
  const { confirm } = useConfirm();

  // Suscripción en tiempo real a la colección (vía hook reutilizable).
  const subscribe = React.useCallback(
    (
      onData: (d: DocRecord[]) => void,
      onError: (e: unknown) => void,
    ) =>
      firestoreRepository.subscribe(
        config.id,
        onData,
        onError,
        config.orderField,
      ),
    [config.id, config.orderField],
  );
  const { data, loading, error, retry } = useFirestoreSubscription<DocRecord[]>(
    subscribe,
    [],
    `No se pudo cargar "${config.label}".`,
  );

  const [editing, setEditing] = React.useState<DocRecord | "new" | null>(null);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((doc) =>
      config.fields.some((f) =>
        String(doc[f.key] ?? "").toLowerCase().includes(q),
      ),
    );
  }, [data, search, config.fields]);

  const singletonDoc = config.singletonId
    ? data.find((d) => d.id === config.singletonId) ?? null
    : null;

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      if (config.singletonId) {
        await firestoreRepository.upsert(config.id, config.singletonId, values);
      } else if (editing && editing !== "new") {
        await firestoreRepository.update(config.id, editing.id, values);
      } else {
        await firestoreRepository.create(config.id, values);
      }
      notify("Guardado correctamente.", "success");
      setEditing(null);
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error al guardar.", "error");
    }
  };

  const handleDelete = async (doc: DocRecord) => {
    const ok = await confirm({
      title: "Eliminar registro",
      message: `¿Seguro que deseas eliminar "${String(
        doc[config.titleField] ?? doc.id,
      )}"? Esta acción no se puede deshacer.`,
      confirmLabel: "Eliminar",
      danger: true,
    });
    if (!ok) return;
    try {
      await firestoreRepository.remove(config.id, doc.id);
      notify("Registro eliminado.", "success");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Error al eliminar.", "error");
    }
  };

  // Columnas: hasta 3 campos no-imagen + el título.
  const columns = config.fields
    .filter((f) => f.type !== "image" && f.type !== "textarea")
    .slice(0, 4);

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-dark dark:text-white">
            {config.label}
          </h1>
          <p className="text-sm text-slate-500">
            {config.singletonId
              ? "Configuración única"
              : `${data.length} registro(s)`}
          </p>
        </div>
        {!config.readOnly && !config.singletonId && (
          <button
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-spirit px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            <FaPlus /> Nuevo
          </button>
        )}
      </header>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      )}
      {error && <ErrorState message={error} onRetry={retry} />}

      {!loading && !error && (
        <>
          {/* SINGLETON (Próximo Retiro) */}
          {config.singletonId ? (
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-glass dark:border-white/10 dark:bg-surface-dark-soft">
              {singletonDoc ? (
                <dl className="grid gap-3 sm:grid-cols-2">
                  {config.fields.map((f) => (
                    <div key={f.key}>
                      <dt className="text-xs uppercase tracking-wide text-slate-400">
                        {f.label}
                      </dt>
                      <dd className="text-sm text-surface-dark dark:text-white">
                        {f.type === "boolean"
                          ? singletonDoc[f.key]
                            ? "Sí"
                            : "No"
                          : String(singletonDoc[f.key] ?? "—")}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-slate-500">
                  Aún no existe. Pulsa "Editar" para crearlo.
                </p>
              )}
              <button
                onClick={() => setEditing(singletonDoc ?? "new")}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-spirit px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <FaPencilAlt /> Editar
              </button>
            </div>
          ) : (
            <>
              {/* Búsqueda */}
              <div className="relative mb-4 max-w-sm">
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-spirit dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 py-16 text-slate-400 dark:border-white/10">
                  <FaInbox className="text-3xl" />
                  <p>Sin registros.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-black/5 dark:border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/5">
                      <tr>
                        {columns.map((c) => (
                          <th key={c.key} className="px-4 py-3 font-semibold">
                            {c.label}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-right font-semibold">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-t border-black/5 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
                        >
                          {columns.map((c) => (
                            <td
                              key={c.key}
                              className="max-w-[220px] truncate px-4 py-3 text-surface-dark dark:text-slate-200"
                            >
                              {c.type === "boolean"
                                ? doc[c.key]
                                  ? "Sí"
                                  : "No"
                                : String(doc[c.key] ?? "—")}
                            </td>
                          ))}
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              {!config.readOnly && (
                                <button
                                  onClick={() => setEditing(doc)}
                                  aria-label="Editar"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-spirit/10 text-spirit hover:bg-spirit/20"
                                >
                                  <FaPencilAlt className="text-xs" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(doc)}
                                aria-label="Eliminar"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-flame/10 text-flame-fire hover:bg-flame/20"
                              >
                                <FaTrashAlt className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Formulario */}
      {editing && (
        <DocumentForm
          title={`${editing === "new" ? "Nuevo" : "Editar"} · ${config.label}`}
          fields={config.fields}
          initial={editing === "new" ? null : editing}
          onCancel={() => setEditing(null)}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
};

export default CollectionManager;
