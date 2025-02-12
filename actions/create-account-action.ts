"use server";

import {
  ErrorResponseSchema,
  RegisterSchema,
  SuccessSchema,
} from "@/src/schemas";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  //validar
  const register = RegisterSchema.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  //registrar al usuario
  const url = `${API_URL}/auth/create_account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: register.data?.name,
      email: register.data?.email,
      password: register.data?.password,
    }),
  });

  const json = await req.json();
  if (req.status === 409) {
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
