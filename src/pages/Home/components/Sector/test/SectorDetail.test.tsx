import SectorDetail from "../components/SectorDetail.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import { beforeEach } from "vitest";
import useSensorValueStore from "../../../../../store/useSensorValueStore.ts";
import dummySensorValue from "../../../../../dummys/DummySensorValue.ts";
import useFarmStore from "../../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";

vi.mock("../../../../../store/useSensorValueStore");
vi.mock("../../../../../store/useFarmStore");
describe("SectorDetail component test", () => {
  beforeEach(() => {
    vi.mocked(useSensorValueStore).mockReturnValue({
      setSensorValues: vi.fn(),
      sensorValues: dummySensorValue,
    });
    vi.mocked(useFarmStore).mockReturnValue({
      farm: dummyFarmData,
    });
  });
  test("SectorDetail 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const detail = 1;
    const setDetail = vi.fn();

    const { getByText } = await routeRender(
      <SectorDetail detail={detail} setDetail={setDetail} />,
    );

    // Assuming sector with id 1 has alias 'Test Sector'
    const sectorElement = getByText("구역 1-1");
    expect(sectorElement).toBeInTheDocument();
  });

  test("setDetail 함수가 정상적으로 작동하는지 확인", async () => {
    const detail = 1;
    const setDetail = vi.fn();

    const { user, getAllByRole } = await routeRender(
      <SectorDetail detail={detail} setDetail={setDetail} />,
    );

    // Assuming BackButtonIcon renders 'Back' text
    const backButton = getAllByRole("button")[0];
    await user.click(backButton);

    expect(setDetail).toHaveBeenCalledWith(undefined);
  });
});
