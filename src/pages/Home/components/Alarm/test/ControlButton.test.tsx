import routeRender from "../../../../../util/test/render.tsx";
import ControlButton from "../components/ControlButton.tsx";

test("ControlButton 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockOnClick = vi.fn();

  const { user, getByText } = await routeRender(
    <ControlButton onClick={mockOnClick}>Test Button</ControlButton>,
  );

  // Check if the button is in the document
  const buttonElement = getByText("Test Button");
  expect(buttonElement).toBeInTheDocument();

  // Trigger the click event
  await user.click(buttonElement);

  // Check if onClick has been called
  expect(mockOnClick).toHaveBeenCalled();
});
