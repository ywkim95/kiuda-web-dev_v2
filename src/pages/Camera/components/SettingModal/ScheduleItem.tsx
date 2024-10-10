import GreenXIcon from "../../../../components/svg/GreenXIcon.tsx";
import P from "../../../../components/P.tsx";
import { FC } from "react";

interface ScheduleItemProps {
  schedule: number;
  onRemove: (schedule: number) => void;
}

const ScheduleItem: FC<ScheduleItemProps> = ({ schedule, onRemove }) => {
  const scheduleConverter = (schedule: number) => {
    let hour: number;
    let minute: number;
    if (schedule < 100) {
      minute = schedule;
      return `오전 00시 ${minute}분`;
    } else if (schedule >= 1300) {
      hour = Math.floor(schedule / 100);
      minute = schedule % 100;
      return `오후 ${(hour - 12).toString().padStart(2, "0")}시 ${minute}분`;
    } else {
      hour = Math.floor(schedule / 100);
      minute = schedule % 100;
      return `오전 ${hour.toString().padStart(2, "0")}시 ${minute}분`;
    }
  };

  return (
    <div className="hbox b(1/--color-primary) r(4) w(148) h(50) text(pack) bg(--color-selected-box)">
      <P color="--color-primary" className="mr(14) pack user-select-none">
        {scheduleConverter(schedule)}
      </P>
      <button className="text(pack)" onClick={() => onRemove(schedule)}>
        <GreenXIcon />
      </button>
    </div>
  );
};

export default ScheduleItem;
