import useFarmStore from "../../../../../store/useFarmStore.ts";
import useModalStore from "../../../../../store/useModalStore.ts";
import AlarmContainer from "../AlarmContainer.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";

vi.mock("../../../../../store/useFarmStore");
vi.mock("../../../../../store/useModalStore");

test("AlarmList 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockSetModal = vi.fn();

  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  vi.mocked(useModalStore).mockReturnValue({
    setModal: mockSetModal,
  });

  const { user, getByText } = await routeRender(<AlarmContainer />);

  // Assuming '자세히 보기' is a text that is rendered by the AlarmList component
  const alarmListElement = getByText("자세히 보기");
  expect(alarmListElement).toBeInTheDocument();

  // Trigger the click event
  await user.click(alarmListElement);

  // Check if setModal has been called
  expect(mockSetModal).toHaveBeenCalled();
});
