import type { Metadata } from "next";
import { isAxiosError } from "axios";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import getQueryClient from "@/lib/getQueryClient";

import NoteDetailsClient from "./NoteDetails.client";

const SITE_URL = "https://notehub.example.com";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  try {
    const note = await fetchNoteById(id);
    const title = `Note — ${note.title}`;
    const description = note.content
      ? note.content.slice(0, 120) + "..."
      : "View note details on NoteHub.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/notes/${id}`,
        images: [{ url: OG_IMAGE }],
      },
    };
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 404) {
      const title = "Note Not Found — NoteHub";
      const description = "This note could not be found.";

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url: `${SITE_URL}/notes/${id}`,
          images: [{ url: OG_IMAGE }],
        },
      };
    }
    throw e;
  }
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: ({ signal }) => fetchNoteById(id, signal),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
