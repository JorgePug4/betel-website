import * as React from "react";
import type { User } from "firebase/auth";
import {
  onAuthChange,
  checkIsAdmin,
  login as loginService,
  logout as logoutService,
} from "@/services/authService";

interface AuthValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    const unsub = onAuthChange(async (u) => {
      if (!active) return;
      if (u) {
        const admin = await checkIsAdmin(u);
        if (!active) return;
        setUser(u);
        setIsAdmin(admin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => {
      active = false;
      unsub();
    };
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    await loginService(email, password);
    // onAuthChange actualizará user/isAdmin.
  }, []);

  const logout = React.useCallback(async () => {
    await logoutService();
  }, []);

  const value = React.useMemo<AuthValue>(
    () => ({ user, isAdmin, loading, login, logout }),
    [user, isAdmin, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthValue => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
