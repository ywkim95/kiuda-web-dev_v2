import LoginPage from "../Login";
import routeRender from "../../../util/test/render.tsx";
import { mockNavigate } from "../../../setup.ts";
import { pageRoutes } from "../../../http/routes.ts";
import { waitFor } from "@testing-library/react";

describe("Login page tests", () => {
  test("renders login page with correct elements", async () => {
    const { getByText, getByLabelText } = await routeRender(<LoginPage />);

    expect(getByText("키우다 플랫폼")).toBeInTheDocument();
    expect(getByLabelText("아이디")).toBeInTheDocument();
    expect(getByLabelText("비밀번호")).toBeInTheDocument();
    expect(getByText("회원가입")).toBeInTheDocument();
    expect(getByText("로그인")).toBeInTheDocument();
  });

  test("navigates to root page on login button click when inputs are filled", async () => {
    const { user, getByTestId, getByText } = await routeRender(<LoginPage />);
    const id = getByTestId("id-input") as HTMLInputElement;
    const password = getByTestId("password-input") as HTMLInputElement;
    const loginBtn = getByText("로그인");

    await user.type(id, "test");
    await user.type(password, "test");
    await user.click(loginBtn);

    expect(mockNavigate).toHaveBeenNthCalledWith(1, pageRoutes.ROOT);
  });

  test("show messages when email or password input is empty", async () => {
    const { getByRole, getByTestId } = await routeRender(<LoginPage />);
    const id = getByTestId("id-input") as HTMLInputElement;
    const password = getByTestId("password-input") as HTMLInputElement;
    const loginBtn = getByRole("button", { name: /로그인/i });
    expect(loginBtn).toBeInTheDocument();

    await waitFor(() => {
      expect(id).toBeInvalid();
      expect(password).toBeInvalid();
    });

    expect(id.validationMessage).toBe("Constraints not satisfied");
    expect(password.validationMessage).toBe("Constraints not satisfied");
  });
  test("자동로그인을 클릭했을때 정상적으로 변경되는가", async () => {
    const { user, getByLabelText } = await routeRender(<LoginPage />);
    const autoLogin = getByLabelText("자동 로그인") as HTMLInputElement;

    await user.click(autoLogin);

    expect(autoLogin.value).toBeTruthy();
  });
});
