"use client";

import { authenticateUser } from "@/actions/authenticate-user-action";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SubmitButton from "../ui/SubmitButton";

export default function LoginForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(authenticateUser, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      ref.current?.reset();
    }

    if (state.errors.length > 0) {
      state.errors.forEach((error) =>
        toast.error(error, { autoClose: 3000, theme: "colored" }),
      );
    }

    if (state.success) {
      toast.success(state.success, { autoClose: 3000, theme: "colored" });
    }
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password"
          />
        </div>

        <SubmitButton
          pendingText="Enviando Información..."
          buttonText="Iniciar Sesión"
        />
      </form>
    </>
  );
}
