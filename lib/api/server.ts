import axios from "axios";
import { cookies } from "next/headers";

export function withCookie() {
  const cookieStore = cookies();

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    withCredentials: true,
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
  });

  return api;
}
