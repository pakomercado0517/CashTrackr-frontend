"use client";

export default function ForgotPasswordForm() {
  return (
    <form className="mt-14 space-y-5" noValidate>
      <div className="mb-10 flex flex-col gap-2">
        <label className="text-2xl font-bold">Email</label>

        <input
          type="email"
          placeholder="Email de Registro"
          className="w-full rounded-lg border border-gray-300 p-3"
          name="email"
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800"
      />
    </form>
  );
}
