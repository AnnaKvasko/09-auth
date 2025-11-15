// import { withCookie } from "./server";
// import type { AxiosResponse } from "axios";
// import type { Note, NoteTag } from "@/types/note";
// import type { User } from "@/types/user";

// type NotesListResponse = {
//   notes: Note[];
//   totalPages: number;
//   currentPage: number;
//   perPage: number;
// };

// export async function sFetchNotes(params: {
//   page: number;
//   perPage: number;
//   search?: string;
//   tag?: NoteTag;
// }): Promise<NotesListResponse> {
//   const api = withCookie();
//   const { data } = await api.get<NotesListResponse>("/notes", { params });
//   return data;
// }

// export async function sFetchNoteById(id: string): Promise<Note> {
//   const api = withCookie();
//   const { data } = await api.get<Note>(`/notes/${id}`);
//   return data;
// }

// export async function sGetMe(): Promise<User> {
//   const api = withCookie();
//   const { data } = await api.get<User>("/users/me");
//   return data;
// }

// export async function sCheckSession(): Promise<AxiosResponse<User | null>> {
//   const api = withCookie();
//   const response = await api.get<User | null>("/auth/session");
//   return response;
// }

// export async function fetchNotes(
//   params: {
//     page: number;
//     perPage: number;
//     search?: string;
//     tag?: NoteTag;
//   },
//   _signal?: AbortSignal
// ): Promise<NotesListResponse> {
//   return sFetchNotes(params);
// }

// export async function fetchNoteById(
//   id: string,
//   _signal?: AbortSignal
// ): Promise<Note> {
//   return sFetchNoteById(id);
// }

// export async function getMe(_signal?: AbortSignal): Promise<User> {
//   return sGetMe();
// }
import { withCookie } from "./server";
import type { AxiosResponse } from "axios";
import { isAxiosError } from "axios";
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
}): Promise<NotesListResponse> {
  const api = withCookie();
  const { data } = await api.get<NotesListResponse>("/notes", { params });
  return data;
}

export async function sFetchNoteById(id: string): Promise<Note> {
  const api = withCookie();
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function sGetMe(): Promise<User> {
  const api = withCookie();
  const { data } = await api.get<User>("/users/me");
  return data;
}

/**
 * Безпечна версія sGetMe:
 * - якщо бекенд повертає 401 → повертаємо null (користувач неавторизований)
 * - інші помилки пробрасываємо далі
 */
export async function safeGetMe(): Promise<User | null> {
  try {
    return await sGetMe();
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}

export async function sCheckSession(): Promise<AxiosResponse<User | null>> {
  const api = withCookie();
  const response = await api.get<User | null>("/auth/session");
  return response;
}

export async function fetchNotes(
  params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: NoteTag;
  },
  _signal?: AbortSignal
): Promise<NotesListResponse> {
  return sFetchNotes(params);
}

export async function fetchNoteById(
  id: string,
  _signal?: AbortSignal
): Promise<Note> {
  return sFetchNoteById(id);
}

export async function getMe(_signal?: AbortSignal): Promise<User> {
  return sGetMe();
}
