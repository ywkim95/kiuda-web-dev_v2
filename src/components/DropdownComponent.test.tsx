// DropdownComponent.test.tsx
import { describe, it, expect, vi } from "vitest";
import DropdownComponent from "./DropdownComponent";
import routeRender from "../util/test/render.tsx";

vi.mock("./Dropdown/Dropdown", () => ({
  __esModule: true,
  default: vi.fn(
    ({
      title,
      list,
      onSelectItem,
    }: {
      title: string;
      list: string[];
      onSelectItem: (i: number) => void;
    }) => (
      <div>
        <button>{title}</button>
        <ul>
          {list.map((item, index) => (
            <li key={item} onClick={() => onSelectItem(index)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  ),
}));

describe("DropdownComponent", () => {
  it("should render Dropdown with correct props", async () => {
    const title = "Select an option";
    const list = ["Option 1", "Option 2", "Option 3"];
    const onSelectItem = vi.fn();

    const { getByText } = await routeRender(
      <DropdownComponent
        title={title}
        list={list}
        onSelectItem={onSelectItem}
      />,
    );

    expect(getByText(title)).toBeInTheDocument();
    list.forEach((item) => {
      expect(getByText(item)).toBeInTheDocument();
    });
  });

  it("should call onSelectItem with the correct index when an item is clicked", async () => {
    const title = "Select an option";
    const list = ["Option 1", "Option 2", "Option 3"];
    const onSelectItem = vi.fn();

    const { user, getByText } = await routeRender(
      <DropdownComponent
        title={title}
        list={list}
        onSelectItem={onSelectItem}
      />,
    );

    const item = getByText("Option 2");
    await user.click(item);

    expect(onSelectItem).toHaveBeenCalledWith(1);
  });
});
