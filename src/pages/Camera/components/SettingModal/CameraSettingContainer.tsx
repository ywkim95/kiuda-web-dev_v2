import { useQuery } from "@tanstack/react-query";
import { getCameraSetting } from "../../../../http/http.ts";
import ModalType from "../../../../components/Modal/ModalType.ts";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
import CameraSelector from "./CameraSelector.tsx";
import useModalStore from "../../../../store/useModalStore.ts";
import { Dispatch, FC, SetStateAction } from "react";
import CameraSettingModel from "../../../../models/Image/CameraSettingModel.ts";

interface CameraSettingContainerProps {
  isAll: boolean;
  setIsAll: Dispatch<SetStateAction<boolean>>;
  onSetting: (setting: CameraSettingModel[]) => void;
}

const CameraSettingContainer: FC<CameraSettingContainerProps> = ({
  isAll,
  setIsAll,
  onSetting,
}) => {
  const farmId = useGetFarmId();
  const { modal } = useModalStore();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["farm", farmId, "CameraSetting"],
    queryFn: ({ signal }) => getCameraSetting({ _id: farmId, signal }),
    retry: 1,
    enabled: modal === ModalType.CameraSetting,
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => a.id - b.id),
  });

  let content;

  if (isPending) {
    content = (
      <div className="h(100%) w(100%) pack">
        <LoadingButton />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="w(100%) h(fill) pack">
        <h1>{error?.code}</h1>
        <p>{error?.message}</p>
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <CameraSelector
          onSetting={onSetting}
          isAll={isAll}
          setIsAll={setIsAll}
          cameraSettings={data}
        />
      </>
    );
  }

  return <>{content}</>;
};

export default CameraSettingContainer;
