import { verifySession } from "@/src/auth/dal";
import { getToken } from "@/src/auth/token";

export async function GET(
  req: Request,
  { params }: { params: { budgetId: string; expenseId: string } },
) {
  await verifySession();
  const { expenseId, budgetId } = params;
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  const expenseReq = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const expenseJson = await expenseReq.json();

  return Response.json(expenseJson);
}
