import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Dropdown from "../../../../components/Dropdown/Dropdown.tsx";
import ScheduleModel from "../../../../models/Image/ScheduleModel.ts";

const timePeriodList = ["오전", "오후"];

const hourList = [
  "00시",
  "01시",
  "02시",
  "03시",
  "04시",
  "05시",
  "06시",
  "07시",
  "08시",
  "09시",
  "10시",
  "11시",
];

const minuteList = ["00분", "10분", "20분", "30분", "40분", "50분"];

interface DateSelectorProps {
  cameraId: number;
  setSchedules: Dispatch<SetStateAction<ScheduleModel[]>>;
  isAll: boolean;
}

const DateSelector: FC<DateSelectorProps> = ({
  cameraId,
  setSchedules,
  isAll,
}) => {
  const [timePeriodIndex, setTimePeriodIndex] = useState(0);
  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);

  const isFirstRender = useRef(true);

  const handleTime = (index: number) => {
    setTimePeriodIndex(index);
  };

  const handleHour = (index: number) => {
    setHourIndex(index);
  };

  const handleMinute = (index: number) => {
    setMinuteIndex(index);
  };

  const timeConverter = () => {
    const hour = parseInt(hourList[hourIndex].split("시")[0]);
    const minute = parseInt(minuteList[minuteIndex][0]);
    const AMPM = timePeriodIndex === 1 ? hour + 12 : hour;
    return +`${AMPM}${minute.toString().padEnd(2, "0")}`;
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isAll) {
      setSchedules((prev) => {
        return [...prev].map((schedule) => {
          const time = timeConverter();
          if (!schedule.schedules.includes(time)) {
            return {
              ...schedule,
              schedules: [...schedule.schedules, time].sort((a, b) => a - b),
            };
          } else {
            return schedule;
          }
        });
      });
    } else {
      setSchedules((prev) => {
        return [...prev].map((schedule) => {
          if (schedule.cameraId === cameraId) {
            const time = timeConverter();
            if (!schedule.schedules.includes(time)) {
              return {
                ...schedule,
                schedules: [...schedule.schedules, time].sort((a, b) => a - b),
              };
            } else {
              return schedule;
            }
          }
          return schedule;
        });
      });
    }
  }, [minuteIndex]);

  return (
    <div className="hbox justify-between">
      <Dropdown
        title={timePeriodList[timePeriodIndex]}
        list={timePeriodList}
        onSelectItem={handleTime}
      />
      <Dropdown
        title={hourList[hourIndex]}
        list={hourList}
        onSelectItem={handleHour}
      />
      <Dropdown
        title={minuteList[minuteIndex]}
        list={minuteList}
        onSelectItem={handleMinute}
      />
    </div>
  );
};

export default DateSelector;
