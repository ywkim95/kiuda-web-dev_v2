import LeftCarrotArrowIcon from "../../../../../components/svg/LeftCarrotArrowIcon.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import RightCarrotArrowIcon from "../../../../../components/svg/RightCarrotArrowIcon.tsx";
import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import { FC } from "react";

interface DetailSensorValueProps {
  handleSensor: (sensorIndex: number) => void;
  index: number;
  name: string;
  value: number;
  unit: string;
}

const DetailSensorValue: FC<DetailSensorValueProps> = ({
  handleSensor,
  index,
  name,
  value,
  unit,
}) => {
  return (
    <div className="vbox gap(10)">
      <div className="hbox gap(8) pack">
        <button
          aria-label="LeftCarrotArrowIcon"
          onClick={() => handleSensor(index - 1)}
        >
          <LeftCarrotArrowIcon />
        </button>
        <div
          className={`w(63) h(63) r(${BorderRadius.INPUT}) bg(--color-background) text(pack)`}
        >
          {name}
        </div>
        <button
          aria-label="RightCarrotArrowIcon"
          onClick={() => handleSensor(index + 1)}
        >
          <RightCarrotArrowIcon />
        </button>
      </div>
      <P
        fontWeight={fontWeight.BOLD}
        fontSize={fontSize.BIG}
        className="text(center)"
      >
        {value.to2Fixed()}
        {unit}
      </P>
    </div>
  );
};

export default DetailSensorValue;
