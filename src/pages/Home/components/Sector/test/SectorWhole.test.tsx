import SectorBoard from "../components/SectorBoard.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import useSensorValueStore from "../../../../../store/useSensorValueStore.ts";
import dummySensorValue from "../../../../../dummys/DummySensorValue.ts";
import useFarmStore from "../../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";

vi.mock("../../../../../store/useSensorValueStore");
vi.mock("../../../../../store/useFarmStore");

test("SectorWhole 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const setDetail = vi.fn();

  vi.mocked(useSensorValueStore).mockReturnValue({
    setSensorValues: vi.fn(),
    sensorValues: dummySensorValue,
  });
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  const { getByText } = await routeRender(
    <SectorBoard setDetail={setDetail} />,
  );

  // Assuming '구역 개요' is a text that is rendered by the SectorWhole component
  const sectorWholeElement = getByText("구역 개요");
  expect(sectorWholeElement).toBeInTheDocument();
});

test("setDetail 함수가 정상적으로 작동하는지 확인", async () => {
  const setDetail = vi.fn();

  vi.mocked(useSensorValueStore).mockReturnValue({
    setSensorValues: vi.fn(),
    sensorValues: dummySensorValue,
  });
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  const { user, getByText } = await routeRender(
    <SectorBoard setDetail={setDetail} />,
  );

  // Assuming FarmSectorList renders a FarmSector with text '1-1'
  const sectorElement = getByText("1-1");

  // Trigger the click event
  await user.click(sectorElement);

  // Check if setDetail has been called
  expect(setDetail).toHaveBeenCalled();
});
