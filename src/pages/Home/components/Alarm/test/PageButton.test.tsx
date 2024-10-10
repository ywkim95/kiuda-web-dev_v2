import PageButton from "../components/PageButton.tsx";
import routeRender from "../../../../../util/test/render.tsx";

test("PageButton 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockOnClick = vi.fn();

  const { user, getByText } = await routeRender(
    <PageButton onClick={mockOnClick}>Test Button</PageButton>,
  );

  // Check if the button is in the document
  const buttonElement = getByText("Test Button");
  expect(buttonElement).toBeInTheDocument();

  // Trigger the click event
  await user.click(buttonElement);

  // Check if onClick has been called
  expect(mockOnClick).toHaveBeenCalled();
});
