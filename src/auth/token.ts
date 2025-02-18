import { cookies } from "next/headers";

export const getToken = () => cookies().get("CASHTRACKR_TOKEN")?.value;
