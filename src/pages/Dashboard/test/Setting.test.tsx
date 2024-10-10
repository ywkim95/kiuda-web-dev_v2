import routeRender from "../../../util/test/render.tsx";
import SettingPage from "../pages/Setting/Setting.tsx";

test("SettingPage 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<SettingPage />);

  const settingElement = getByText(/전체 설정/i);
  expect(settingElement).toBeInTheDocument();
});

test("SettingPage 컴포넌트의 전체 설정과 개별 설정이 정상적으로 전환되는지 확인", async () => {
  const { user, getByText } = await routeRender(<SettingPage />);

  const allSettingElement = getByText(/전체 설정/i);
  const eachSettingElement = getByText(/개별 설정/i);

  await user.click(eachSettingElement);
  expect(allSettingElement).toHaveStyle({ color: "--color-nonActive" });
  expect(eachSettingElement).toHaveStyle({ color: "--color-primary" });

  await user.click(allSettingElement);
  expect(allSettingElement).toHaveStyle({ color: "--color-primary" });
  expect(eachSettingElement).toHaveStyle({ color: "--color-nonActive" });
});
