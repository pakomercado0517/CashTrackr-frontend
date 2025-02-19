"use server";

import { getToken } from "@/src/auth/token";
import { ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { Budget } from "@/src/schemas/budgets";
import { DraftExpenseSchema } from "@/src/schemas/expenses";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function createExpense(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData,
) {
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
    }),
  });

  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }
  const success = SuccessSchema.parse(json.message);
  revalidatePath(`/admin/budgets/${budgetId}`);
  return {
    errors: [],
    success,
  };
}
