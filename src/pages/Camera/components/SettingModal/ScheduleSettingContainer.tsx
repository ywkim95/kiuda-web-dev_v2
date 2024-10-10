import Schedules from "./Schedules.tsx";
import { FC } from "react";
import ScheduleModel from "../../../../models/Image/ScheduleModel.ts";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";
import useModalStore from "../../../../store/useModalStore.ts";
import { useQuery } from "@tanstack/react-query";
import {getCameraSchedule, queryClient} from "../../../../http/http.ts";
import ModalType from "../../../../components/Modal/ModalType.ts";
import ErrorComponent from "../../../Error/ErrorComponent.tsx";
import FarmModel from "../../../../models/Farm/FarmModel.ts";

interface ScheduleSettingContainerProps {
  isEdit: boolean;
  isAll: boolean;
  onSchedule: (schedule: ScheduleModel[]) => void;
}

const ScheduleSettingContainer: FC<ScheduleSettingContainerProps> = ({
  isEdit,
  isAll,
  onSchedule,
}) => {
  const farmId = useGetFarmId();
  const farm = queryClient.getQueryData(["farm", farmId]) as FarmModel;
  const { modal } = useModalStore();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["farm", farmId, "Schedules"],
    queryFn: ({ signal }) => getCameraSchedule({ _id: farmId, signal }),
    retry: 1,
    enabled: modal === ModalType.CameraSetting,
    refetchOnWindowFocus: false,
    select: (data) => data.sort((a, b) => a.cameraId - b.cameraId),
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
      <ErrorComponent className='w(100%) h(fill) pack' error={error} />
    );
  }
  if (data) {
      
    content = (
      <>
        <Schedules
          isAll={isAll}
          onSchedule={onSchedule}
          isEdit={isEdit}
          schedules={data}
          cameras={farm.cameras}
        />
      </>
    );
  }

  return <>{content}</>;
};

export default ScheduleSettingContainer;
