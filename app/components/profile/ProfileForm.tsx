"use client";

import { User } from "@/src/schemas";
import { useEffect } from "react";
import SubmitButton from "../ui/SubmitButton";
import { useFormState } from "react-dom";
import { updateUser } from "@/actions/update-user-action";
import { toast } from "react-toastify";

export default function ProfileForm({ user }: { user: User }) {
  const [state, dispatch] = useFormState(updateUser, {
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
        autoClose: 1500,
        theme: "colored",
      });
    }
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold">Nombre</label>
          <input
            type="name"
            placeholder="Tu Nombre"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="name"
            defaultValue={user.name}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Tu Email"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="email"
            defaultValue={user.email}
          />
        </div>

        <SubmitButton
          pendingText="Enviando Información..."
          buttonText="Guardar Cambios"
        />
      </form>
    </>
  );
}
