import MultiDropdown from "../MultiDropdown.tsx";
import routeRender from "../../../util/test/render.tsx";

test("MultiDropdown 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockOnOptionSelect = vi.fn();

  const { user, getByText } = await routeRender(
    <MultiDropdown
      title="Test MultiDropdown"
      list={[
        { value: "Item 1", checked: false },
        { value: "Item 2", checked: false },
      ]}
      onOptionSelect={mockOnOptionSelect}
    />,
  );

  // Check if the dropdown is in the document
  const dropdownElement = getByText("Test MultiDropdown");
  expect(dropdownElement).toBeInTheDocument();

  // Trigger the click event on the dropdown
  await user.click(dropdownElement);

  // Check if the dropdown items are in the document
  const item1 = getByText("Item 1");
  const item2 = getByText("Item 2");
  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();

  // Trigger the click event on the first item
  await user.click(item1);
  await user.click(item2);

  // Check if onOptionSelect has been called with the right argument
  expect(mockOnOptionSelect).toHaveBeenCalledWith("Item 1");
  expect(mockOnOptionSelect).toHaveBeenCalledWith("Item 2");
});
