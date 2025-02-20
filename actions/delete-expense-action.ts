"use server";

import { getToken } from "@/src/auth/token";
import { ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { Budget } from "@/src/schemas/budgets";
import { Expense } from "@/src/schemas/expenses";
import { revalidatePath } from "next/cache";

type BudgetIdAndExpenseIdType = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteExpense(
  { budgetId, expenseId }: BudgetIdAndExpenseIdType,
  prevState: ActionStateType,
) {
  //Eliminar Gasto
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
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

  revalidatePath(`/admin/budgets/${budgetId}`);
  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success,
  };
}
