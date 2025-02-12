"use client";

import { register } from "@/actions/create-account-action";
import { useFormState } from "react-dom";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import SubmitButton from "../ui/SubmitButton";

export default function RegisterForm() {
  const [state, dispatch] = useFormState(register, {
    errors: [],
    success: "",
  });

  return (
    <section>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        {state.errors.length > 0 &&
          state.errors.map((error) => (
            <ErrorMessage key={error}>{error}</ErrorMessage>
          ))}
        {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

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
