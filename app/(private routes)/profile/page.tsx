// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";

// import { getMe } from "@/lib/api/serverApi";
// import css from "./ProfilePage.module.css";

// export const metadata: Metadata = {
//   title: "Profile — NoteHub",
//   description: "View and manage your NoteHub profile.",
// };

// export default async function ProfilePage() {
//   const user = await getMe();

//   const avatarSrc =
//     user.avatar || "https://ac.goit.global/img/avatar_default.png";

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <div className={css.header}>
//           <h1 className={css.formTitle}>Сторінка профілю</h1>
//           <Link href="/profile/edit" className={css.editProfileButton}>
//             Редагувати профіль
//           </Link>
//         </div>

//         <div className={css.avatarWrapper}>
//           <Image
//             src={avatarSrc}
//             alt="Аватар користувача"
//             width={120}
//             height={120}
//             className={css.avatar}
//           />
//         </div>

//         <div className={css.profileInfo}>
//           <p>Ім’я користувача: {user.username}</p>
//           <p>Електронна пошта: {user.email}</p>
//         </div>
//       </div>
//     </main>
//   );
// }
// app/(private routes)/profile/page.tsx
// app/(private routes)/profile/page.tsx
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { safeGetMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

export const metadata = {
  title: "Профіль — NoteHub",
  description: "Сторінка профілю користувача",
};

export default async function ProfilePage() {
  const user = await safeGetMe();

  if (!user) {
    // якщо бекенд повернув 401 → safeGetMe дає null → відправляємо на логін
    redirect("/sign-in");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Сторінка профілю</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Редагувати профіль
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "https://ac.goit.global/img/avatar_default.png"}
            alt="Аватар користувача"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Ім’я користувача: {user.username}</p>
          <p>Електронна пошта: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
