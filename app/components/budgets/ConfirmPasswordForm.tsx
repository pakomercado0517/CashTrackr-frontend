"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useFormState } from "react-dom";
import deleteBudget from "@/actions/delete-budget-action";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SubmitButton from "../ui/SubmitButton";

export default function ConfirmPasswordForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = +searchParams.get("deleteBudgetId")!;

  const deleteBudgetWithId = deleteBudget.bind(null, budgetId);
  const [state, dispatch] = useFormState(deleteBudgetWithId, {
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
        autoClose: 2000,
        theme: "colored",
      });
      closeModal();
    }
  }, [state]);

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete("deleteBudgetId");
    router.replace(`${pathname}?${hideModal}`);
  };

  return (
    <>
      <DialogTitle as="h3" className="my-5 text-4xl font-black text-purple-950">
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">
        Ingresa tu Password para {""}
        <span className="text-amber-500">eliminar el presupuesto {""}</span>
      </p>
      <p className="text-sm text-gray-600">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold" htmlFor="password">
            Ingresa tu Password para eliminar
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <SubmitButton
            pendingText="Eliminando..."
            buttonText="Eliminar Presupuesto"
          />
          <button
            className="w-full cursor-pointer rounded-lg bg-amber-500 p-3 text-xl font-black text-white transition-colors hover:bg-amber-600"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
