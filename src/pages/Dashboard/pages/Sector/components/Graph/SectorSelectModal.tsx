import Modal from "../../../../../../components/Modal/Modal.tsx";
import useModalStore from "../../../../../../store/useModalStore.ts";
import ModalType from "../../../../../../components/Modal/ModalType.ts";
import { BorderRadius } from "../../../../../../constant/border.ts";
import CloseButtonIcon from "../../../../../../components/svg/CloseButtonIcon.tsx";
import P from "../../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../../constant/font.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetFarmId } from "../../../../../../hooks/useFarmLoader.tsx";
import { queryClient } from "../../../../../../http/http.ts";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import useShowSectorStore from "../../../../../../store/useShowSectorStore.ts";
import SectorCheckbox from "./SectorCheckBox.tsx";

const SectorSelectModal = () => {
  const farmId = useGetFarmId();

  const farm = queryClient.getQueryData<FarmModel>(["farm", farmId]);

  const { modal, setModal } = useModalStore();
  const { list, setList } = useShowSectorStore();
  const [showList, setShowList] =
    useState<{ id: number; show: boolean }[]>(list);

  useEffect(() => {
    setShowList(list);
  }, [list]);

  const handleCloseModal = useCallback(() => {
    setModal(undefined);
  }, [setModal]);

  const handleSectorShow = useCallback(
    (model?: { id: number; show: boolean }) => {
      if (!model) {
        return;
      }

      setShowList((prevList) =>
        prevList.map((value) =>
          value.id === model.id ? { ...value, show: !value.show } : value,
        ),
      );
    },
    [],
  );

  const handleSaveSector = useCallback(() => {
    setList(showList);
    handleCloseModal();
  }, [handleCloseModal, setList, showList]);

  const sectors = useMemo(() => {
    if (!farm) {
      return null;
    }
    const sectorElements = [];
    for (let row = 0; row < farm.sectorRow; row++) {
      for (let col = 0; col < farm.sectorCol; col++) {
        const item = farm.sectors.find(
          (item) => item.row === row && item.col === col,
        );

        if (!item) {
          sectorElements.push(<div key={`${row}-${col}`}></div>);
        } else {
          const model = showList.find((value) => value.id === item.id);
          // console.log(model);
          sectorElements.push(
            <SectorCheckbox
              item={item}
              model={model}
              handleSectorShow={handleSectorShow}
              key={`${row}-${col}`}
            />,
          );
        }
      }
    }
    return sectorElements;
  }, [farm, handleSectorShow, showList]);

  if (!farm) {
    return null;
  }

  return (
    <Modal
      open={modal === ModalType.SectorSetting}
      onClose={handleCloseModal}
      className={`w(100%) h(100%) b(none) m(auto) bg(transparent) focus:b(none)+outline(none) pack`}
    >
      <div className={`bg(transparent) relative`}>
        <div
          className={`bg(white) r(${BorderRadius.MAIN}) h(100%) w(100%) box-shadow(4/12/30/0/#00000017) p(40)`}
        >
          <P
            fontSize={fontSize.ExtraBIG}
            fontWeight={fontWeight.BOLD}
            className="text(center) mt(20) mb(12)"
          >
            구역 선택
          </P>
          <P className="text(center)">
            그래프형 대시보드에 표출하는 구역을 선택합니다.
          </P>
          <div className={`grid(${farm.sectorRow}) gap(12) my(40)`}>
            {sectors}
          </div>
          <button
            onClick={handleSaveSector}
            className={`w(100%) h(50) bg(--color-primary) r(${BorderRadius.INPUT})`}
          >
            <P color="white">적용</P>
          </button>
        </div>
        <button className="absolute(~-50,16)" onClick={handleCloseModal}>
          <CloseButtonIcon />
        </button>
      </div>
    </Modal>
  );
};

export default SectorSelectModal;
