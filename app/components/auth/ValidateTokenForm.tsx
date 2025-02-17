/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../ui/LoadingSpinner";

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenForm({
  setIsValidToken,
  setToken,
  token,
}: ValidateTokenFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const validateTokenInput = validateToken.bind(null, token);
  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      setIsLoading(true);
      dispatch();
    }
  }, [isComplete]);

  useEffect(() => {
    if ((isLoading && state.errors.length > 0) || state.success) {
      setIsLoading(false);
    }

    if (state.errors.length > 0) {
      state.errors.forEach((error) =>
        toast.error(error, {
          autoClose: 1500,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 2000,
        theme: "colored",
      });
      setIsValidToken(true);
    }
  }, [state]);

  const handleChange = (token: string) => {
    setIsComplete(false);
    setToken(token);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
    <>
      <div className="my-10 flex justify-center gap-5">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border border-gray-300 text-center placeholder-white shadow" />
        </PinInput>
      </div>
      <div className="mx-auto mt-5 max-w-xl text-center font-semibold">
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
}
