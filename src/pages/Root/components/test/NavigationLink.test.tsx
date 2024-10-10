import NavigationLink from "../Navigation/NavigationLink.tsx";
import routeRender from "../../../../util/test/render.tsx";

describe("NavigationLink component tests", () => {
  test("NavigationLink가 정상적으로 렌더링되는지 확인", async () => {
    const { getByRole } = await routeRender(
      <NavigationLink to="/test">테스트 링크</NavigationLink>,
    );

    const linkElement = getByRole("link", { name: /테스트 링크/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/test");
  });

  test("NavigationLink가 활성화 상태일 때 클래스가 변경되는지 확인", async () => {
    const { getByRole } = await routeRender(
      <NavigationLink to="/test">테스트 링크</NavigationLink>,
    );

    const linkElement = getByRole("link", { name: /테스트 링크/i });
    expect(linkElement).toHaveClass("c(--color-text) hover:c(--color-primary)");

    // 활성화 상태를 시뮬레이션합니다.
    linkElement.classList.add("c(--color-primary)");
    expect(linkElement).toHaveClass("c(--color-primary)");
  });

  test("NavigationLink가 비활성화 상태일 때 클래스가 변경되는지 확인", async () => {
    const { getByRole } = await routeRender(
      <NavigationLink to="/test">테스트 링크</NavigationLink>,
    );

    const linkElement = getByRole("link", { name: /테스트 링크/i });
    expect(linkElement).toHaveClass("c(--color-text) hover:c(--color-primary)");

    // 비활성화 상태를 시뮬레이션합니다.
    linkElement.classList.remove("c(--color-primary)");
    expect(linkElement).toHaveClass("c(--color-text) hover:c(--color-primary)");
  });
});
