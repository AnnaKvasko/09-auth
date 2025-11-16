"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import css from "./Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api/clientApi";

interface Props {
  tag?: string;
}

const PER_PAGE = 12;

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleInputValue = (value: string) => {
    setInputValue(value);
    handleSearch(value);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, 700);

  const { data, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, searchValue, tag],
    queryFn: () => fetchNotes(page, PER_PAGE, searchValue || undefined, tag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleInputValue} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            setPage={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>

      {isFetching && <Loader />}

      {data && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
          page={page}
          search={searchValue}
          perPage={PER_PAGE}
          tagKey={tag ?? "all"}
        />
      )}

      {data && !isFetching && data.notes.length === 0 && <p>Empty...</p>}
    </div>
  );
}
