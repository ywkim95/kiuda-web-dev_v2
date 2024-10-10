import MainNavigation from "../Navigation/MainNavigation.tsx";
import routeRender from "../../../../util/test/render.tsx";

describe("MainNavigation component tests", () => {
  test("메인 네비게이션이 정상적으로 렌더링되는지 확인", async () => {
    const { getByRole } = await routeRender(<MainNavigation />);

    const linkElement = getByRole("link", { name: /Kiuda Platform/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("NavList 컴포넌트가 렌더링되는지 확인", async () => {
    const { getByTestId } = await routeRender(<MainNavigation />);

    const navListElement = getByTestId("nav-list");
    expect(navListElement).toBeInTheDocument();
  });

  test("UserBox 컴포넌트가 렌더링되는지 확인", async () => {
    const { getByTestId } = await routeRender(<MainNavigation />);

    const userBoxElement = getByTestId("user-box");
    expect(userBoxElement).toBeInTheDocument();
  });
});
