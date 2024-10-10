import { act } from "@testing-library/react";
import NameSector from "../../pages/Setting/components/All/NameSector.tsx";
import { FarmSectorModel } from "../../../../models/Farm/FarmModel.ts";
import dummyFarmData from "../../../../dummys/DummyFarmData.ts";
import routeRender from "../../../../util/test/render.tsx";
import { describe } from "vitest";

describe("SettingNameSector component tests", () => {
  test("SettingNameSector 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const mockFarmSector: FarmSectorModel = dummyFarmData.farm_sectors[0];

    const { getByRole } = await routeRender(
      <NameSector farmSector={mockFarmSector} />,
    );

    // Check if the input is rendered correctly
    const inputElement = getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("SettingNameSector 컴포넌트의 onChange 이벤트가 정상적으로 작동하는지 확인", async () => {
    const mockFarmSector: FarmSectorModel = dummyFarmData.farm_sectors[0];

    const { user, getByRole } = await routeRender(
      <NameSector farmSector={mockFarmSector} />,
    );

    // Simulate a change event
    const inputElement = getByRole("textbox") as HTMLInputElement;
    await act(async () => {
      await user.type(inputElement, "New Value");
    });

    // Check if the input value has changed
    expect(inputElement.value).toBe("1-1New");
  });
});
