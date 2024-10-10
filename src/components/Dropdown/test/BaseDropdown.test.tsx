import BaseDropdown from "../BaseDropdown.tsx";
import routeRender from "../../../util/test/render.tsx";

test("BaseDropdown 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockSetExpand = vi.fn();

  const { user, getByText } = await routeRender(
    <BaseDropdown
      title="Test Dropdown"
      expand={false}
      setExpand={mockSetExpand}
    >
      Test Content
    </BaseDropdown>,
  );

  // Check if the dropdown is in the document
  const dropdownElement = getByText("Test Dropdown");
  expect(dropdownElement).toBeInTheDocument();

  // Trigger the click event
  await user.click(dropdownElement);

  // Check if setExpand has been called
  expect(mockSetExpand).toHaveBeenCalled();
});
