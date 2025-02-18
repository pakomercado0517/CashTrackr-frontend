//Data Access Layer for authentication
import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { UserSchema } from "../schemas";
import { getToken } from "./token";
const { API_URL } = process.env;

export const verifySession = cache(async () => {
  const token = getToken();
  if (!token) {
    redirect("/auth/login");
  }

  const url = `${API_URL}/auth/user`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await req.json();

  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
