"use client";

import { register } from "@/actions/create-account-action";
import { useFormState } from "react-dom";
import SubmitButton from "../ui/SubmitButton";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(register, {
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
    <section>
      <form className="mt-14 space-y-5" noValidate action={dispatch} ref={ref}>
        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="name"
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

        <div className="flex flex-col gap-2">
          <label className="text-2xl font-bold">Repetir Password</label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password_confirmation"
          />
        </div>

        <SubmitButton pendingText="Registrando..." buttonText="Registrar" />
      </form>
    </section>
  );
}
