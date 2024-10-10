import routeRender from "../../../util/test/render.tsx";
import NotFoundPage from "../NotFound.tsx";
import { pageRoutes } from "../../../http/routes.ts";
import { mockNavigate } from "../../../setup.ts";

test("NotFound 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<NotFoundPage />);

  const element = getByText(/Error Code 404/i);
  expect(element).toBeInTheDocument();
});

test("홈으로 버튼이 정상적으로 동작하는지 확인", async () => {
  const { user, getByRole } = await routeRender(<NotFoundPage />);

  const homeButton = getByRole("button", { name: /홈으로/i });
  await user.click(homeButton);

  expect(mockNavigate).toHaveBeenCalledWith(pageRoutes.ROOT, { replace: true });
});
