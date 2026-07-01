import * as React from "react";
import {
  FaThLarge,
  FaCalendarAlt,
  FaImages,
  FaStar,
  FaEnvelope,
  FaFolderOpen,
  FaSpinner,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { useAuth } from "@/context/AuthContext";
import { COLLECTIONS } from "@/admin/collections.config";
import AdminLayout, { type NavItem } from "@/admin/components/AdminLayout";
import Login from "@/admin/components/Login";
import Dashboard from "@/admin/components/Dashboard";
import CollectionManager from "@/admin/components/CollectionManager";
import StorageManager from "@/admin/components/StorageManager";

const COLLECTION_ICONS: Record<string, IconType> = {
  events: FaCalendarAlt,
  gallery: FaImages,
  siteConfig: FaStar,
  contactMessages: FaEnvelope,
};

const NAV_ITEMS: NavItem[] = [
  { key: "__dashboard", label: "Dashboard", icon: FaThLarge },
  ...COLLECTIONS.map((c) => ({
    key: c.id,
    label: c.label,
    icon: COLLECTION_ICONS[c.id] ?? FaFolderOpen,
  })),
  { key: "__storage", label: "Almacenamiento", icon: FaFolderOpen },
];

/** Pantalla centrada simple (carga / sin permisos). */
const Centered: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen items-center justify-center bg-surface-dark px-5 text-center text-white">
    <div className="flex flex-col items-center gap-4">{children}</div>
  </div>
);

export const AdminApp: React.FC = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const [active, setActive] = React.useState("__dashboard");

  if (loading) {
    return (
      <Centered>
        <FaSpinner className="animate-spin text-3xl text-spirit" />
        <p className="text-white/60">Cargando…</p>
      </Centered>
    );
  }

  // Ruta privada: sin sesión → login.
  if (!user) return <Login />;

  // Con sesión pero sin rol admin → acceso denegado.
  if (!isAdmin) {
    return (
      <Centered>
        <FaLock className="text-3xl text-flame" />
        <h1 className="font-display text-xl font-bold">Acceso restringido</h1>
        <p className="max-w-sm text-white/60">
          Tu cuenta no tiene permisos de administrador. Contacta al responsable
          del sitio.
        </p>
        <button
          onClick={logout}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold"
        >
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </Centered>
    );
  }

  const activeCollection = COLLECTIONS.find((c) => c.id === active);

  return (
    <AdminLayout
      items={NAV_ITEMS}
      active={active}
      onNavigate={setActive}
      email={user.email}
      onLogout={logout}
    >
      {active === "__dashboard" && <Dashboard onNavigate={setActive} />}
      {active === "__storage" && <StorageManager />}
      {activeCollection && (
        <CollectionManager key={activeCollection.id} config={activeCollection} />
      )}
    </AdminLayout>
  );
};

export default AdminApp;
