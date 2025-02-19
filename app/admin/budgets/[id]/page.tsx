import AddExpenseButton from "@/app/components/expenses/AddExpenseButton";
import ModalContainer from "@/app/components/ui/ModalContainer";
import { getUserBudgetById } from "@/src/services/budgets";
import { formatCurrency, formatDate } from "@/utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const budget = await getUserBudgetById(params.id);
  return {
    title: `CashTrackr - ${budget.name}`,
    description: `CashTrackr - ${budget.name}`,
  };
}

export default async function BudgetByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const budget = await getUserBudgetById(id);
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>
      {budget.expenses.length ? (
        <>
          <h1 className="mt-10 text-4xl font-black text-purple-950">
            Gastos en este Presupuesto
          </h1>
          <ul
            role="list"
            className="mt-10 divide-y divide-gray-300 border shadow-lg"
          >
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(+expense.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Agregado:{" "}
                      <span className="font-bold">
                        {formatDate(expense.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="py-20 text-center">No hay gastos aún</p>
      )}

      <ModalContainer />
    </>
  );
}
