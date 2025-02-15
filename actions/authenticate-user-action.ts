"use server";

import { ErrorResponseSchema, LoginSchema, SuccessSchema } from "@/src/schemas";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function authenticateUser(
  prevState: ActionStateType,
  formData: FormData,
) {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const login = LoginSchema.safeParse(loginData);

  if (!login.success) {
    const errors = login.error.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  // Authenticate user
  const url = `${API_URL}/auth/login`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: login.data.email,
      password: login.data.password,
    }),
  });

  const json = await req.json();

  if (req.status === 404) {
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
