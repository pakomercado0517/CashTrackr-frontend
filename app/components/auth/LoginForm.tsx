"use client";

export default function LoginForm() {
  return (
    <>
      <form className="mt-14 space-y-5" noValidate>
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

        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
        />
      </form>
    </>
  );
}
