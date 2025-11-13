"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

import ModalWrapper from "./ModalWrapper.client";
import css from "./Modal.module.css";

type NotePreviewProps = {
  id: string;
};

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });

  const handleClose = () => router.back();

  return (
    <ModalWrapper>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load note. Please try again.</p>}

      {note && (
        <>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>

          <button className={css.closeBtn} onClick={handleClose}>
            Close
          </button>
        </>
      )}
    </ModalWrapper>
  );
}
