import { FC, HTMLAttributes } from "react";

const Li: FC<HTMLAttributes<HTMLLIElement>> = ({
  id,
  className,
  children,
  ...props
}) => {
  return (
    <li
      id={id}
      className={`relative h(100%) text(pack) ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default Li;
