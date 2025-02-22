import { resetPassword } from "@/actions/reset-password-action";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import SubmitButton from "../ui/SubmitButton";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const resetPasswordToken = resetPassword.bind(null, token);
  const [state, dispatch] = useFormState(resetPasswordToken, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) =>
        toast.error(error, {
          autoClose: 2000,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 1200,
        theme: "colored",
        onClose: () => router.push("/auth/login"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password"
          />
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-2xl font-bold">Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full rounded-lg border border-gray-300 p-3"
            name="password_confirmation"
          />
        </div>

        <SubmitButton
          pendingText="Enviando información"
          buttonText="Guardar Password"
        />
      </form>
    </>
  );
}
