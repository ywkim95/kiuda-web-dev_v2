import { BorderRadius } from "../../../../../constant/border.ts";
import {ButtonHTMLAttributes, FC} from "react";

const ControlButton:FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
  return (
    <button
      {...props}
      className={`w(50) h(40) text(pack) hover:b(--color-border)+bg(--color-box)+r(${BorderRadius.INPUT})`}
    >
      {children}
    </button>
  );
};

export default ControlButton;
