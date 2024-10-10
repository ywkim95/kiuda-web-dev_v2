import { useGetFarmId } from "../useFarmLoader.tsx";
import { queryClient } from "../../http/http.ts";
import { renderHook, waitFor } from "@testing-library/react";
import useFarmData from "../useFarmData.tsx";
import { QueryCache } from "@tanstack/react-query";

vi.mock("../../http/http", () => ({
  queryClient: {
    getQueryData: vi.fn(),
    getQueryCache: vi.fn(() => ({
      subscribe: vi.fn(),
    })),
  },
}));

vi.mock("../useFarmLoader", () => ({
  useGetFarmId: vi.fn(),
}));

describe("useFarmData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return farm data from the queryClient", () => {
    const farmId = 1;
    const farmData = { id: "1", name: "Test Farm" };

    vi.mocked(useGetFarmId).mockReturnValue(farmId);
    vi.mocked(queryClient.getQueryData).mockReturnValue(farmData);
    vi.mocked(queryClient.getQueryCache).mockReturnValue({
      subscribe: vi.fn((callback) => {
        const queryMock = {
          queryKey: ["farm", farmId],
          state: {},
          meta: {},
          options: {},
          queryHash: "mock-query-hash",
        };
        callback({ query: queryMock, type: "updated" });
        return () => {}; // `unsubscribe` 함수 반환
      }),
      // 최소한의 필수 속성 추가
      find: vi.fn(),
      findAll: vi.fn(),
      notify: vi.fn(),
      clear: vi.fn(),
      getAll: vi.fn(),
    } as unknown as QueryCache);

    const { result } = renderHook(() => useFarmData());

    expect(result.current).toEqual(farmData);
    expect(queryClient.getQueryData).toHaveBeenCalledWith(["farm", farmId]);
  });

  it("should update farm data when queryCache is updated", async () => {
    const farmId = 1;
    const initialFarmData = { id: "1", name: "Initial Farm" };
    const updatedFarmData = { id: "1", name: "Updated Farm" };

    vi.mocked(useGetFarmId).mockReturnValue(farmId);
    vi.mocked(queryClient.getQueryData)
      .mockReturnValueOnce(initialFarmData)
      .mockReturnValueOnce(updatedFarmData);

    const unsubscribeMock = vi.fn();
    const subscribeMock = vi.fn((callback) => {
      const queryMock = {
        queryKey: ["farm", farmId],
        state: {},
        meta: {},
        options: {},
        queryHash: "mock-query-hash",
      };
      setTimeout(() => {
        callback({ query: queryMock, type: "updated" });
      }, 100); // Simulate an update event after 100ms
      return unsubscribeMock; // `unsubscribe` 함수 반환
    });

    vi.mocked(queryClient.getQueryCache().subscribe).mockImplementation(
      subscribeMock,
    );

    const { result } = renderHook(() => useFarmData());

    expect(result.current).toEqual(initialFarmData);
    expect(queryClient.getQueryData).toHaveBeenCalledWith(["farm", farmId]);

    await waitFor(() => {
      expect(result.current).toEqual(updatedFarmData);
      expect(queryClient.getQueryData).toHaveBeenCalledWith(["farm", farmId]);
    });
  });
});
