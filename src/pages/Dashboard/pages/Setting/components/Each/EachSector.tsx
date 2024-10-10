import { BorderRadius } from "../../../../../../constant/border.ts";
import Span from "../../../../../../components/Span.tsx";
import { fontSize, fontWeight } from "../../../../../../constant/font.ts";
import P from "../../../../../../components/P.tsx";
import EachSectorButton from "./EachSectorButton.tsx";
import RollbackIcon from "../../../../../../components/svg/RollbackIcon.tsx";
import SaveIcon from "../../../../../../components/svg/SaveIcon.tsx";
import UpCarrotArrowIcon from "../../../../../../components/svg/UpCarrotArrowIcon.tsx";
import DownCarrotArrowIcon from "../../../../../../components/svg/DownCarrotArrowIcon.tsx";
import Slider from "../../../../../Home/components/Global/components/Slider.tsx";
import { FC, useEffect, useRef } from "react";
import { EachSectorSettingType } from "../../../../../../constant/type.ts";
import SectorModel from "../../../../../../models/Sector/SectorModel.ts";

interface EachSectorProps {
  sector: SectorModel;
  itemState: EachSectorSettingType;
  handleChecked: (id: number) => void;
  handleRollback: (id: number) => void;
  handleSave: (id: number) => void;
  handleFold: (id: number) => void;
  updateSensorSetting: (
    sensorId: number,
    minValue: number,
    maxValue: number,
    revisionValue: number,
  ) => void;
  index: number;
}

const EachSector: FC<EachSectorProps> = ({
  sector,
  itemState,
  handleChecked,
  handleRollback,
  handleSave,
  handleFold,
  updateSensorSetting,
  index,
}) => {
  const alias = sector.alias ?? `${sector.row}-${sector.col}`;

  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    containerRefs.current.forEach((container) => {
      if (container) {
        container.style.maxHeight = !itemState.fold
          ? "0"
          : `${container.scrollHeight}px`;
      }
    });
  }, [itemState.fold]);

  return (
    <>
      <div
        className={`w(100%) h(50) bg(--color-box) b(--color-border) r(${BorderRadius.INPUT}) text(middle) px(20) hbox space-between`}
      >
        <div
          className="hbox gap(14) pointer"
          onClick={() => handleChecked(sector.id)}
        >
          <div
            className={`w(26) h(26) r(${BorderRadius.INPUT}) bg(white) b(--color-border) bw(2) text(pack)`}
          >
            {itemState.modified && <Span fontSize={fontSize.BIG}>✓</Span>}
          </div>
          <P fontWeight={fontWeight.BOLD}>
            구역명 <Span>{alias}</Span>
          </P>
        </div>
        <div className="hbox gap(14)">
          <EachSectorButton onClick={() => handleRollback(sector.id)}>
            <RollbackIcon />
          </EachSectorButton>
          <EachSectorButton onClick={() => handleSave(sector.id)}>
            <SaveIcon />
          </EachSectorButton>
          <button onClick={() => handleFold(sector.id)}>
            {itemState.fold ? <UpCarrotArrowIcon /> : <DownCarrotArrowIcon />}
          </button>
        </div>
      </div>
      <div
        ref={(el) => (containerRefs.current[index] = el)}
        className={`w(100%) bg(white) px(24) grid(2) gap(24) overflow(hidden) transition(0.3s)`}
      >
        {sector.sensors.map((sensor) => {
          const SliderValue = {
            name: sensor.sensorSpec.name,
            unit: sensor.sensorSpec.unit,
            min: sensor.sensorSpec.min,
            max: sensor.sensorSpec.max,
            revision: sensor.alarmSetting.revision,
            userMin: sensor.alarmSetting.min,
            userMax: sensor.alarmSetting.max,
            width: "100%",
          };
          return (
            <Slider
              key={sensor.id}
              onUpdate={(
                minValue: number,
                maxValue: number,
                revisionValue: number,
              ) => {
                updateSensorSetting(
                  sensor.id,
                  minValue,
                  maxValue,
                  revisionValue,
                );
              }}
              {...SliderValue}
            />
          );
        })}
      </div>
    </>
  );
};

export default EachSector;
