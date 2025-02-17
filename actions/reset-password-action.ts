"use server";

import {
  ErrorResponseSchema,
  ResetPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export const resetPassword = async (
  token: string,
  prevState: ActionStateType,
  formData: FormData,
) => {
  const newPasswordData = {
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const resetPassword = ResetPasswordSchema.safeParse(newPasswordData);

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.errors.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${API_URL}/auth/reset_password/${token}`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: newPasswordData.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success,
  };
};
