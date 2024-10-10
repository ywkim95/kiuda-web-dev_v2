import { describe, it, expect, vi } from "vitest";
import ButtonsComponent from "./ButtonsComponent";
import useDateOptions from "../hooks/useDateOptions.tsx";
import routeRender from "../util/test/render.tsx";

vi.mock("../hooks/useDateOptions", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockDateOptions = [
  { func: vi.fn(), text: "1일" },
  { func: vi.fn(), text: "7일" },
  { func: vi.fn(), text: "1개월" },
  { func: vi.fn(), text: "3개월" },
  { func: vi.fn(), text: "사용자 설정" },
];

describe("ButtonsComponent", () => {
  beforeEach(() => {
    vi.mocked(useDateOptions).mockReturnValue({
      dateOptions: mockDateOptions,
      setCustomDateFunc: vi.fn(),
    });
  });

  it("should render DateButtonList component", async () => {
    const { getByText } = await routeRender(
      <ButtonsComponent index={0} handleClick={vi.fn()} />,
    );

    mockDateOptions.forEach((option) => {
      expect(getByText(option.text)).toBeInTheDocument();
    });
  });

  it("should call handleClick with the correct index when DateButton is clicked", async () => {
    const handleClick = vi.fn();
    const { user, getByText } = await routeRender(
      <ButtonsComponent index={0} handleClick={handleClick} />,
    );

    const button = getByText(mockDateOptions[1].text);
    await user.click(button);

    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it("should apply the default className", async () => {
    const { container } = await routeRender(
      <ButtonsComponent index={0} handleClick={vi.fn()} />,
    );

    expect(container.firstChild).toHaveClass("pt(100)");
    expect(container.firstChild).toHaveClass("w(fill)");
  });

  it("should apply a custom className", async () => {
    const customClassName = "custom-class";
    const { container } = await routeRender(
      <ButtonsComponent
        index={0}
        handleClick={vi.fn()}
        className={customClassName}
      />,
    );

    expect(container.firstChild).toHaveClass(customClassName);
  });
});
