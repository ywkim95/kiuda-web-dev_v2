import useFarmStore from "../../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";
import routeRender from "../../../../../util/test/render.tsx";
import FarmSectorList from "../components/FarmSectorList.tsx";
import { FarmSectorType } from "../../../../../util/SectorUtils.ts";

vi.mock("../../../../../store/useFarmStore.ts", () => ({
  __esModule: true,
  default: vi.fn(),
}));
test("FarmSectorList 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  const { getAllByText } = await routeRender(
    <FarmSectorList sectorType={FarmSectorType.Main} />,
  );

  const sectorElements = getAllByText(/1-1|1-3|1-4|2-1|2-2|2-4|3-1|3-2|3-3/);
  expect(sectorElements.length).toBe(9);
});
