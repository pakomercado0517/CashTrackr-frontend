import EditBudgetForm from "@/app/components/admin/budgets/EditBudgetForm";
import { getToken } from "@/src/auth/token";
import { BudgetAPIResponseSchema } from "@/src/schemas/budgets";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditBudgetPageProps = {
  params: {
    id: string;
  };
};

async function getUserBudgetById(id: string) {
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
}

export default async function EditBudgetPage({ params }: EditBudgetPageProps) {
  const { id } = params;
  const budget = await getUserBudgetById(id);
  return (
    <>
      <div className="flex flex-col-reverse items-center md:flex-row md:justify-between">
        <div className="w-full md:w-auto">
          <h1 className="my-5 text-4xl font-black text-purple-950">
            Editar Presupuesto: {budget.name}
          </h1>
          <p className="text-xl font-bold">
            Llena el formulario y crea un nuevo {""}
            <span className="text-amber-500">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin"}
          className="w-full rounded-lg bg-amber-500 p-2 text-center font-bold text-white md:w-auto"
        >
          Volver
        </Link>
      </div>
      <div className="mt-10 border p-10 shadow-lg">
        <EditBudgetForm budget={budget} />
      </div>
    </>
  );
}
