import Logo from "../components/ui/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="lg:bg-auth lg:bg-30 flex justify-center bg-purple-950 bg-left-bottom bg-no-repeat">
          <div className="w-80 py-10 lg:py-20">
            <Logo />
          </div>
        </div>
        <div className="p-10 lg:py-28">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </div>
    </section>
  );
}
