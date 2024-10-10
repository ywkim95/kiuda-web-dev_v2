import ScheduleItem from "./ScheduleItem.tsx";
import CameraSettingScrollBox from "./CameraSettingScrollBox.tsx";
import { FC, useEffect, useState } from "react";
import DateSelector from "./DateSelector.tsx";
import ScheduleModel from "../../../../models/Image/ScheduleModel.ts";
import { cloneDeep } from "lodash";
import useCameraSettingStore from "../../../../store/useCameraSettingStore.ts";
import { areListsEqual } from "../../../../util/Util.ts";
import CameraModel from "../../../../models/Image/CameraModel.ts";

interface SchedulesProps {
  isEdit: boolean;
  isAll: boolean;
  onSchedule: (schedule: ScheduleModel[]) => void;
  schedules: ScheduleModel[];
  cameras: CameraModel[];
}

const Schedules: FC<SchedulesProps> = ({
  isEdit,
  onSchedule,
  schedules,
  isAll,
  cameras,
}) => {
    const newMappingData: ScheduleModel[] = cameras.map(camera => {
        return {
            cameraId: camera.id,
            schedules: [],
        };
    }).sort((a, b) => a.cameraId - b.cameraId);
    const newSetData = Array.from(new Set(schedules.map(schedule => JSON.stringify(schedule)))).map(schedule => JSON.parse(schedule));
    const newData: ScheduleModel[] = newMappingData.map(mapping => {
        const schedule = newSetData.find(data => data.cameraId === mapping.cameraId);
        if (schedule) {
            return schedule;
        }
        return mapping;
    });
  const { cameraIndex } = useCameraSettingStore();
  const [scheduleList, setScheduleList] = useState<ScheduleModel[]>(
      newData
  );
  const selectedSchedule = scheduleList[cameraIndex];

  const handleRemoveItem = (schedule: number) => {
    setScheduleList((prev) => {
      const newSchedules = [...prev];
      const selected = newSchedules[cameraIndex];
      newSchedules[cameraIndex] = {
        ...selected,
        schedules: selected.schedules.filter((s) => s !== schedule),
      };

      return newSchedules;
    });
  };

  useEffect(() => {
    setScheduleList(
      isAll
        ? newData.map((s) => {
            return {
              ...s,
              schedules: [],
            };
          })
        : cloneDeep(newData),
    );
  }, [isAll]);

  useEffect(() => {
    if (isAll) {
        console.log(scheduleList);
      onSchedule(scheduleList);
    } else {
      const filteredScheduleList = scheduleList.filter((schedule) => {
        const scheduleItem = newData.find(
          (s) => s.cameraId === schedule.cameraId,
        );
        if (!scheduleItem) {
          return false;
        }
        return !areListsEqual(schedule.schedules, scheduleItem.schedules);
      });
      console.log(filteredScheduleList);
      onSchedule(filteredScheduleList);
    }
  }, [isAll, scheduleList]);

  return (
    <>
      <CameraSettingScrollBox
        name="촬영 스케쥴 설정"
        className={`grid(3) ${isEdit ? "h(151)" : "h(221)"}`}
      >
        {selectedSchedule.schedules.map((schedule) => (
          <ScheduleItem
            key={schedule}
            schedule={schedule}
            onRemove={handleRemoveItem}
          />
        ))}
      </CameraSettingScrollBox>
      {isEdit && (
        <DateSelector
          cameraId={selectedSchedule.cameraId}
          setSchedules={setScheduleList}
          isAll={isAll}
        />
      )}
    </>
  );
};

export default Schedules;
