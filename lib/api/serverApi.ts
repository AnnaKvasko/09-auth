// import axios from "axios";
// import { cookies } from "next/headers";
// import type { Note, NoteTag } from "@/types/note";
// import type { User } from "@/types/user";

// const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// function withCookie() {
//   const cookie = cookies().toString();
//   return axios.create({
//     baseURL,
//     withCredentials: true,
//     headers: { Cookie: cookie, "Content-Type": "application/json" },
//   });
// }

// export async function sFetchNotes(params: {
//   page: number;
//   perPage: number;
//   search?: string;
//   tag?: NoteTag;
// }) {
//   const api = withCookie();
//   const { data } = await api.get("/notes", { params });
//   return data as {
//     notes: Note[];
//     totalPages: number;
//     currentPage: number;
//     perPage: number;
//   };
// }

// export async function sFetchNoteById(id: string) {
//   const api = withCookie();
//   const { data } = await api.get<Note>(`/notes/${id}`);
//   return data;
// }

// export async function sGetMe() {
//   const api = withCookie();
//   const { data } = await api.get<User>("/users/me");
//   return data;
// }

// export async function sCheckSession() {
//   const api = withCookie();
//   const { data } = await api.get<User | undefined>("/auth/session");
//   return data;
// }
// lib/api/serverApi.ts
import { withCookie } from "./server";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

type NotesListResponse = {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  perPage: number;
};

export async function sFetchNotes(params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}) {
  const api = withCookie();
  const { data } = await api.get<NotesListResponse>("/notes", { params });
  return data;
}

export async function sFetchNoteById(id: string) {
  const api = withCookie();
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function sGetMe() {
  const api = withCookie();
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function sCheckSession() {
  const api = withCookie();
  const { data } = await api.get<User | null>("/auth/session");
  return data ?? null;
}
