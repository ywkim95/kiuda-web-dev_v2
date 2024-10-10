import { fontSize, fontWeight } from "../constant/font.ts";
import { FC, HTMLAttributes } from "react";

interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
}

const Span: FC<SpanProps> = ({
  className,
  children,
  fontSize: fs,
  fontWeight: fw,
  color,
  ...props
}) => {
  return (
    <span
      {...props}
      className={`font(${fs ?? fontSize.MEDIUM}) ${fw ?? fontWeight.NORMAL} ${className ?? ""} ${color ? `c(${color})` : `c(--color-text)`}`}
    >
      {children}
    </span>
  );
};

export default Span;
