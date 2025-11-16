import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchServerNoteById } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/getQueryClient";
import { logErrorResponse } from "@/lib/utils/logErrorResponse";
import NotePreviewClient from "./NotePreview.client";

type PageProps = {
  params: { id: string };
};

export default async function InterceptedNoteModal({ params }: PageProps) {
  const { id } = params;
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchServerNoteById(id),
    });
  } catch (error) {
    logErrorResponse(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
