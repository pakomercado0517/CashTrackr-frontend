"use server";

import { getToken } from "@/src/auth/token";
import { ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { Budget, PasswordValidationSchema } from "@/src/schemas/budgets";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

const { API_URL } = process.env;

export default async function deleteBudget(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData,
) {
  const token = getToken();
  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get("password"),
  );

  if (currentPassword.error) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  //Comprobar Password
  const validatePasswordUrl = `${API_URL}/auth/check_password`;
  const validatePassword = await fetch(validatePasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: currentPassword.data,
    }),
  });
  const passwordResponse = await validatePassword.json();
  if (!validatePassword.ok) {
    const { error } = ErrorResponseSchema.parse(passwordResponse);
    return {
      errors: [error],
      success: "",
    };
  }

  //Borramos el presupuesto
  const url = `${API_URL}/budgets/${budgetId}`;
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }
  revalidatePath("/admin");
  const success = SuccessSchema.parse(json.message);
  return {
    errors: [],
    success,
  };
}
