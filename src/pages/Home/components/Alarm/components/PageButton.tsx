import { BorderRadius } from "../../../../../constant/border.ts";
import {ButtonHTMLAttributes, FC} from "react";

interface PageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isSelected?: boolean;
}

const PageButton:FC<PageButtonProps> = ({isSelected, children, ...props}) => {
  return (
    <button
      {...props}
      className={`w(40) h(40) text(pack) ${isSelected ? `b(--color-border) bg(--color-box) r(${BorderRadius.INPUT})` : ""} hover:b(--color-border)+bg(--color-box)+r(${BorderRadius.INPUT})`}
    >
      {children}
    </button>
  );
};

export default PageButton;
