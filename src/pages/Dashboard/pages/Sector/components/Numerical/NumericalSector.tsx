import { BorderRadius } from "../../../../../../constant/border.ts";
import P from "../../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../../constant/font.ts";
import { FC, HTMLAttributes } from "react";
import ValueModel from "../../../../../../models/Sensor/ValueModel.ts";
import Span from "../../../../../../components/Span.tsx";
import SectorModel from "../../../../../../models/Sector/SectorModel.ts";

interface NumericalSectorProps extends HTMLAttributes<HTMLDivElement> {
  farmSector: SectorModel;
  values: ValueModel[];
}

const NumericalSector: FC<NumericalSectorProps> = ({
  farmSector,
  values,
  className,
  ...props
}) => {
  return (
    <div className="w(276) h(178) pack bg(transparent) p(8)">
      <div
        {...props}
        className={`relative r(${BorderRadius.MAIN}) bg(white) box-shadow(1/1/1/0/#00000012) w(100%) h(162) ${className ?? ""}`}
      >
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.BIG}
          // color={farmSector.isError ? "white" : "--color-primary"}
          className="text(pack) mt(16) mb(27)"
        >
          {farmSector.row+1}-{farmSector.col+1}
        </P>
        <div className="grid(2) gap(16) px(12)">
          {values.map((value) => {
            const sensorSpec = farmSector.sensors.find(
              (sensor) => sensor.id === value.id,
            )?.sensorSpec;

            return (
              <P
                key={value.value}
                fontSize={fontSize.SMALL}
                color="--color-sub-text"
                className="hbox gap(6) w(110)"
              >
                <Span
                  className={`w(34) h(34) r(${BorderRadius.INPUT}) bg(--color-logout-button) text(pack)`}
                >
                  Icon
                </Span>
                {value.value.to2Fixed()}
                {sensorSpec?.unit}
              </P>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NumericalSector;
