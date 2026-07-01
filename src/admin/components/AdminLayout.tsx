import * as React from "react";
import type { IconType } from "react-icons";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import BrandLogo from "@components/BrandLogo";

export interface NavItem {
  key: string;
  label: string;
  icon: IconType;
}

interface Props {
  items: NavItem[];
  active: string;
  onNavigate: (key: string) => void;
  email: string | null;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<Props> = ({
  items,
  active,
  onNavigate,
  email,
  onLogout,
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  const Nav = (
    <nav className="flex flex-1 flex-col gap-1 p-4">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            onNavigate(item.key);
            setOpen(false);
          }}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
            active === item.key
              ? "bg-gradient-spirit text-white shadow-glow"
              : "text-slate-600 hover:bg-spirit/10 hover:text-spirit dark:text-slate-300"
          }`}
        >
          <item.icon className="text-base" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark">
      {/* Topbar móvil */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-white px-4 py-3 dark:border-white/10 dark:bg-surface-dark-soft lg:hidden">
        <BrandLogo />
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-spirit/10 text-spirit"
        >
          <FaBars />
        </button>
      </header>

      <div className="lg:flex">
        {/* Sidebar escritorio */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-black/5 bg-white dark:border-white/10 dark:bg-surface-dark-soft lg:flex">
          <div className="p-5">
            <BrandLogo />
          </div>
          {Nav}
          <div className="border-t border-black/5 p-4 dark:border-white/10">
            <p className="mb-2 truncate px-2 text-xs text-slate-400">{email}</p>
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-flame-fire transition-colors hover:bg-flame/10"
            >
              <FaSignOutAlt /> Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Drawer móvil */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white dark:bg-surface-dark-soft">
              <div className="flex items-center justify-between p-5">
                <BrandLogo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
                >
                  <FaTimes />
                </button>
              </div>
              {Nav}
              <div className="border-t border-black/5 p-4 dark:border-white/10">
                <p className="mb-2 truncate px-2 text-xs text-slate-400">
                  {email}
                </p>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-flame-fire hover:bg-flame/10"
                >
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Contenido */}
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
