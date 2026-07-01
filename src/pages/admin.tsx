import * as React from "react";
import type { HeadFC } from "gatsby";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/admin/components/Toast";
import { ConfirmProvider } from "@/admin/components/ConfirmDialog";
import AdminApp from "@/admin/AdminApp";

/**
 * Ruta de administración. Se renderiza solo en el cliente (la autenticación
 * de Firebase usa IndexedDB y no existe en SSR/build).
 */
const AdminPage: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-dark text-white/60">
        Cargando…
      </div>
    );
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <AdminApp />
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AdminPage;

export const Head: HeadFC = () => (
  <>
    <title>Administración | Bet-el Casa Abierta</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
