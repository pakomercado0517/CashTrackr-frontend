"use client";

import { useRouter } from "next/navigation";

export default function AddExpenseButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="cursor-pointer rounded-lg bg-amber-500 px-10 py-2 font-bold text-white"
      onClick={() => router.push("?addExpense=true&showModal=true")}
    >
      Agregar Gasto
    </button>
  );
}
