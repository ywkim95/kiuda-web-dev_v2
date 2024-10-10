import EntranceLines from "../components/EntranceLines.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";
import useFarmStore from "../../../../../store/useFarmStore.ts";

vi.mock("../../../../../store/useFarmStore.ts");

test("EntranceList 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });
  const { getAllByTestId } = await routeRender(
    <EntranceLines
      left="top(0) left(0) py(43) w(40) h(100%) vbox"
      top="top(0) px(40) w(100%) h(43) hbox"
      right="top(0) right(0) py(43) w(40) h(100%) vbox"
      bottom="bottom(0) px(40) w(100%) h(43) hbox"
      iconSize="32"
    />,
  );

  // Entrance 컴포넌트가 정확한 수로 렌더링되는지 확인
  const entranceElements = getAllByTestId("entrance-div", { exact: false });
  expect(entranceElements.length).toBe(4);
});
