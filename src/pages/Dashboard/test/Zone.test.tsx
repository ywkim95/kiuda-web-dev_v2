import { act } from "@testing-library/react";
import routeRender from "../../../util/test/render.tsx";
import SectorPage from "../pages/Sector/Sector.tsx";

test("ZonePage 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<SectorPage />);

  const zoneElement = getByText(/수치형 대시보드/i);
  expect(zoneElement).toBeInTheDocument();
});

test("ZonePage 컴포넌트의 버튼 클릭으로 대시보드가 변경되는지 확인", async () => {
  const { user, findByText, getAllByRole } = await routeRender(<SectorPage />);

  const buttonElement = getAllByRole("button")[2];
  await act(async () => {
    await user.click(buttonElement);
  });

  const zoneElement = await findByText(/혼합형 대시보드/i);
  expect(zoneElement).toBeInTheDocument();
});

test("ZonePage 컴포넌트의 다른 버튼 클릭으로 대시보드가 변경되는지 확인", async () => {
  const { user, findByText, getAllByRole } = await routeRender(<SectorPage />);

  const buttonElement = getAllByRole("button")[3];
  await act(async () => {
    await user.click(buttonElement);
  });

  const zoneElement = await findByText(/그래프형 대시보드/i);
  expect(zoneElement).toBeInTheDocument();
});
