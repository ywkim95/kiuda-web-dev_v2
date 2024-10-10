import Alarm from "../components/Alarm.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import { SensorAlarmModel } from "../../../../../models/Farm/FarmModel.ts";
import useFarmStore from "../../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";
vi.mock("../../../../../store/useFarmStore");
test("Alarm 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });
  const data: SensorAlarmModel = {
    level: 1,
    time: "2022-01-01",
    id: 1,
    value: 100,
  };

  const { getByText } = await routeRender(<Alarm data={data} />);

  // Assuming '구역 1-1의 센서가 100 입니다.' is a text that is rendered by the Alarm component
  const alarmElement = getByText(/구역 1-1의 토양온도가 100℃ 입니다/i);
  expect(alarmElement).toBeInTheDocument();
});
