import Forecast from "../components/Forecast.tsx";
import routeRender from "../../../../../util/test/render.tsx";

test("Forecast 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(
    <Forecast time="2022-12-01T13:00:00Z" type="맑음" temp={"24"} />,
  );

  // Check if the time is converted and rendered correctly
  const timeElement = getByText("오후 1시");
  expect(timeElement).toBeInTheDocument();

  // Check if the weather type is rendered correctly
  const weatherTypeElement = getByText("24°");
  expect(weatherTypeElement).toBeInTheDocument();

  // Check if the temperature is rendered correctly
  const temperatureElement = getByText("24°");
  expect(temperatureElement).toBeInTheDocument();
});
