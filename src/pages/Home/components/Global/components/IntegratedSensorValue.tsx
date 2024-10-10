import { FC, ReactNode } from "react";
import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";

interface IntegratedSensorValueProps {
  icon: ReactNode;
  name: string;
  value: number;
  unit: string;
}

const IntegratedSensorValue: FC<IntegratedSensorValueProps> = ({
  icon,
  name,
  value,
  unit,
}) => {
  return (
    <div className="w(100%) h(fill) bg(--color-background) r(100) p(8) hbox gap(25)">
      <div className="relative p(20) r(100) bg(--color-primary) w(94) h(94) pack">
        <div className="absolute">{icon}</div>
      </div>
      <div className="vbox gap(9)">
        <P fontWeight={fontWeight.BOLD} fontSize={fontSize.BIG}>
          {name}
        </P>
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.ExtraBIG}
          color="--color-primary"
        >
          {value.to2Fixed()}
          {unit}
        </P>
      </div>
    </div>
  );
};

export default IntegratedSensorValue;
