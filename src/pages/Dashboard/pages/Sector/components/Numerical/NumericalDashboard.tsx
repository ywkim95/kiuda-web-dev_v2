import SectorMoveButtonList from "../../../../components/SectorMoveButtonList.tsx";
import Section from "../../../../../../components/Section.tsx";
import { BorderRadius } from "../../../../../../constant/border.ts";
import { useQuery } from "@tanstack/react-query";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import { getSensorValue } from "../../../../../../http/http.ts";
import LoadingButton from "../../../../../Loading/LoadingButton.tsx";
import NumericalSector from "./NumericalSector.tsx";
import {FC, useMemo} from "react";
import { Size } from "../../../../../../util/DashboardUtils.ts";
import P from "../../../../../../components/P.tsx";
import useTranslate from "../../../Setting/hooks/useTranslate.tsx";
import {oneHour} from "../../../../../../constant/date.ts";

interface NumericalDashboardProps {
  farm: FarmModel;
}

const NumericalDashboard:FC<NumericalDashboardProps> = ({farm}) => {
    

  const {
    data: sensorValues,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["farm", farm.id, "sensorValue"],
    queryFn: ({ signal }) => getSensorValue({ signal, _id: farm.id }),
      refetchOnWindowFocus: false,
      staleTime: oneHour,
  });

  const { translate, handleMove } = useTranslate({
    col: farm.sectorCol,
    row: farm.sectorRow,
    size: Size.large,
  });

  const sectors = useMemo(() => {
    if (!sensorValues) {
      return [];
    }

    return Array.from({ length: farm.sectorRow }, (_, row) =>
      Array.from({ length: farm.sectorCol }, (_, col) => {
        const item = farm.sectors.find(
          (item) => item.row === row && item.col === col,
        );

        const filteredSensorValues = sensorValues?.filter((sensorValue) =>
          item?.sensors.some((sensor) => sensor.id === sensorValue.id),
        );

        return item ? (
          <NumericalSector
            key={item.id}
            farmSector={item}
            values={filteredSensorValues}
          />
        ) : (
          <div key={`${row}-${col}`}></div>
        );
      }),
    );
  }, [farm, sensorValues]);

  if (isPending) {
    return (
      <div className="h(100%) w(1240) pack bg(white)">
        <LoadingButton />
        <P>로딩 중...</P>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h(100%) w(1240) pack bg(--color-background)">
        <h1>{error?.code}</h1>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <Section height="668" className="p(60) bg(white) relative">
      <SectorMoveButtonList
        onMove={handleMove}
        translate={translate}
        size={Size.large}
      />
      <div
        className={`w(100%) h(fill) bg(--color-sub-background) b(8/--color-sub-background) r(${BorderRadius.MAIN}) overflow(hidden) relative`}
      >
        <div
          className={`w(100%) h(100%) gap(0) r(${BorderRadius.MAIN}) grid(${farm.sectorCol}) transition(0.5s) translateX(${translate.x}px) translateY(${translate.y}px)`}
        >
          {sectors}
        </div>
      </div>
    </Section>
  );
};

export default NumericalDashboard;
