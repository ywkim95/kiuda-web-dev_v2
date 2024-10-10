import SectorSelectModal from "../../pages/Sector/components/Graph/SectorSelectModal.tsx";
import useFarmStore from "../../../../store/useFarmStore.ts";
import useSensorValueStore from "../../../../store/useSensorValueStore.ts";
import useModalStore from "../../../../store/useModalStore.ts";
import SensorTimeSeriesModel from "../../../../models/SensorTimeSeriesValueModel.ts";
import routeRender from "../../../../util/test/render.tsx";
import ModalType from "../../../../components/Modal/ModalType.ts";
import dummyTimeSeries from "../../../../dummys/DummyTimeSeries.ts";
import dummyFarmData from "../../../../dummys/DummyFarmData.ts";

import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("SectorSelectModal component tests", () => {
  // Mock the hooks
  vi.mock("../../../../store/useFarmStore.ts", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../../../store/useSensorValueStore.ts", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../../../store/useModalStore.ts", () => ({
    default: vi.fn(),
  }));

  beforeEach(() => {
    const mockTimeSeries: SensorTimeSeriesModel[] = dummyTimeSeries;

    vi.mocked(useFarmStore).mockReturnValue({
      farm: dummyFarmData,
    });

    vi.mocked(useSensorValueStore).mockReturnValue({
      timeSeries: [...mockTimeSeries],
      setTimeSeries: vi.fn(),
    });

    vi.mocked(useModalStore).mockReturnValue({
      modal: ModalType.SectorSetting,
      setModal: vi.fn(),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("SectorSelectModal 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { getByText } = await routeRender(<SectorSelectModal />);

    const modalElement = getByText("구역 선택");
    expect(modalElement).toBeInTheDocument();
  });

  test("SectorSelectModal 컴포넌트의 onClick 이벤트가 정상적으로 작동하는지 확인", async () => {
    const user = userEvent.setup();
    await routeRender(<SectorSelectModal />);

    expect(screen.getByText("구역 선택")).toBeInTheDocument();

    const applyButton = screen.getByText("적용");
    await user.click(applyButton);

    expect(useSensorValueStore().setTimeSeries).toHaveBeenCalledWith(
      dummyTimeSeries,
    );
  });
});
