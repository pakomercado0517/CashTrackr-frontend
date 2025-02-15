/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { confirmAccount } from "@/actions/confirm-account.action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ConfirmAccountForm() {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  const confirmAccountWithToken = confirmAccount.bind(null, token);
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
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
      state.errors.map((error) =>
        toast.error(error, {
          autoClose: 3000,
          theme: "colored",
        }),
      );
    }

    if (state.success) {
      toast.success(state.success, {
        autoClose: 3000,
        theme: "colored",
        onClose: () => router.push("/auth/login"),
      });
    }
  }, [state]);

  const handleChange = (value: string) => {
    setIsComplete(false);
    setToken(value);
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
          <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow" />
          <PinInputField className="h-10 w-10 rounded-lg border-gray-300 text-center placeholder-white shadow" />
        </PinInput>
      </div>
      <div className="mx-auto mt-5 max-w-xl text-center font-semibold">
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
}
