import { DialogHTMLAttributes, FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * 필요 모달
 * 1. 알람 검색
 * 2. 카메라 설정
 * 3. 이미지 리스트
 * 4. 구역 선택
 */
const Modal: FC<DialogHTMLAttributes<HTMLDialogElement>> = ({
  children,
  open,
  onClose,
  className = "",
  ...props
}) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal?.showModal();
    } else {
      modal?.close();
    }
    return () => {
      if (open) {
        modal?.close();
      }
    };
  }, [open]);

  return open
    ? createPortal(
        <dialog
          role="dialog"
          data-testid="dialog"
          ref={dialog}
          {...props}
          onClose={onClose}
          className={`modal ${className}`}
        >
          {children}
        </dialog>,
        document.getElementById("modal")!,
      )
    : null;
};

export default Modal;
