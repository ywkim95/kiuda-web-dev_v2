import { FC, HTMLAttributes } from "react";

const Layout: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default Layout;
