"use server";

import { RegisterSchema } from "@/src/schemas";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
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
  console.log("json", json);

  return {
    errors: [],
  };
}
