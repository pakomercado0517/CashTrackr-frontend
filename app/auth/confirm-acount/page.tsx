import ConfirmAccountForm from "@/app/components/auth/ConfirmAccountForm";
import React from "react";

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="text-6xl font-black text-purple-950">
        Confirma tu Cuenta
      </h1>
      <p className="text-3xl font-bold">
        Ingresa el código que rebiste{" "}
        <span className="text-amber-500">por email</span>
      </p>

      <ConfirmAccountForm />
    </>
  );
}
