import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Recuperar contraseña",
  description: "CashTrackr - Recuperar contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <section>
      <h1 className="text-6xl font-black text-purple-950">
        ¿Olvidaste tu contraseña?
      </h1>
      <p className="text-3xl font-bold">
        aquí puedes <span className="text-amber-500">reestablecerla</span>
      </p>
      <ForgotPasswordForm />
      <nav className="mt-5 text-center">
        <Link href={"/auth/login"}>
          <span className="text-md text-center font-semibold text-gray-400">
            ¿Quieres Iniciar Sesión? Hazlo aquí
          </span>
        </Link>
      </nav>
    </section>
  );
}
