/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useFormState } from "react-dom";
import { deleteExpense } from "@/actions/delete-expense-action";
import SubmitButton from "../ui/SubmitButton";
import { useEffect } from "react";
import { toast } from "react-toastify";

type DeleteExpenseForm = {
  closeModal: () => void;
};

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("deleteExpenseId")!;

  const deleteExpenseWithIds = deleteExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });
  const [state, dispatch] = useFormState(deleteExpenseWithIds, {
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
        theme: "colored",
      });
      closeModal();
    }
  }, [state]);

  useEffect(() => {
    if (!Number.isInteger(+budgetId) || !Number.isInteger(+expenseId)) {
      closeModal();
    }
  }, []);

  return (
    <>
      <DialogTitle as="h3" className="my-5 text-4xl font-black text-purple-950">
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Confirma para eliminar, {""}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className="text-sm text-gray-600">
        (Un gasto eliminado no se puede recuperar)
      </p>
      <div className="mt-10 grid grid-cols-2 gap-5">
        <button
          className="w-full cursor-pointer bg-amber-500 p-3 font-bold uppercase text-white transition-colors hover:bg-amber-600"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <div onClick={() => dispatch()}>
          <SubmitButton
            pendingText="Eliminando..."
            buttonText="Eliminar Gasto"
          />
        </div>
        {/* <button
          type="button"
          className="w-full cursor-pointer bg-red-500 p-3 font-bold uppercase text-white transition-colors hover:bg-red-600"
          onClick={() => dispatch()}
        >
          Eliminar
        </button> */}
      </div>
    </>
  );
}
