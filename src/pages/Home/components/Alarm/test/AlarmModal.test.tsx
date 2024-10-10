import useModalStore from "../../../../../store/useModalStore.ts";
import ModalType from "../../../../../components/Modal/ModalType.ts";
import useFarmStore from "../../../../../store/useFarmStore.ts";
import AlarmModal from "../components/AlarmModal.tsx";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";
import routeRender from "../../../../../util/test/render.tsx";
import ReactDOM from "react-dom";

vi.mock("../../../../../store/useModalStore");
vi.mock("../../../../../store/useFarmStore");

describe("AlarmModal component tests", () => {
  beforeAll(() => {
    // Mock showModal and close methods on HTMLDialogElement
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    // Mock ReactDOM.createPortal to render the modal in a specific container
    const originalCreatePortal = ReactDOM.createPortal;

    vi.spyOn(ReactDOM, "createPortal").mockImplementation(
      (element, container) => {
        if (!container || !(container instanceof HTMLElement)) {
          const containerElement = document.createElement("div");
          document.body.appendChild(containerElement);
          return originalCreatePortal(element, containerElement);
        }
        return originalCreatePortal(element, container);
      },
    );

    // Create a container element for the modal
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal";
    document.body.appendChild(modalContainer);
  });

  test("AlarmModal 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const mockSetModal = vi.fn();

    vi.mocked(useModalStore).mockReturnValue({
      modal: ModalType.Alarm,
      setModal: mockSetModal,
    });

    vi.mocked(useFarmStore).mockReturnValue({
      farm: dummyFarmData,
    });

    const { user, getByText, getByTestId } = await routeRender(<AlarmModal />);

    // Assuming '알람 정보 현황' is a text that is rendered by the AlarmModal component
    const alarmModalElement = getByText("알람 정보 현황");
    expect(alarmModalElement).toBeInTheDocument();
    const closeButton = getByTestId("close-button");
    // Trigger the click event
    await user.click(closeButton);

    // Check if setModal has been called
    expect(mockSetModal).toHaveBeenCalled();
  });
});
