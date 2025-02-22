import { verifySession } from "@/src/auth/dal";
import { getToken } from "@/src/auth/token";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  await verifySession();
  const token = getToken();
  const url = `${process.env.API_URL}/auth/user`;

  const authReq = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await authReq.json();
  return Response.json(json);
}
