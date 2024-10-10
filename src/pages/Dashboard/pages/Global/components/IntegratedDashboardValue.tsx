import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import { FC, ReactNode } from "react";

interface IntegratedDashboardValueProps {
  name: string;
  value: number;
  unit: string;
  icon: ReactNode;
}

const IntegratedDashboardValue: FC<IntegratedDashboardValueProps> = ({
  name,
  value,
  unit,
  icon,
}) => {
  return (
    <div
      className="w(100%) h(fill) bg(--color-background) r(50) p(8) hbox gap(10) mb(15)"
      data-testid="sensor-value"
      role="figure"
    >
      <div className="relative p(10) r(100) bg(--color-primary) w(68) h(68) pack">
        <div className="absolute">{icon}</div>
      </div>
      <div className="vbox gap(6)">
        <P fontWeight={fontWeight.BOLD} fontSize={fontSize.SMALL}>{name}</P>
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.NORMAL}
          color="--color-primary"
        >
          {value.to2Fixed()}
          {unit}
        </P>
      </div>
    </div>
  );
};

export default IntegratedDashboardValue;
