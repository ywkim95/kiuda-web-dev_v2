import IntegratedSensorValue from "./IntegratedSensorValue.tsx";
import { FC, JSX } from "react";
import useScrollBar from "../../../../../hooks/useScrollBar.tsx";
import ValueModel from "../../../../../models/Sensor/ValueModel.ts";
import SensorModel from "../../../../../models/Sensor/SensorModel.ts";
interface SensorListProps {
  values: ValueModel[];
  sensors: SensorModel[];
  icons: JSX.Element[];
  height: number;
  isSoil: boolean;
}
const SensorList: FC<SensorListProps> = ({
  values,
  icons,
  height,
  isSoil,
  sensors,
}) => {
  const { containerRef, contentRef, scrollbarRef, handleScrollbarDrag } =
    useScrollBar();

  return (
    <div
      ref={containerRef}
      className="w(100%) h(244) overflow(hidden) relative"
    >
      <div
        ref={contentRef}
        className="scrollNone grid(2) gap(24) px(24) c(white) w(708) h(244) scroll-y pr(18)"
      >
        {values.map((value, index) => {
          const spec = sensors.find((spec) => spec.id === value.id)?.sensorSpec;
          if (!spec) {
            return null;
          }
          return (
            <IntegratedSensorValue
              icon={icons[index]}
              name={spec.target}
              value={value.value}
              unit={spec.unit}
              key={value.id}
            />
          );
        })}
      </div>
      {isSoil && (
        <div
          ref={scrollbarRef}
          className={`absolute top(0) right(0) w(8) h(${height}) bg(--color-nonActive) r(4) pointer hover:bg(--color-primary) active:bg(--color-primary)`}
          onMouseDown={handleScrollbarDrag}
        />
      )}
    </div>
  );
};

export default SensorList;
