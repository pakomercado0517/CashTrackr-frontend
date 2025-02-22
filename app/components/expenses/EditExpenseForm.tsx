import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExpense } from "@/src/schemas/expenses";
import { useFormState } from "react-dom";
import editExpense from "@/actions/expense-edit-action";
import { toast } from "react-toastify";
import SubmitButton from "../ui/SubmitButton";

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [expense, setExpense] = useState<DraftExpense>();
  const params = useParams();
  const searchParams = useSearchParams();
  const budgetId = +params.id;
  const expenseId = +searchParams.get("editExpenseId")!;

  const editExpenseWithIds = editExpense.bind(null, {
    budgetId,
    expenseId,
  });

  const [state, dispatch] = useFormState(editExpenseWithIds, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpense(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.errors) {
      state.errors.map((error) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="my-5 text-4xl font-black text-purple-950">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="mt-10 rounded-lg border bg-gray-100 p-10 shadow-lg"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={expense} />
        <SubmitButton
          pendingText="Actualizando..."
          buttonText="Guardar Cambios"
        />
      </form>
    </>
  );
}
