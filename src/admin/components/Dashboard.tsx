import * as React from "react";
import {
  FaCalendarAlt,
  FaImages,
  FaStar,
  FaEnvelope,
  FaFolderOpen,
  FaArrowRight,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { COLLECTIONS } from "@/admin/collections.config";
import {
  firestoreRepository,
  type DocRecord,
} from "@/services/firestoreRepository";
import { useFirestoreSubscription } from "@/hooks/useFirestoreSubscription";

const ICONS: Record<string, IconType> = {
  events: FaCalendarAlt,
  gallery: FaImages,
  siteConfig: FaStar,
  contactMessages: FaEnvelope,
};

const StatCard: React.FC<{
  id: string;
  label: string;
  icon: IconType;
  onClick: () => void;
}> = ({ id, label, icon: Icon, onClick }) => {
  const subscribe = React.useCallback(
    (onData: (d: DocRecord[]) => void, onError: (e: unknown) => void) =>
      firestoreRepository.subscribe(id, onData, onError),
    [id],
  );
  const { data, loading } = useFirestoreSubscription<DocRecord[]>(subscribe, []);

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 text-left shadow-glass transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-surface-dark-soft"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-spirit text-xl text-white">
        <Icon />
      </span>
      <span className="flex-1">
        <span className="block font-display text-2xl font-bold text-surface-dark dark:text-white">
          {loading ? "…" : data.length}
        </span>
        <span className="text-sm text-slate-500">{label}</span>
      </span>
      <FaArrowRight className="text-slate-300 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

export const Dashboard: React.FC<{ onNavigate: (key: string) => void }> = ({
  onNavigate,
}) => (
  <section>
    <header className="mb-6">
      <h1 className="font-display text-2xl font-bold text-surface-dark dark:text-white">
        Panel de administración
      </h1>
      <p className="text-sm text-slate-500">
        Gestiona el contenido del sitio en tiempo real.
      </p>
    </header>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COLLECTIONS.map((c) => (
        <StatCard
          key={c.id}
          id={c.id}
          label={c.label}
          icon={ICONS[c.id] ?? FaFolderOpen}
          onClick={() => onNavigate(c.id)}
        />
      ))}
      <button
        onClick={() => onNavigate("__storage")}
        className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 text-left shadow-glass transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-surface-dark-soft"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-flame text-xl text-white">
          <FaFolderOpen />
        </span>
        <span className="flex-1">
          <span className="block font-display text-lg font-bold text-surface-dark dark:text-white">
            Almacenamiento
          </span>
          <span className="text-sm text-slate-500">Imágenes en Storage</span>
        </span>
        <FaArrowRight className="text-slate-300 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </section>
);

export default Dashboard;
