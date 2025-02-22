"use client";

import changePassword from "@/actions/change-password-action";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SubmitButton from "../ui/SubmitButton";

export default function ChangePasswordForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(changePassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) =>
        toast.error(error, {
          autoClose: 1200,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 2000,
        theme: "colored",
      });
      ref.current?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch} ref={ref}>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold" htmlFor="current_password">
            Password Actual
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Password Actual"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold" htmlFor="password">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="password_confirmation" className="text-2xl font-bold">
            Repetir Password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password_confirmation"
          />
        </div>

        <SubmitButton pendingText="Enviando..." buttonText="Cambiar Password" />
      </form>
    </>
  );
}
