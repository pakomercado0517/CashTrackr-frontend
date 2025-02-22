"use server";

import { getToken } from "@/src/auth/token";
import {
  ErrorResponseSchema,
  SuccessSchema,
  UserDataSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updateUser(
  prevState: ActionStateType,
  formData: FormData,
) {
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  const user = UserDataSchema.safeParse(userData);
  if (!user.success) {
    return {
      errors: user.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.data.name,
      email: user.data.email,
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

  revalidatePath("/admin/profile/settings");
  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success,
  };
}
