import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";

interface NavigationLinkProps {
  to: string;
  isEnd?: boolean;
  children: ReactNode;
}

const NavigationLink: FC<NavigationLinkProps> = ({ to, isEnd, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "c(--color-primary)"
          : "c(--color-text) hover:c(--color-primary)"
      }
      end={isEnd}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
