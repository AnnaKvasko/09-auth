import type { Note } from "@/types/note";
import { NextServer } from "./api";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await NextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });
  return res.data;
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const res = await NextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export interface RequestBodyData {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (
  requestBody: RequestBodyData
): Promise<Note> => {
  const res = await NextServer.post<Note>("/notes", requestBody);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await NextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export type registerRequest = {
  email: string;
  password: string;
};

export const register = async (data: registerRequest): Promise<User> => {
  const res = await NextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: registerRequest): Promise<User> => {
  const res = await NextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await NextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const logout = async (): Promise<void> => {
  await NextServer.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const { data } = await NextServer.get<User>("/users/me");
  return data;
};

interface UpdateMeRequest {
  username: string;
}
export const updateMe = async (dataUser: UpdateMeRequest): Promise<User> => {
  const res = await NextServer.patch<User>("/users/me", dataUser);
  return res.data;
};
