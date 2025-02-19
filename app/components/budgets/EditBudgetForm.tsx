"use client";

import { Budget } from "@/src/schemas/budgets";
import SubmitButton from "../ui/SubmitButton";
import BudgetForm from "./BudgetForm";
import { useFormState } from "react-dom";
import editBudget from "@/actions/budget-edit-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditBudgetForm({ budget }: { budget: Budget }) {
  const router = useRouter();
  const editBudgetWithId = editBudget.bind(null, budget.id);
  const [state, dispatch] = useFormState(editBudgetWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) =>
        toast.error(error, {
          autoClose: 1000,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 1500,
        theme: "colored",
      });
      router.push("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      <BudgetForm budget={budget} />
      <SubmitButton pendingText="Guardando" buttonText="Guardar Cambios" />
    </form>
  );
}
