"use server";

import { getToken } from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { DraftBudgetSchema } from "@/src/schemas/budgets";
import { revalidatePath } from "next/cache";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function createBudget(
  prevState: ActionStateType,
  formData: FormData,
) {
  const token = getToken();

  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!budget.success) {
    return {
      errors: budget.error.errors.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${API_URL}/budgets`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  });

  const json = await req.json();

  revalidatePath("/admin");
  const success = SuccessSchema.parse(json.message);
  return {
    errors: [],
    success,
  };
}
