import useFarmStore from "../../../../store/useFarmStore.ts";
import EachSettingContainer from "../../pages/Setting/components/Each/EachSettingContainer.tsx";
import dummyFarmData from "../../../../dummys/DummyFarmData.ts";
import routeRender from "../../../../util/test/render.tsx";
import useScrollBar from "../../../../hooks/useScrollBar.tsx";

// Mock the hooks
vi.mock("../../../../store/useFarmStore");
vi.mock("../../../../hooks/useScrollHook.tsx");

const mockFarmData = dummyFarmData;

const mockScrollHook = {
  handleScrollbarDrag: vi.fn(),
  scrollbarRef: { current: null as HTMLDivElement | null },
  contentRef: { current: null as HTMLDivElement | null },
  containerRef: { current: null as HTMLDivElement | null },
};

describe("EachSetting component tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useFarmStore).mockReturnValue({
      farm: mockFarmData,
    });
    vi.mocked(useScrollBar).mockReturnValue(mockScrollHook);
  });

  test("EachSetting 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { getByText, getAllByText } = await routeRender(
      <EachSettingContainer />,
    );

    // "센서 알람 범위"라는 제목이 있는지 확인
    const title = getByText("센서 알람 범위");
    expect(title).toBeInTheDocument();

    // "전체 선택" 버튼이 있는지 확인
    const allSelectButton = getByText("전체 선택");
    expect(allSelectButton).toBeInTheDocument();

    // 구역명이 제대로 렌더링되는지 확인
    const sectorNames = getAllByText(/구역명/i);
    expect(sectorNames).toHaveLength(mockFarmData.farm_sectors.length);
    for (const sectorName of sectorNames) {
      expect(sectorName).toBeInTheDocument();
    }
  });

  test("전체 선택 버튼 클릭 시 동작 확인", async () => {
    const { user, getByText, getAllByText } = await routeRender(
      <EachSettingContainer />,
    );

    const allSelectButton = getByText("전체 선택");
    await user.click(allSelectButton);

    // 모든 섹터가 선택되었는지 확인
    const selectedSectors = getAllByText("✓");
    expect(selectedSectors).toHaveLength(mockFarmData.farm_sectors.length + 1);
  });

  test("구역명을 클릭하여 선택할 수 있는지 확인", async () => {
    const { user, getByText } = await routeRender(<EachSettingContainer />);

    const sectorName = getByText("1-1");
    await user.click(sectorName);

    // 섹터가 선택되었는지 확인
    expect(getByText("✓")).toBeInTheDocument();
  });

  test("리스트 확장 버튼 클릭 시 동작 확인", async () => {
    const { user, getByTestId, getByText } = await routeRender(
      <EachSettingContainer />,
    );

    const expandButton = getByTestId("expand-button-0");
    await user.click(expandButton);

    // 리스트가 확장되었는지 확인
    expect(getByText("토양온도")).toBeInTheDocument();
  });

  test("Scrollbar drag 이벤트 확인", async () => {
    const { user, getByTestId } = await routeRender(<EachSettingContainer />);

    const scrollbar = getByTestId("scrollbar");

    mockScrollHook.scrollbarRef.current = scrollbar as HTMLDivElement;

    expect(scrollbar).toHaveClass(/absolute/i);

    const expandButton = getByTestId("expand-button-0");
    await user.click(expandButton);

    expect(scrollbar).toHaveClass("pointer", { exact: false });

    const mouseDownEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      clientY: 100,
    });

    scrollbar.dispatchEvent(mouseDownEvent);

    // handleScrollbarDrag가 호출되었는지 확인
    expect(mockScrollHook.handleScrollbarDrag).toHaveBeenCalledWith(
      expect.any(Object),
    );

    // 또는 nativeEvent를 검증하여 MouseEvent가 전달되었음을 확인
    expect(mockScrollHook.handleScrollbarDrag).toHaveBeenCalled();
    expect(
      mockScrollHook.handleScrollbarDrag.mock.calls[0][0].nativeEvent,
    ).toBeInstanceOf(MouseEvent);
  });
});
