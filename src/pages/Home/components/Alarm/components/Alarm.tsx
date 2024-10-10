import Span from "../../../../../components/Span.tsx";
import Divider from "../../../../../components/svg/Divider.tsx";
import AlertIcon_LV1 from "../../../../../components/svg/AlertIcon_LV1.tsx";
import AlertIcon_LV2 from "../../../../../components/svg/AlertIcon_LV2.tsx";
import AlertIcon_LV3 from "../../../../../components/svg/AlertIcon_LV3.tsx";
import { getFormattedDate } from "../../../../../constant/date.ts";
import { FC } from "react";
import AlarmModel from "../../../../../models/Alarm/AlarmModel.ts";
import SpecModel from "../../../../../models/Sensor/SpecModel.ts";

interface AlarmProps {
  data: AlarmModel;
  alias: string;
  sensorSpec: SpecModel;
}

const Alarm: FC<AlarmProps> = ({ data, alias, sensorSpec }) => {
  const levelColor = (level: number) => {
    switch (level) {
      case 0:
        return <AlertIcon_LV1 />;
      case 1:
        return <AlertIcon_LV2 />;
      case 2:
        return <AlertIcon_LV3 />;
      default:
        return <AlertIcon_LV3 />;
    }
  };
  const date = getFormattedDate(new Date(data.time)).slice(5);

  return (
    <div className="hbox gap(20) w(fill)">
      {levelColor(data.level)}
      <Span className="w(fill) hbox gap(5)">
        {date} <Divider /> {alias}의{" "}
        {sensorSpec.name}가 {data.value}
        {sensorSpec.unit} 입니다.
      </Span>
    </div>
  );
};

export default Alarm;
