import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/getQueryClient";
import { logErrorResponse } from "@/lib/utils/logErrorResponse";

import ModalWrapper from "./ModalWrapper.client";
import NotePreviewClient from "./NotePreview.client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterceptedNoteModal({ params }: PageProps) {
  const { id } = await params;

  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: ({ signal }) => fetchNoteById(id, signal),
    });
  } catch (error) {
    logErrorResponse(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalWrapper>
        <NotePreviewClient id={id} />
      </ModalWrapper>
    </HydrationBoundary>
  );
}
