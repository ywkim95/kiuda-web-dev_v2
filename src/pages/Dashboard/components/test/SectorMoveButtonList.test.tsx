import SectorMoveButtonList from "../SectorMoveButtonList.tsx";
import useFarmStore from "../../../../store/useFarmStore.ts";
import routeRender from "../../../../util/test/render.tsx";

describe("SectorMoveButtonList component tests", () => {
  // Mock the useFarmStore hook
  vi.mock("../../../../store/useFarmStore.ts");

  test("SectorMoveButtonList 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    vi.mocked(useFarmStore).mockReturnValue({
      farm: {
        sector_row: 3,
        sector_col: 4,
      },
    });

    const { findAllByRole } = await routeRender(<SectorMoveButtonList />);

    const buttonElements = await findAllByRole("button");
    expect(buttonElements.length).toBe(4);
  });

  test("SectorMoveButtonList 컴포넌트의 onClick 이벤트가 정상적으로 작동하는지 확인", async () => {
    vi.mocked(useFarmStore).mockReturnValue({
      farm: {
        sector_row: 10,
        sector_col: 10,
      },
    });

    const consoleSpy = vi.spyOn(console, "log");

    const { user, findAllByRole } = await routeRender(<SectorMoveButtonList />);

    const buttonElements = await findAllByRole("button");
    for (const buttonElement of buttonElements) {
      await user.click(buttonElement);
    }

    expect(consoleSpy).toHaveBeenCalledTimes(4);
    expect(consoleSpy).toHaveBeenCalledWith(`You Clicked 1`);
    expect(consoleSpy).toHaveBeenCalledWith(`You Clicked 2`);
    expect(consoleSpy).toHaveBeenCalledWith(`You Clicked 3`);
    expect(consoleSpy).toHaveBeenCalledWith(`You Clicked 4`);

    consoleSpy.mockRestore();
  });
  test("SectorMoveButtonList 컴포넌트의 버튼이 비활성화되었는지 확인", async () => {
    vi.mocked(useFarmStore).mockReturnValue({
      farm: {
        sector_row: 1,
        sector_col: 1,
      },
    });

    const { findAllByRole } = await routeRender(<SectorMoveButtonList />);

    const buttonElements = await findAllByRole("button");
    for (const buttonElement of buttonElements) {
      expect(buttonElement).toBeDisabled();
    }
  });
});
