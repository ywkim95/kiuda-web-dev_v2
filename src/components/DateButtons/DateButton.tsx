import { FC, ReactNode } from "react";
import { BorderRadius } from "../../constant/border.ts";

interface DateButtonProps {
  children: ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

const DateButton: FC<DateButtonProps> = ({ children, isActive, onClick }) => {
  return (
    <button
      className={`b(--color-border) box-shadow(1/1/1/0/#00000012) h(fill) r(${BorderRadius.INPUT}) bg(${isActive ? "--color-primary" : "--color-box"})`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DateButton;
