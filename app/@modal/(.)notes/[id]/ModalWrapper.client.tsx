"use client";

import { useEffect } from "react";
import css from "./Modal.module.css";

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose?: () => void; // 🔹 зробили необов'язковим
};

export default function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  useEffect(() => {
    if (!onClose) return; // якщо не передали — нічого не слухаємо

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleBackdropClick = () => {
    onClose?.();
  };

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
