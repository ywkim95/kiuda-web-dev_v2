import { FC, HTMLAttributes, useState } from "react";
import Span from "../../../../../components/Span.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import BackButtonIcon from "../../../../../components/svg/BackButtonIcon.tsx";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import ValueModel from "../../../../../models/Sensor/ValueModel.ts";
import DetailButtonList from "./DetailButtonList.tsx";
import DetailSensorValue from "./DetailSensorValue.tsx";
import {
  calculateSectorId,
  calculateSensorIndex,
} from "../../../../../util/SectorUtils.ts";
import DetailChartContainer from "./DetailChartContainer.tsx";
import { queryClient } from "../../../../../http/http.ts";

interface SectorDetailProps extends HTMLAttributes<HTMLDivElement> {
  detail: number;
  setDetail: (detail: number | undefined) => void;
}

const SectorDetail: FC<SectorDetailProps> = ({
  detail,
  setDetail,
  ...props
}) => {
  const farmId = useGetFarmId();
  const farm = queryClient.getQueryData<FarmModel>([
    "farm",
    farmId,
  ]) as FarmModel;

  const sensorValues = queryClient.getQueryData([
    "farm",
    farmId,
    "sensorValue",
  ]) as ValueModel[];

  const [sensorIndex, setSensorIndex] = useState(0);

  const sectors = farm?.sectors;

  const sector = sectors.find((item) => item.id === detail);

  if (!sector || !sensorValues) {
    return null;
  }

  const sensor = sector.sensors[sensorIndex];

  const handleSensor = (sensorIndex: number) => {
    const index = calculateSensorIndex(sensorIndex, sector.sensors.length);
    setSensorIndex(index);
  };

  const handleSector = (isNext: boolean) => {
    const currentSectorIndex = sectors.findIndex((item) => item.id === detail);
    const sectorId = calculateSectorId(
      isNext,
      currentSectorIndex,
      sectors.length,
      sectors,
    );
    setDetail(sectorId);
    setSensorIndex(0);
  };
  
  
  const alias = sector.alias ?? `구역 ${sector.row}-${sector.col}`;

  return (
    <div {...props} className="w(100%) h(fill) vbox relative p(25)">
      <div className="hbox w(100%) space-between mb(20)">
        <div className="pl(20)">
          <Span
            fontSize={fontSize.ExtraBIG}
            fontWeight={fontWeight.BOLD}
            // color={sector.isError ? "--color-error" : undefined}
          >
            {alias}
          </Span>
          {/*{sector.isError ? <Span className="ml(5)">에러입니다.</Span> : null}*/}
        </div>
        <button onClick={() => setDetail(undefined)} className="">
          <BackButtonIcon />
        </button>
      </div>
      <div className="hbox gap(15) px(20) relative">
        <div className="absolute(25,0) w(fill) h(fill) vbox gap(10)">
          <DetailSensorValue
            index={sensorIndex}
            handleSensor={handleSensor}
            name={sector.sensors[sensorIndex].sensorSpec.name}
            value={sensorValues[sensorIndex].value}
            unit={sensor.sensorSpec.unit}
          />
        </div>
        <DetailChartContainer sensorId={sensor.id} sectorId={sector.id} />
      </div>
      <DetailButtonList handleSector={handleSector} />
    </div>
  );
};

export default SectorDetail;
