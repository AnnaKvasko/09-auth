"use client";

import type { Dispatch, SetStateAction } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  return (
    <ul className={css.pagination}>
     
      <li
        className={`${css.page} ${prevDisabled ? css.disabled : ""}`}
        onClick={() => !prevDisabled && handleChangePage(page - 1)}
      >
        <button
          type="button"
          className={css.pageLink}
          disabled={prevDisabled}
        >
          Prev
        </button>
      </li>

      
      {pages.map((p) => {
        const isActive = p === page;
        return (
          <li
            key={p}
            className={`${css.page} ${isActive ? css.active : ""}`}
            onClick={() => handleChangePage(p)}
          >
            <button type="button" className={css.pageLink}>
              {p}
            </button>
          </li>
        );
      })}

      <li
        className={`${css.page} ${nextDisabled ? css.disabled : ""}`}
        onClick={() => !nextDisabled && handleChangePage(page + 1)}
      >
        <button
          type="button"
          className={css.pageLink}
          disabled={nextDisabled}
        >
          Next
        </button>
      </li>
    </ul>
  );
}
