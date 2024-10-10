import { FC, HTMLAttributes } from "react";

interface ScrollDivProps extends HTMLAttributes<HTMLDivElement> {
  enableScrollPadding?: boolean;
}

const ScrollDiv: FC<ScrollDivProps> = ({
  enableScrollPadding = false,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`scroll-y -webkit-scrollbar::w(8) -webkit-scrollbar-track::bg(--color-scrollbar) -webkit-scrollbar-thumb::b(2/--color-scrollbar)+r(10)+bg(--color-scrollbar-thumb) ${enableScrollPadding ? "-webkit-scrollbar-button::vertical:end:increment:block+w(10)+bg(--color-scrollbar)" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollDiv;
