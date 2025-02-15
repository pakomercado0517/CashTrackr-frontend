"use client";

import { forgotPassword } from "@/actions/forgot-password-action";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "../ui/SubmitButton";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      ref.current?.reset();
    }

    if (state.errors.length > 0) {
      state.errors.map((error) =>
        toast.error(error, {
          autoClose: 3000,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 3000,
        theme: "colored",
      });
    }
  }, [state]);

  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch} ref={ref}>
      <div className="mb-10 flex flex-col gap-2">
        <label className="text-2xl font-bold">Email</label>

        <input
          type="email"
          placeholder="Email de Registro"
          className="w-full rounded-lg border border-gray-300 p-3"
          name="email"
        />
      </div>

      <SubmitButton
        pendingText="Enviando Información..."
        buttonText="Enviar Instrucciones"
      />
    </form>
  );
}
