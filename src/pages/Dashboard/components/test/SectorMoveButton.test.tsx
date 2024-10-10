import SectorMoveButton from "../SectorMoveButton.tsx";
import routeRender from "../../../../util/test/render.tsx";

describe("SectorMoveButton component tests", () => {
  test("SectorMoveButton 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { getByText } = await routeRender(
      <SectorMoveButton>Test Button</SectorMoveButton>,
    );

    const buttonElement = getByText("Test Button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("SectorMoveButton 컴포넌트의 onClick 이벤트가 정상적으로 작동하는지 확인", async () => {
    const handleClick = vi.fn();

    const { user, getByText } = await routeRender(
      <SectorMoveButton onClick={handleClick}>Test Button</SectorMoveButton>,
    );

    const buttonElement = await getByText("Test Button");
    await user.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
  });

  test("SectorMoveButton 컴포넌트의 onClick 이벤트가 isOver가 false일 때 작동하지 않는지 확인", async () => {
    const handleClick = vi.fn();

    const { user, getByText } = await routeRender(
      <SectorMoveButton onClick={handleClick}>Test Button</SectorMoveButton>,
    );

    const buttonElement = getByText("Test Button");
    await user.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
  });
});
