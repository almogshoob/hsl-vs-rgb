import { useEffect, useRef } from "react";
import "./Modal.css";

export function Modal({ open, onClose, className, children }) {
  const ref = useRef();

  const handleBackdropClick = (e) => {
    if (e.target.tagName === "DIALOG") onClose();
  };

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  return (
    <dialog
      className={`TModal ${className || ""}`}
      ref={ref}
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
}
