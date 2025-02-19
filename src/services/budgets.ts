import { notFound } from "next/navigation";
import { cache } from "react";
import { getToken } from "@/src/auth/token";
import { BudgetAPIResponseSchema } from "@/src/schemas/budgets";

export const getUserBudgetById = cache(async (id: string) => {
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!req.ok) {
    notFound();
  }
  const json = await req.json();
  const budget = BudgetAPIResponseSchema.parse(json);
  return budget;
});
