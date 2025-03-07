import Link from "next/link";
import Logo from "../components/ui/Logo";
import { verifySession } from "@/src/auth/dal";
import AdminMenu from "../components/admin/AdminMenu";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  return (
    <>
      <div className="grid min-h-screen w-full grid-rows-[auto,1fr,auto]">
        <header className="bg-purple-950 py-5">
          <div className="items-evenly mx-auto flex max-w-5xl flex-row items-center justify-between">
            <div className="w-96">
              <Link href={"/admin"}>
                <Logo />
              </Link>
            </div>
            <AdminMenu user={user} />
          </div>
        </header>
        <section className="mx-auto mt-20 w-screen gap-20 p-3">
          {children}
        </section>

        <footer className="py-5">
          <p className="text-center">
            Todos los Derechos Reservados {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
}
