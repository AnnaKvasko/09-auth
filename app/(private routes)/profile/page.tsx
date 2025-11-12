import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Сторінка профілю</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Редагувати профіль
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <img
            src="https://ac.goit.global/img/avatar_default.png"
            alt="Аватар користувача"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Ім’я користувача: ваше_ім’я</p>
          <p>Електронна пошта: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}
