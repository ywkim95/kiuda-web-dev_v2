import useFarmStore from "../../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";
import AlarmTable from "../components/AlarmTable.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import dummyAlarmsData from "../../../../../dummys/DummySearchAlarmsData.ts";

vi.mock("../../../../../store/useFarmStore");

test("AlarmTable 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockSetPage = vi.fn();

  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  const { user, getByText } = await routeRender(
    <AlarmTable page={0} setPage={mockSetPage} alarm={dummyAlarmsData} />,
  );

  const alarmTableElement = getByText("알람 유형");
  expect(alarmTableElement).toBeInTheDocument();

  await user.click(getByText("다음"));

  expect(mockSetPage).toHaveBeenCalled();

  await user.click(getByText("이전"));

  expect(mockSetPage).toHaveBeenCalled();
});

// TODO: API가 완성되면 추가 테스트 필요
