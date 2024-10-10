import { describe, it, expect, vi, beforeEach } from "vitest";
import CustomDateComponent from "./CustomDateComponent";
import DatePicker from "podo-datepicker-component";
import routeRender from "../util/test/render.tsx";

// DatePicker 모킹
vi.mock("podo-datepicker-component", () => ({
  __esModule: true,
  default: vi.fn(({ isOpen, setIsOpen, returnStareDate, returnEndDate }) => (
    <div>
      <button onClick={() => setIsOpen(false)}>Close</button>
      <button onClick={() => returnStareDate(new Date())}>
        Set Start Date
      </button>
      <button onClick={() => returnEndDate(new Date())}>Set End Date</button>
      {isOpen && <div>Open</div>}
    </div>
  )),
}));

describe("CustomDateComponent", () => {
  const setIsOpen = vi.fn();
  const setStartDate = vi.fn();
  const setEndDate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render DatePicker with correct props", async () => {
    await routeRender(
      <CustomDateComponent
        isOpen={true}
        setIsOpen={setIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    expect(DatePicker).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        setIsOpen,
        returnStareDate: setStartDate,
        returnEndDate: setEndDate,
      }),
      {},
    );
  });

  it("should handle isOpen state change", async () => {
    const { rerender } = await routeRender(
      <CustomDateComponent
        isOpen={true}
        setIsOpen={setIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    rerender(
      <CustomDateComponent
        isOpen={false}
        setIsOpen={setIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    expect(DatePicker).toHaveBeenCalledWith(
      expect.objectContaining({ isOpen: false }),
      {},
    );
  });

  it("should call setIsOpen when close button is clicked", async () => {
    const { user, getByText } = await routeRender(
      <CustomDateComponent
        isOpen={true}
        setIsOpen={setIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    const closeButton = getByText("Close");
    await user.click(closeButton);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("should call setStartDate when Set Start Date button is clicked", async () => {
    const { user, getByText } = await routeRender(
      <CustomDateComponent
        isOpen={true}
        setIsOpen={setIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    const setStartDateButton = getByText("Set Start Date");
    await user.click(setStartDateButton);

    expect(setStartDate).toHaveBeenCalledWith(expect.any(Date));
  });

  it("should call setEndDate when Set End Date button is clicked", async () => {
    const { user, getByText } = await routeRender(
      <CustomDateComponent
        isOpen={true}
        setIsOpen={setIsOpen}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />,
    );

    const setEndDateButton = getByText("Set End Date");
    await user.click(setEndDateButton);

    expect(setEndDate).toHaveBeenCalledWith(expect.any(Date));
  });
});
