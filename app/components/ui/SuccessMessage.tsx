export default function SuccessMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="bg-green-400 py-4 text-center text-sm font-bold uppercase text-white">
      {children}
    </p>
  );
}
