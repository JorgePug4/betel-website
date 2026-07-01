import * as React from "react";
import { FaEnvelope, FaLock, FaSignInAlt, FaSpinner } from "react-icons/fa";
import BrandLogo from "@components/BrandLogo";
import { useAuth } from "@/context/AuthContext";

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-dark px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <BrandLogo light />
          <h1 className="font-display text-xl font-bold text-white">
            Panel de administración
          </h1>
          <p className="text-sm text-white/50">
            Acceso exclusivo para administradores.
          </p>
        </div>

        <div className="relative">
          <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-spirit"
          />
        </div>

        <div className="relative">
          <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-spirit"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-flame/15 p-3 text-sm text-flame-fire" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-spirit py-3 font-semibold text-white shadow-glow disabled:opacity-70"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Ingresando...
            </>
          ) : (
            <>
              <FaSignInAlt /> Ingresar
            </>
          )}
        </button>
      </form>
    </main>
  );
};

export default Login;
