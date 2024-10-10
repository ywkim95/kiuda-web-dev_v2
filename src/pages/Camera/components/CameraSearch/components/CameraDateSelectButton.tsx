import { BorderRadius } from "../../../../../constant/border.ts";
import P from "../../../../../components/P.tsx";
import { fontWeight } from "../../../../../constant/font.ts";
import { FC, HTMLAttributes } from "react";

const CameraDateSelectButton: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      className={`r(${BorderRadius.INPUT}) bg(--color-primary) pack pointer h(50) w(150)`}
      {...props}
    >
      <P fontWeight={fontWeight.BOLD} color="--color-box">
        {children}
      </P>
    </div>
  );
};

export default CameraDateSelectButton;
