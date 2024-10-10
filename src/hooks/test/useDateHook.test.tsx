import { act, renderHook } from "@testing-library/react";
import useDateHook from "../useDateHook.tsx";
import useDateOptions from "../useDateOptions.tsx";
import { expect } from "vitest";

vi.mock("../../constant/date", () => ({
  getFormattedDate: vi
    .fn()
    .mockImplementation((date: Date) => date.toISOString().split("T")[0]),
}));

const setGraphIndexMock = vi.fn();
vi.mock("../../store/useIndexStore", () => ({
  default: () => ({
    setGraphIndex: setGraphIndexMock,
  }),
}));

vi.mock("../useDateOptions", () => ({
  default: () => ({
    dateOptions: [
      { func: () => "2021-09-01", text: "1일" },
      { func: () => "2021-08-25", text: "7일" },
      {
        func: () => ({ start: "2021-08-01", end: "2021-09-01" }),
        text: "1개월",
      },
      {
        func: () => ({ start: "2021-06-01", end: "2021-09-01" }),
        text: "3개월",
      },
      { func: () => ({ start: "", end: "" }), text: "사용자 설정" },
    ],
    setCustomDateFunc: vi.fn(),
  }),
}));

describe("useDateHook", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // 각 테스트 전에 모든 모킹을 초기화
  });
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useDateHook());
    const {
      selectedOption,
      isSearch,
      searchTerm,
      start,
      end,
      showCustomDate,
    } = result.current;
    expect(selectedOption.text).toBe("1개월");
    expect(isSearch).toBe(true);
    expect(searchTerm).toEqual({
      start: "2021-08-01",
      end: "2021-09-01",
    });
    expect(start).toBe(null);
    expect(end).toBe(null);
    expect(showCustomDate).toBe(false);
  });

  it("should update selected option and show custom date component", () => {
    const { result } = renderHook(() => useDateHook());
    const { result: dateResult } = renderHook(() => useDateOptions());
    act(() => {
      result.current.setSelectedOption(dateResult.current.dateOptions[4]);
    });

    expect(result.current.selectedOption.text).toBe("사용자 설정");
    expect(result.current.selectedOption.func()).toEqual({
      start: "",
      end: "",
    });
  });

  it("should set custom date and update search term", () => {
    const { result } = renderHook(() => useDateHook());

    act(() => {
      result.current.setStartDate(new Date("2021-08-01"));
      result.current.setEndDate(new Date("2021-09-01"));
    });

    expect(result.current.start).toEqual(new Date("2021-08-01"));
    expect(result.current.end).toEqual(new Date("2021-09-01"));
    expect(result.current.searchTerm).toEqual({
      start: "2021-08-01",
      end: "2021-09-01",
    });
    expect(result.current.isSearch).toBe(true);
  });

  it("should call setGraphIndex when handleSelectItem is invoked", () => {
    const { result } = renderHook(() => useDateHook());

    act(() => {
      result.current.handleSelectItem(1);
    });

    expect(result.current.selectedOption.text).toBe("7일");
    expect(setGraphIndexMock).toHaveBeenCalledWith(0);
  });
});
