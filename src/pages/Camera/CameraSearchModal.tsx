import Modal from "../../components/Modal/Modal.tsx";
import useModalStore from "../../store/useModalStore.ts";
import ModalType from "../../components/Modal/ModalType.ts";
import { BorderRadius } from "../../constant/border.ts";
import CloseButtonIcon from "../../components/svg/CloseButtonIcon.tsx";
import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
import CameraSearchContainer from "./components/CameraSearch/CameraSearchContainer.tsx";

const CameraSearchModal = () => {
  const { modal, setModal } = useModalStore();

  const handleCloseModal = () => {
    setModal(undefined);
  };

  return (
    <Modal
      open={modal === ModalType.CameraSearch}
      onClose={handleCloseModal}
      className={`w(1400) h(904) bg(transparent) b(none) m(auto) pack focus:b(none)+outline(none)`}
    >
      <div
        className={`w(1261) h(100%) vbox(center) bg(white) r(${BorderRadius.MAIN}) px(90) pt(90) pb(40)`}
      >
        <div className="mb(40) vbox(center) gap(15)">
          <P fontSize={fontSize.ExtraBIG} fontWeight={fontWeight.BOLD}>
            카메라 / 일시 선택
          </P>
          <P>키우다 플랫폼에 표시되는 카메라 종류와 날짜 범위를 선택합니다.</P>
        </div>
        <CameraSearchContainer />

        <button
          className="fixed(~20,16)"
          onClick={handleCloseModal}
          data-testid="close-button"
        >
          <CloseButtonIcon />
        </button>
      </div>
    </Modal>
  );
};

export default CameraSearchModal;
