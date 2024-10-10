import { BorderRadius } from "../../constant/border.ts";
import { ButtonHTMLAttributes, FC } from "react";

const NavigateButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`bg(--color-second-background) px(20) py(10) r(${BorderRadius.INPUT}) hover:bg(--color-seperated)`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NavigateButton;
