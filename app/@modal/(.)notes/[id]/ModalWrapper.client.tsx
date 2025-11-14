"use client";

import { useEffect } from "react";
import css from "./Modal.module.css";

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
