import Li from "./Li.tsx";
import NavigationLink from "./NavigationLink.tsx";
import { pageRoutes } from "../../../../http/routes.ts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavList = () => {
  const [dashboard, setDashboard] = useState<boolean>(false);
  const location = useLocation();

  const isDashboard = [
    pageRoutes.DASHBOARD,
    pageRoutes.INTEGRATED,
    pageRoutes.SETTING,
  ].includes(location.pathname);

  const handleClickOutSide = (event: MouseEvent) => {
    if (!(event.target as Element).closest("#sensor-dashboard")) {
      setDashboard(false);
    }
  };

  const handleMouseEnter = () => setDashboard(true);
  const handleMouseLeave = () => setDashboard(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <nav className="h(100%) w(fill) text(pack) pl(150)" data-testid="nav-list">
      <ul className="hbox gap(70) font(18) 700 h(100%)">
        <Li>
          <NavigationLink to={pageRoutes.ROOT} isEnd>
            메인
          </NavigationLink>
        </Li>
        <Li>
          <NavigationLink to={pageRoutes.CAMERA}>카메라 갤러리</NavigationLink>
        </Li>
        <Li className="hover:>div:visible" id="sensor-dashboard">
          <p
            className={`${isDashboard ? "c(--color-primary)" : "c(--color-text)"} hover:c(--color-primary) pointer`}
            onClick={() => setDashboard(!dashboard)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            센서 대시보드
          </p>
          <div
            className={`absolute(-70,80) ${!dashboard ? "hidden" : "visible"} hover:visible bg(--color-second-background) h(50) w(240) r(50) hbox gap(20) text(pack) font(14) z(100)`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationLink to={pageRoutes.DASHBOARD} isEnd>
              구역별 센서
            </NavigationLink>
            <NavigationLink to={pageRoutes.INTEGRATED}>
              통합 센서
            </NavigationLink>
            <NavigationLink to={pageRoutes.SETTING}>설정</NavigationLink>
          </div>
        </Li>
        {/*<Li>*/}
        {/*  <NavigationLink to={pageRoutes.MONITORING}>*/}
        {/*    생육 모니터링*/}
        {/*  </NavigationLink>*/}
        {/*</Li>*/}
      </ul>
    </nav>
  );
};

export default NavList;
