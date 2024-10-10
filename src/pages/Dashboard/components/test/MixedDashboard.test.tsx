import MixedDashboard from "../../pages/Sector/components/Mixed/MixedDashboard.tsx";
import routeRender from "../../../../util/test/render.tsx";
import useSensorValueStore from "../../../../store/useSensorValueStore.ts";
import useFarmStore from "../../../../store/useFarmStore.ts";
import { dateOptions } from "../../../../constant/date.ts";
import { vi } from "vitest";

vi.mock("../../../../store/useSensorValueStore", () => ({
  default: vi.fn(),
}));

vi.mock("../../../../store/useFarmStore", () => ({
  default: vi.fn(),
}));

describe("MixedDashboard component tests", () => {
  vi.mocked(useSensorValueStore).mockReturnValue({
    sensor_id: 1,
    show: true,
    valueList: [
      {
        input_time: "2024-04-23T08:00:00",
        value: 20,
      },
    ],
  });

  vi.mocked(useFarmStore).mockReturnValue({
    farm: {
      farm_sectorList: [
        {
          sensorList: [{ sensor_spec: { name: "Sensor1" } }],
        },
      ],
    },
  });
  test("MixedDashboard 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { findByText } = await routeRender(<MixedDashboard />);

    const titleElement = await findByText("2024-04-23(화) 오전 8:00");
    expect(titleElement).toBeInTheDocument();
  });

  test("MixedDashboard 컴포넌트의 드롭다운이 정상적으로 작동하는지 확인", async () => {
    const { user, getByText } = await routeRender(<MixedDashboard />);

    const dropdownElement = getByText("7일");
    await user.click(dropdownElement);

    const dropdownOption = getByText("1일");
    await user.click(dropdownOption);

    expect(dropdownElement.textContent).toBe(dateOptions[0].text);
  });

  test("MixedDashboard 컴포넌트의 이전 버튼이 정상적으로 작동하는지 확인", async () => {
    const consoleSpy = vi.spyOn(console, "log");

    const { user, getByTestId } = await routeRender(<MixedDashboard />);

    const prevButton = getByTestId("prev-button");

    await user.click(prevButton);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Number));
    consoleSpy.mockRestore();
  });

  test("MixedDashboard 컴포넌트의 다음 버튼이 정상적으로 작동하는지 확인", async () => {
    const consoleSpy = vi.spyOn(console, "log");

    const { user, getByTestId } = await routeRender(<MixedDashboard />);

    const nextButton = getByTestId("next-button");

    await user.click(nextButton);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Number));
    consoleSpy.mockRestore();
  });
});
