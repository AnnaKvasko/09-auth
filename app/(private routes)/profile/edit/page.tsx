"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMe, updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setUsername(me.username);
        setEmail(me.email);
        setAvatar(me.avatar);
      } catch (e: any) {
        setError(
          e?.response?.data?.message ?? "Не вдалося завантажити профіль"
        );
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      await updateMe({ username });
      router.replace("/profile");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Не вдалося оновити профіль");
    }
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Редагувати профіль</h1>

        {!!avatar && (
          <Image
            src={avatar}
            alt="Аватар користувача"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={onSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Ім&apos;я користувача:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
            />
          </div>

          <p>Електронна адреса: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Зберегти
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Скасувати
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
