import Modal from "../../components/Modal/Modal.tsx";
import useModalStore from "../../store/useModalStore.ts";
import ModalType from "../../components/Modal/ModalType.ts";
import { BorderRadius } from "../../constant/border.ts";
import CloseButtonIcon from "../../components/svg/CloseButtonIcon.tsx";
import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetFarmId } from "../../hooks/useFarmLoader.tsx";
import {patchCameraSchedule, patchCameraSetting, queryClient} from "../../http/http.ts";
import LoadingButton from "../Loading/LoadingButton.tsx";
import CameraSettingContainer from "./components/SettingModal/CameraSettingContainer.tsx";
import ScheduleSettingContainer from "./components/SettingModal/ScheduleSettingContainer.tsx";
import CameraSettingModel from "../../models/Image/CameraSettingModel.ts";
import ScheduleModel from "../../models/Image/ScheduleModel.ts";
import useCameraSettingStore from "../../store/useCameraSettingStore.ts";

const CameraSettingModal = () => {
  const farmId = useGetFarmId();
  const { modal, setModal } = useModalStore();
  const { setCameraIndex } = useCameraSettingStore();

  const [cameraSettings, setCameraSettings] = useState<CameraSettingModel[]>(
    [],
  );
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);

  const [isAll, setIsAll] = useState(false);

  // _id는 farmId, id는 cameraId
  const { mutateAsync: patchSetting, isPending: isSaveSetting } = useMutation({
    mutationFn: () => patchCameraSetting({ _id: farmId, cameraSettings }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["farm", farmId, "CameraSetting"]});
      setCameraSettings([]);
    },
  });

  const { mutateAsync: patchSchedule, isPending: isSaveSchedule } = useMutation(
    {
      mutationFn: () => patchCameraSchedule({ _id: farmId, schedules }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey: ["farm", farmId, "Schedules"]});
        setSchedules([]);
      },
    },
  );

  const [isEdit, setIsEdit] = useState(false);

  const handleCloseModal = () => {
    setModal(undefined);
  };

  const handleSave = async () => {
    if (isAll) {
      const a = window.confirm("전체 저장을 진행 하시겠습니까?");
      if (!a) return;
    }
    setIsEdit(false);
    try {
      if (cameraSettings.length > 0) await patchSetting();
      if (schedules.length > 0) await patchSchedule();
    } catch (e) {
      console.error(e);
    }finally {
        setCameraIndex(0)
        setModal(undefined);
    }
  };

  const handleEdit = () => {
    setIsEdit((prevOpen) => !prevOpen);
  };

  const handleSchedule = (schedule: ScheduleModel[]) => {
    setSchedules(schedule);
  };

  const handleSetting = (setting: CameraSettingModel[]) => {
    setCameraSettings(setting);
  };

  return (
    <Modal
      open={modal === ModalType.CameraSetting}
      onClose={handleCloseModal}
      className={`w(750) h(800) bg(transparent) b(none) m(auto) pack focus:b(none)+outline(none)`}
    >
      <div className={`w(629) h(700) bg(white) r(${BorderRadius.MAIN})`}>
        <div className={`w(100%) h(100%) p(61/40/40)`}>
          <div className="text-center mb(30)">
            <div className="h(31.5) mb(8.55) text(pack)">
              <P
                fontSize={fontSize.ExtraBIG}
                fontWeight={fontWeight.BOLD}
                className="user-select-none"
              >
                카메라 설정
              </P>
            </div>
            <div className="h(34) text(pack)">
              <P className="user-select-none">
                생육 모니터링을 위해 키우다 플랫폼의 카메라 환경을 설정합니다.
              </P>
            </div>
          </div>
          <div className="vbox gap(20)">
            <CameraSettingContainer
              isAll={isAll}
              setIsAll={setIsAll}
              onSetting={handleSetting}
            />
            <ScheduleSettingContainer
              onSchedule={handleSchedule}
              isEdit={isEdit}
              isAll={isAll}
            />
          </div>
          <div className="hbox justify-between mt(40)">
            <button
              className={`w(408) h(50) pack r(${BorderRadius.INPUT}) bg(--color-primary) user-select-none box-shadow(1/1/1/0/#00000012)`}
              onClick={handleSave}
            >
              {isSaveSetting || isSaveSchedule ? (
                <LoadingButton />
              ) : (
                <P color="--color-box">적용</P>
              )}
            </button>
            <button
              className={`w(115) h(50) r(${BorderRadius.INPUT}) pack b(1/--color-border) bg(--color-box) user-select-none box-shadow(1/1/1/0/#00000012)`}
              onClick={handleEdit}
            >
              <P>{isEdit ? "확인" : "스케쥴 추가"}</P>
            </button>
          </div>
        </div>
        <button
          className="fixed(~12,66)"
          onClick={handleCloseModal}
          data-testid="close-button"
        >
          <CloseButtonIcon />
        </button>
      </div>
    </Modal>
  );
};

export default CameraSettingModal;
