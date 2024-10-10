import SectorContainer from "../SectorContainer.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import { beforeEach, expect } from "vitest";
import { act } from "@testing-library/react";
import dummySensorValue from "../../../../../dummys/DummySensorValue.ts";
import useSensorValueStore from "../../../../../store/useSensorValueStore.ts";
import useFarmStore from "../../../../../store/useFarmStore.ts";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";

vi.mock("../../../../../store/useSensorValueStore");
vi.mock("../../../../../store/useFarmStore");

describe("", () => {
  beforeEach(() => {
    vi.mocked(useSensorValueStore).mockReturnValue({
      setSensorValues: vi.fn(),
      sensorValues: dummySensorValue,
    });
    vi.mocked(useFarmStore).mockReturnValue({
      farm: dummyFarmData,
    });
  });
  test("Sector 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { queryByLabelText, getByText } = await routeRender(
      <SectorContainer />,
    );

    // Assuming SectorDetail and SectorWhole components render some text that can be used to identify them
    const sectorDetailElement = queryByLabelText(/LeftCarrotArrowIcon/);
    const sectorWholeElement = getByText(/구역 개요/);
    console.log(sectorWholeElement);

    // Initially, detail is undefined so SectorWhole should be in the document
    expect(sectorWholeElement).toBeInTheDocument();
    expect(sectorDetailElement).not.toBeInTheDocument();
  });

  test("Sector 컴포넌트의 setDetail 함수가 정상적으로 작동하는지 확인", async () => {
    const { user, queryByLabelText, getByText } = await routeRender(
      <SectorContainer />,
    );

    const detail = getByText("1-1");

    await act(async () => {
      await user.click(detail);
    });

    const sectorDetailElement = getByText(/구역 1-1/);
    const sectorWholeElement = queryByLabelText(/구역 개요/);

    expect(sectorDetailElement).toBeInTheDocument();
    expect(sectorWholeElement).not.toBeInTheDocument();
  });

  test("Sector 컴포넌트에서 Detail 컴포넌트에서 Whole 컴포넌트로 넘어가는지 확인", async () => {
    const { user, getByText, getAllByRole } = await routeRender(
      <SectorContainer />,
    );

    const detail = getByText("1-1");

    await act(async () => {
      await user.click(detail);
    });

    const sectorDetailElement = getByText(/구역 1-1/);
    expect(sectorDetailElement).toBeInTheDocument();

    const backButton = getAllByRole("button")[0];
    await act(async () => {
      await user.click(backButton);
    });
    const sectorWholeElement = getByText(/구역 개요/);
    expect(sectorWholeElement).toBeInTheDocument();
  });
});
