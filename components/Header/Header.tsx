"use client";

import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import css from "./Header.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink}>
        NoteHub
      </Link>

      <nav>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/notes" className={css.navigationLink}>
              All Notes
            </Link>
          </li>

          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
        </ul>
        <ul className={css.navigationList}>
          {/* твої існуючі лінки */}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
