import { NavLink } from "react-router-dom";
import { pageRoutes } from "../../../../http/routes.ts";
import UserBox from "./UserBox.tsx";
import Span from "../../../../components/Span.tsx";
import { fontSize, fontWeight } from "../../../../constant/font.ts";
import NavList from "./NavList.tsx";

const MainNavigation = () => {
  return (
    <header className="hbox h(90) space-between bg(white) px(24)">
      <NavLink to={pageRoutes.ROOT} end>
        {/* 키우다 로고 자리*/}
        <Span
          fontSize={fontSize.BIG}
          fontWeight={fontWeight.BOLD}
          className="hover:c(--color-primary)"
        >
          Kiuda Platform
        </Span>
      </NavLink>
      <NavList />
      <UserBox />
    </header>
  );
};

export default MainNavigation;
