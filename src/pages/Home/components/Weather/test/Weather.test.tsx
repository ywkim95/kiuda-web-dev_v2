import WeatherContainer from "../WeatherContainer.tsx";
import routeRender from "../../../../../util/test/render.tsx";

test("Weather 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(
    <WeatherContainer emdCode="123" sigCode={"244"} sd_code={"15345"} />,
  );

  // Check if the location is rendered correctly
  const locationElement = getByText("옥천읍");
  expect(locationElement).toBeInTheDocument();

  const locationElement2 = getByText("충청북도 옥천군");
  expect(locationElement2).toBeInTheDocument();

  // Check if the temperature is rendered correctly
  const temperatureElement = getByText("24°");
  expect(temperatureElement).toBeInTheDocument();

  // Check if the humidity is rendered correctly
  const humidityElement = getByText("25%");
  expect(humidityElement).toBeInTheDocument();

  // Check if the weather type is rendered correctly
  const weatherTypeElement = getByText("구름 많음");
  expect(weatherTypeElement).toBeInTheDocument();
});
