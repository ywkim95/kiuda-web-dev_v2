import routeRender from "../../../util/test/render.tsx";
import DateButtonList from "../DateButtonList.tsx";
import { beforeEach } from "vitest";
import useDateOptions from "../../../hooks/useDateOptions.tsx";

vi.mock("../../../constant/date", () => ({
  getPreviousDate: vi.fn(),
  getPreviousMonth: vi.fn(),
}));

vi.mock("../../../hooks/useDateOptions", () => ({
  default: vi.fn(),
}));

const mockedDateOptions = [
  { func: vi.fn(), text: "1일" },
  { func: vi.fn(), text: "7일" },
  { func: vi.fn(), text: "1개월" },
  { func: vi.fn(), text: "3개월" },
  { func: vi.fn(), text: "사용자 설정" },
];

const testDateButtonListProps = {
  index: 0,
  handleClick: vi.fn(),
  className: "test",
};

describe("DateButtonList", () => {
  beforeEach(() => {
    vi.mocked(useDateOptions).mockReturnValue({
      dateOptions: mockedDateOptions,
      setCustomDateFunc: vi.fn(),
    });
  });
  it("DateButtonList", async () => {
    const { getByText } = await routeRender(
      <DateButtonList {...testDateButtonListProps} />,
    );

    const button = getByText("1개월");
    expect(button).toBeInTheDocument();
  });
  it("should highlight the active DateButton", async () => {
    const { getByText } = await routeRender(
      <DateButtonList index={2} handleClick={vi.fn()} />,
    );

    const activeButton = getByText(mockedDateOptions[2].text);
    expect(activeButton).toHaveStyle("background-color: rgba(0,0,0,0)");
  });

  it("should call handleClick with the correct index when DateButton is clicked", async () => {
    const handleClick = vi.fn();
    const { user, getByText } = await routeRender(
      <DateButtonList index={0} handleClick={handleClick} />,
    );

    const button = getByText(mockedDateOptions[1].text);
    await user.click(button);

    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it("should apply additional className", async () => {
    const { container } = await routeRender(
      <DateButtonList index={0} handleClick={vi.fn()} className="test-class" />,
    );

    expect(container.firstChild).toHaveClass("test-class");
  });
});
