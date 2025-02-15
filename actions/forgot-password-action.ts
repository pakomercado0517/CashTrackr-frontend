"use server";
import {
  ErrorResponseSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData,
) {
  const resetData = {
    email: formData.get("email"),
  };

  const email = ForgotPasswordSchema.safeParse(resetData);

  if (!email.success) {
    const errors = email.error.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  // Reset password
  const url = `${API_URL}/auth/forgot_password`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.data.email,
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
