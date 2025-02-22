"use server";

import { getToken } from "@/src/auth/token";
import {
  ChangePasswordSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function changePassword(
  prevState: ActionStateType,
  formData: FormData,
) {
  const passwordData = {
    current_password: formData.get("current_password"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const password = ChangePasswordSchema.safeParse(passwordData);
  if (!password.success) {
    return {
      errors: password.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/auth/update_password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      current_password: password.data.current_password,
      newPassword: password.data.password,
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
}
