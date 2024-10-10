import { fontSize, fontWeight } from "../constant/font.ts";
import { FC, HTMLAttributes } from "react";

interface pProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}

const P: FC<pProps> = ({
  className,
  children,
  fontSize: fs = fontSize.MEDIUM,
  fontWeight: fw = fontWeight.NORMAL,
  color,
  ...props
}) => {
  return (
    <p
      {...props}
      className={`font(${fs}) ${fw} ${color ? `c(${color})` : "c(--color-text)"} ${className ?? ""}`}
    >
      {children}
    </p>
  );
};

export default P;
