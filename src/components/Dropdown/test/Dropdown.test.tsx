import Dropdown from "../Dropdown.tsx";
import routeRender from "../../../util/test/render.tsx";

test("Dropdown 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockOnSelectItem = vi.fn();

  const { user, getByText } = await routeRender(
    <Dropdown
      title="Test Dropdown"
      list={["Item 1", "Item 2"]}
      onSelectItem={mockOnSelectItem}
    />,
  );

  // Check if the dropdown is in the document
  const dropdownElement = getByText("Test Dropdown");
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

  // Check if onSelectItem has been called with the right argument
  expect(mockOnSelectItem).toHaveBeenCalledWith(0);
});
