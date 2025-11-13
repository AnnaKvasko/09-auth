import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_URL?.trim()
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "")}/api`
  : "https://notehub-api.goit.study/api";

export const api = axios.create({
  baseURL: base,

  withCredentials: true,
});
