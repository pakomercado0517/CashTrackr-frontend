export default function ExpenseForm() {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="text-sm font-bold uppercase">
          Nombre Gasto
        </label>
        <input
          id="name"
          className="w-full border border-gray-100 bg-white p-3"
          type="text"
          placeholder="Nombre del Gasto"
          name="name"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="text-sm font-bold uppercase">
          Cantidad Gasto
        </label>
        <input
          id="amount"
          className="w-full border border-gray-100 bg-white p-3"
          type="number"
          placeholder="Cantidad Gasto"
          name="amount"
        />
      </div>
    </>
  );
}
