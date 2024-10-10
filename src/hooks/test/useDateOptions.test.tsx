import { act, renderHook } from "@testing-library/react";
import useDateOptions from "../useDateOptions.tsx";
import { getPreviousDate, getPreviousMonth } from "../../constant/date.ts";

vi.mock("../../constant/date.ts", () => ({
  getPreviousDate: vi.fn(),
  getPreviousMonth: vi.fn(),
}));

describe("useDateOptions", () => {
  it("should return default date options", () => {
    const { result } = renderHook(() => useDateOptions());

    const { dateOptions } = result.current;

    expect(dateOptions).toHaveLength(5);
    expect(dateOptions[0].text).toBe("1일");
    expect(dateOptions[1].text).toBe("7일");
    expect(dateOptions[2].text).toBe("1개월");
    expect(dateOptions[3].text).toBe("3개월");
    expect(dateOptions[4].text).toBe("사용자 설정");
  });

  it("should update customDateFunc", () => {
    const { result } = renderHook(() => useDateOptions());

    const { setCustomDateFunc } = result.current;

    act(() => {
      setCustomDateFunc({
        startDate: "2021-08-01",
        endDate: "2021-08-31",
      });
    });

    const { dateOptions } = result.current;

    expect(dateOptions[4].func()).toEqual({
      startDate: "2021-08-01",
      endDate: "2021-08-31",
    });
  });

  it("should call getPreviousDate and getPreviousMonth functions", () => {
    const { result } = renderHook(() => useDateOptions());

    const { dateOptions } = result.current;

    act(() => {
      dateOptions[0].func();
      dateOptions[1].func();
      dateOptions[2].func();
      dateOptions[3].func();
    });

    expect(getPreviousDate).toHaveBeenCalledWith(1);
    expect(getPreviousDate).toHaveBeenCalledWith(7);
    expect(getPreviousMonth).toHaveBeenCalledWith(1);
    expect(getPreviousMonth).toHaveBeenCalledWith(3);
  });
});
