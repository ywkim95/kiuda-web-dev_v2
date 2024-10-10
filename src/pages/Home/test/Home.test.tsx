import ModalType from "../../../components/Modal/ModalType.ts";
import HomePage from "../Home.tsx";
import useModalStore from "../../../store/useModalStore.ts";
import useFarmStore from "../../../store/useFarmStore.ts";
import useSensorValueStore from "../../../store/useSensorValueStore.ts";
import dummyFarmData from "../../../dummys/DummyFarmData.ts";
import dummySensorValue from "../../../dummys/DummySensorValue.ts";
import routeRender from "../../../util/test/render.tsx";

vi.mock("../../../store/useModalStore");
vi.mock("../../../store/useFarmStore");
vi.mock("../../../store/useSensorValueStore");

test("HomePage 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockSetSensorValues = vi.fn();
  const mockSetModal = vi.fn();
  vi.mocked(useFarmStore).mockReturnValue({
    farm: dummyFarmData,
  });

  vi.mocked(useSensorValueStore).mockReturnValue({
    sensorValues: dummySensorValue,
    setSensorValues: mockSetSensorValues,
  });

  vi.mocked(useModalStore).mockReturnValue({
    modal: ModalType.Alarm,
    setModal: mockSetModal,
  });

  const { getByText, getAllByText } = await routeRender(<HomePage />);

  const dateElement = getAllByText(/04-23/i)[0];
  expect(dateElement).toBeInTheDocument();

  const cameraNameElement = getByText("카메라 01", { exact: false });
  expect(cameraNameElement).toBeInTheDocument();

  const weatherElement = getByText("24°", { exact: false });
  expect(weatherElement).toBeInTheDocument();

  const SectorNameElement = getByText("구역 개요", { exact: false });
  expect(SectorNameElement).toBeInTheDocument();

  const IntegrateNameElement = getByText("대기정보", { exact: false });
  expect(IntegrateNameElement).toBeInTheDocument();
});
