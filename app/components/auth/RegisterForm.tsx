"use client";

import { register } from "@/actions/create-account-action";

export default function RegisterForm() {
  return (
    <section>
      <form className="mt-14 space-y-5" noValidate action={register}>
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

        <input
          type="submit"
          value="Registrarme"
          className="block w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
        />
      </form>
    </section>
  );
}
