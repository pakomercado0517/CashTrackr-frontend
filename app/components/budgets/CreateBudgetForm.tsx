"use client";

import createBudget from "@/actions/create-budget-action";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import BudgetForm from "./BudgetForm";
import SubmitButton from "../ui/SubmitButton";

export default function CreateBudgetForm() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [state, dispatch] = useFormState(createBudget, {
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
      ref.current?.reset();
      toast.success(state.success, {
        autoClose: 2000,
        theme: "colored",
      });
      router.push("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch} ref={ref}>
      <BudgetForm />
      <SubmitButton
        pendingText="Creando Presupuesto"
        buttonText="Crear Presupuesto"
      />
    </form>
  );
}
