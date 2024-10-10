import { FC, HTMLAttributes } from "react";

const EachSectorButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className="opacity(0.15) hover:opacity(1)">
      {children}
    </button>
  );
};

export default EachSectorButton;
