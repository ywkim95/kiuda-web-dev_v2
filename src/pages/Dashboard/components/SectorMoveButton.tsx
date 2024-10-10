import { ButtonHTMLAttributes, FC } from "react";

const SectorMoveButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>;
};

export default SectorMoveButton;
