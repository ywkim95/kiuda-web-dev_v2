import P from "../../../../components/P.tsx";
import { fontWeight } from "../../../../constant/font.ts";
import { FC, HTMLAttributes } from "react";

const DownloadButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button {...props}>
      <P className={`hover:underline+${fontWeight.BOLD}`}>{children}</P>
    </button>
  );
};

export default DownloadButton;
