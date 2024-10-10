import AllSetting from "../../pages/Setting/components/All/AllSetting.tsx";
import useFarmStore from "../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../dummys/DummyFarmData.ts";
import routeRender from "../../../../util/test/render.tsx";

// Mock the useFarmStore hook
vi.mock("../../../../store/useFarmStore.ts", () => ({
  default: vi.fn(),
}));

test("SettingWhole 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  const { getByText } = await routeRender(<AllSetting />);

  // Check if the headers are rendered correctly
  const sensorAlarmRangeHeader = getByText("센서 알람 범위");
  expect(sensorAlarmRangeHeader).toBeInTheDocument();

  const sectorNameHeader = getByText("구역 이름");
  expect(sectorNameHeader).toBeInTheDocument();

  const sectorEntranceHeader = getByText("구역 입구");
  expect(sectorEntranceHeader).toBeInTheDocument();
});
