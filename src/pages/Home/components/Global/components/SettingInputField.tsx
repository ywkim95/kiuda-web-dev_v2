import { FC, InputHTMLAttributes } from "react";
import { BorderRadius } from "../../../../../constant/border.ts";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  height: string;
  width: string;
}
const SettingInputField: FC<InputProps> = ({ height, width, ...props }) => {
  return (
    <input
      {...props}
      className={`w(${width}) h(${height}) b(--color-second-background) c(--color-text) r(${BorderRadius.INPUT}) box-shadow(1/1/1/0/#00000012) text(pack) focus:b(--color-primary)+outline(none)+bw(1) ${props.className ?? ""}`}
    />
  );
};

export default SettingInputField;
