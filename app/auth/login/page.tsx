import type { Metadata } from "next";
import LoginForm from "@/app/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Iniciar Sesión",
  description: "CashTrackr - Iniciar Sesión",
};

export default function LoginPage() {
  return (
    <section>
      <h1 className="text-6xl font-black text-purple-950">Inicia Sesión</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <LoginForm />
      <nav className="mt-5 text-center">
        <div>
          <Link href={"/auth/register"}>
            <span className="text-md text-center font-semibold text-gray-400">
              ¿No tienes cuenta? Crea una aquí
            </span>
          </Link>
        </div>
        <div>
          <Link href={"/auth/forgot-password"}>
            <span className="text-md text-center font-semibold text-gray-400">
              ¿Olvidaste tu contraseña? Recuperala aquí
            </span>
          </Link>
        </div>
      </nav>
    </section>
  );
}
