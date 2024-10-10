import { FC, HTMLAttributes } from "react";
interface CameraTabButtonProps extends HTMLAttributes<HTMLButtonElement> {
  width?: number;
}
const CameraTabButton: FC<CameraTabButtonProps> = ({
  children,
  className,
  width = 73,
  ...props
}) => {
  return (
    <button
      className={`border-box text(pack) pointer w(${width}) h(48) ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CameraTabButton;
