import { useFormStatus } from "react-dom";
import LoadingSpinner from "./LoadingSpinner";

type SubmitButtonProps = {
  pendingText: string;
  buttonText: string;
};
export default function SubmitButton({
  pendingText,
  buttonText,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`block w-full cursor-pointer rounded-lg bg-purple-950 p-3 text-xl font-black text-white hover:bg-purple-800`}
    >
      <div className="flex items-center justify-center">
        <span className="mr-2">{pending ? <LoadingSpinner /> : ""}</span>{" "}
        {pending ? pendingText : buttonText}
      </div>
    </button>
  );
}
