import ErrorPage from "../Error";
import routeRender from "../../../util/test/render.tsx";
import { pageRoutes } from "../../../http/routes.ts";
import { mockNavigate } from "../../../setup.ts";

test("Error 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<ErrorPage />);

  const errorMessage = getByText(/오류가 발생했습니다/i);
  expect(errorMessage).toBeInTheDocument();
});

test("뒤로가기 버튼이 정상적으로 동작하는지 확인", async () => {
  const { user, getByRole } = await routeRender(<ErrorPage />);

  const backButton = getByRole("button", { name: /뒤로가기/i });
  await user.click(backButton);

  expect(mockNavigate).toHaveBeenCalledWith(-1);
});

test("홈으로 버튼이 정상적으로 동작하는지 확인", async () => {
  const { user, getByRole } = await routeRender(<ErrorPage />);

  const homeButton = getByRole("button", { name: /홈으로/i });
  await user.click(homeButton);

  expect(mockNavigate).toHaveBeenCalledWith(pageRoutes.ROOT, { replace: true });
});
