import { beforeEach, expect } from "vitest";
import { useRouteLoaderData } from "react-router-dom";
import { renderHook } from "@testing-library/react";
import * as useFarmLoaderModule from "../useFarmLoader.tsx";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

vi.mock("react-router-dom", () => ({
  useRouteLoaderData: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../../http/http", () => ({
  getFarmDetail: vi.fn(),
}));

beforeAll(() => {
  globalThis.alert = vi.fn();
});

describe("useGetFarmId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("올바른 farmId를 반환한다.", () => {
    const farms = {
      farmList: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    vi.mocked(useRouteLoaderData).mockReturnValue({ farms });

    localStorage.setItem("farmIndex", "1");

    const { result } = renderHook(() => useFarmLoaderModule.useGetFarmId());

    expect(result.current).toBe(2);
  });

  it("farmIndex가 숫자가 아니거나, 0보다 작거나, farmList의 길이보다 크면 0을 반환한다.", () => {
    const farms = {
      farmList: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    vi.mocked(useRouteLoaderData).mockReturnValue({ farms });

    localStorage.setItem("farmIndex", "4");

    const { result } = renderHook(() => useFarmLoaderModule.useGetFarmId());

    expect(result.current).toBe(1);
    expect(globalThis.alert).toHaveBeenCalledWith(
      `잘못된 인덱스 값 입니다. 현재 인덱스 값: 4. \n 값을 초기화 하였습니다.`,
    );
    expect(localStorage.getItem("farmIndex")).toBe("0");
  });
});

describe("useFarmLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const farms = {
      farmList: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    vi.mocked(useRouteLoaderData).mockReturnValue({ farms });
  });

  it("올바른 farmId를 사용할때 farm 데이터를 반환한다.", () => {
    const farmId = 1;
    const farmData = { id: 1, name: "farm1" };

    vi.spyOn(useFarmLoaderModule, "useGetFarmId").mockReturnValue(farmId);
    vi.mocked(useQuery).mockReturnValue({
      data: farmData,
      isPending: false,
      isError: false,
      error: null,
      isLoading: false,
      isSuccess: true,
      isFetched: true,
      isFetchedAfterMount: false,
      isFetching: false,
      isLoadingError: false,
      isRefetch: false,
      isRefetchError: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn(),
      status: "success",
      fetchStatus: "idle",
      internal: {},
    } as unknown as UseQueryResult<{ id: number; name: string }, unknown>);

    const { result } = renderHook(() => useFarmLoaderModule.default());

    expect(result.current.data).toEqual(farmData);
    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ["farm", farmId],
      queryFn: expect.any(Function),
      gcTime: 1000 * 60 * 60,
    });
  });
});
