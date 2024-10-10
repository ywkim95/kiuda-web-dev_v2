import GlobalPage from "../pages/Global/Global.tsx";
import routeRender from "../../../util/test/render.tsx";

describe("Global Page tests", async () => {
  test("IntegratedPage 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { getByText } = await routeRender(<GlobalPage />);

    const indoorSensorElement = getByText(/대기 센서/i);
    expect(indoorSensorElement).toBeInTheDocument();

    const soilSensorElement = getByText(/토양 센서/i);
    expect(soilSensorElement).toBeInTheDocument();
  });

  test("IntegratedPage 컴포넌트가 센서 값들을 정상적으로 렌더링하는지 확인", async () => {
    const { getAllByRole } = await routeRender(<GlobalPage />);

    const sensorValueElements = getAllByRole("figure");
    expect(sensorValueElements.length).toBeGreaterThan(0);
  });

  test("IntegratedPage 컴포넌트가 그래프 섹션을 정상적으로 렌더링하는지 확인", async () => {
    const { getByTestId } = await routeRender(<GlobalPage />);

    const graphSectionElement = getByTestId("graph-section");
    expect(graphSectionElement).toBeInTheDocument();
  });
});
