import { z } from "zod";

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  amount: z.coerce.number().min(1, { message: "Cantidad no válida" }),
});

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
});

export type Expense = z.infer<typeof ExpenseAPIResponseSchema>;
export type DraftExpense = z.infer<typeof DraftExpenseSchema>;
