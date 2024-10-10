import Span from "../../../../../components/Span.tsx";
import ModalType from "../../../../../components/Modal/ModalType.ts";
import useModalStore from "../../../../../store/useModalStore.ts";

const CameraButtons = ({
  handleScroll,
  name,
}: {
  handleScroll: (isLeft: boolean) => void;
  name: string;
}) => {
  const { setModal } = useModalStore();

  const handleOpenModal = () => setModal(ModalType.CameraSetting);

  return (
    <>
      <div className="hbox gap(24)">
        <button onClick={() => handleScroll(true)} data-testid="LeftButton">
          <img
            src="/assets/icons/Left.png"
            alt="Left"
            className="w(10) h(16)"
          />
        </button>
        <div data-testid="camera-name" className="w(80)">
          <Span fontWeight={700}>{name}</Span>
        </div>
        <button onClick={() => handleScroll(false)} data-testid="RightButton">
          <img
            src="/assets/icons/Right.png"
            alt="Right"
            className="w(10) h(16)"
          />
        </button>
      </div>
      <button className="absolute x(~12) y(12)" onClick={handleOpenModal}>
        <img
          src="/assets/icons/Setting.png"
          alt="Setting"
          className="w(20) h(22)"
        />
      </button>
    </>
  );
};

export default CameraButtons;
