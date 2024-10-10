import UserBox from "../Navigation/UserBox.tsx";
import routeRender from "../../../../util/test/render.tsx";
import { pageRoutes } from "../../../../http/routes.ts";
import { mockNavigate } from "../../../../setup.ts";

describe("UserBox component tests", () => {
  test("renders UserBox with expected content", async () => {
    const { getByText } = await routeRender(<UserBox />);

    const expectedElement = getByText(/포도연구소/i);
    expect(expectedElement).toBeInTheDocument();
  });

  test("navigates to login page on logout button click", async () => {
    const { user, getByText } = await routeRender(<UserBox />);

    await user.click(getByText(/로그아웃/i));
    expect(mockNavigate).toHaveBeenCalledWith(pageRoutes.LOGIN);
  });
});
