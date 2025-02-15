"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";
const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
};

export async function confirmAccount(
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prevState: ActionStateType,
) {
  const confirmToken = TokenSchema.safeParse(token);

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const url = `${API_URL}/auth/confirm_account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  });

  const json = await req.json();
  if (req.status === 401) {
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
}
