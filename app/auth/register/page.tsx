import type { Metadata } from "next";
import RegisterForm from "@/app/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Crear Cuenta",
  description: "CashTrackr - Crear cuenta",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-6xl font-black text-purple-950">Crea una Cuenta</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <RegisterForm />
      <nav className="mt-5 text-center">
        <Link href={"/auth/login"}>
          <span className="text-md text-center font-semibold text-gray-400">
            ¿Tienes cuenta? Inicia Sesión
          </span>
        </Link>
      </nav>
    </>
  );
}
