import { api } from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export type NotesListResponse = {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  perPage: number;
};

export async function register(payload: {
  email: string;
  password: string;
}): Promise<User> {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
}

export async function login(payload: {
  email: string;
  password: string;
}): Promise<User> {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout", {});
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get<User | null>("/auth/session");
  return data ?? null;
}

export async function fetchNotes(
  params: { page: number; perPage: number; search?: string; tag?: NoteTag },
  signal?: AbortSignal
): Promise<NotesListResponse> {
  const { data } = await api.get<NotesListResponse>("/notes", {
    params,
    signal,
  });
  return data;
}

export async function fetchNoteById(
  id: string,
  signal?: AbortSignal
): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, { signal });
  return data;
}

export async function createNote(body: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> {
  const { data } = await api.post<Note>("/notes", body);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
}

export const getSession = checkSession;
