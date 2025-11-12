import axios from "axios";
import { cookies } from "next/headers";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export function withCookie() {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Cookie: cookies().toString(),
      "Content-Type": "application/json",
    },
  });
}
