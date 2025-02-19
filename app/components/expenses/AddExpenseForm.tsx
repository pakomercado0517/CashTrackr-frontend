"use client";
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useFormState } from "react-dom";
import createExpense from "@/actions/create-expense-action";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const params = useParams();
  const budgetId = +params.id;
  const createExpenseBudgetId = createExpense.bind(null, budgetId);
  const [state, dispatch] = useFormState(createExpenseBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) =>
        toast.error(error, {
          autoClose: 1500,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 2000,
        theme: "colored",
      });
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="my-5 text-4xl font-black text-purple-950">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="mt-10 rounded-lg border bg-gray-100 p-10 shadow-lg"
        noValidate
        action={dispatch}
      >
        <ExpenseForm />
        <input
          type="submit"
          className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
}
