import type { Metadata } from "next";
import { TAGS, type NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { NotesListResponse } from "@/lib/types";

const SITE_URL = "https://notehub.example.com";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = (slug?.[0] ?? "all") as (typeof TAGS)[number] | "all";
  const title =
    tag === "all"
      ? "Notes — All Notes"
      : `Notes — Filter: ${decodeURIComponent(tag)}`;
  const description =
    tag === "all"
      ? "Browse all your notes."
      : `Browse your notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/notes/filter/${tag}`,
      images: [{ url: OG_IMAGE }],
    },
  };
}

export default async function NotesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { slug } = await params;
  const { page: pageStr, search = "" } = await searchParams;

  const tag = (slug?.[0] ?? "all") as NoteTag | "all";
  const page = Number(pageStr ?? "1") || 1;
  const perPage = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<NotesListResponse>({
    queryKey: ["notes", { page, search, perPage, tag: tag ?? "all" }],
    queryFn: ({ signal }) =>
      fetchNotes(
        {
          page,
          perPage,
          search,
          tag: tag !== "all" ? (tag as NoteTag) : undefined,
        },
        signal
      ),
    staleTime: 30_000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
        perPage={perPage}
        currentTag={tag}
      />
    </HydrationBoundary>
  );
}
