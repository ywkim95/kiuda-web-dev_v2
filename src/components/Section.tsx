import { BorderRadius } from "../constant/border.ts";
import { FC, HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  height?: string;
}

const Section: FC<SectionProps> = ({
  children,
  className,
  height,
  ...props
}) => {
  return (
    <section
      {...props}
      className={`r(${BorderRadius.MAIN}) h(${height ?? "56"}) w(100%) box-shadow(4/12/30/0/#00000017) ${className ?? ""}`}
    >
      {children}
    </section>
  );
};

export default Section;
