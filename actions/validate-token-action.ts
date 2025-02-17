"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export const validateToken = async (
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prevState: ActionStateType,
) => {
  const resetPasswordToken = TokenSchema.safeParse(token);

  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.errors.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${API_URL}/auth/validate_token`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
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
