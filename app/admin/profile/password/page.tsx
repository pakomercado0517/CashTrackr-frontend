import ChangePasswordForm from "@/app/components/profile/ChangePasswordForm";

export default async function ChangePasswordPage() {
  return (
    <>
      <h1 className="my-5 text-4xl font-black text-purple-950">
        Cambiar Password
      </h1>
      <p className="text-xl font-bold">
        Aquí puedes cambiar tu {""}
        <span className="text-amber-500">password</span>
      </p>
      <ChangePasswordForm />
    </>
  );
}
