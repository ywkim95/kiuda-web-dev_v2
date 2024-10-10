import { BorderRadius } from "../../../../../../constant/border.ts";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import MixedSector from "./MixedSector.tsx";
import P from "../../../../../../components/P.tsx";
import { fontWeight } from "../../../../../../constant/font.ts";
import SectorMoveButtonList from "../../../../components/SectorMoveButtonList.tsx";
import Section from "../../../../../../components/Section.tsx";
import useTranslate from "../../../Setting/hooks/useTranslate.tsx";
import { Size } from "../../../../../../util/DashboardUtils.ts";
import { FC } from "react";

interface MixedSectorContainerProps {
  farm: FarmModel;
  values: number[];
  unit: string;
  date: string;
}

const MixedSectorContainer: FC<MixedSectorContainerProps> = ({
  farm,
  values,
  unit,
  date,
}) => {
  const row = farm.sectorRow;
  const col = farm.sectorCol;
  const { handleMove, translate } = useTranslate({
    row,
    col,
    size: Size.medium,
  });

  let index = 0;
  const sectors = [];

  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      const item = farm.sectors.find(
        (item) => item.row === r && item.col === c,
      );
      

      if (item && item.sensors.length > 0) {
        sectors.push(
          <MixedSector
            key={item.id}
            onClick={() => {}}
            value={values[index]?? 0}
            alias={item.alias ?? `${item.row+1}-${item.col+1}`}
            unit={unit ?? ""}
          />,
        );
        index++;
      } else {
        sectors.push(<div key={`${r}-${c}`}></div>);
      }
    }
  }
  return (
    <Section height="668" className="p(6) bg(white) relative">
      <P fontWeight={fontWeight.BOLD} className="text(pack) mt(38) mb(33)">
        {date}
      </P>
      <SectorMoveButtonList
        top="top(-50) px(50) w(100%) h(50)"
        left="top(0) left(-50) py(50) w(50) h(100%)"
        right="top(0) right(-50) py(50) w(50) h(100%)"
        bottom="bottom(-50) px(50) w(100%) h(50)"
        width="454"
        height="668"
        onMove={handleMove}
        translate={translate}
        size={Size.medium}
      />
      <div
        className={`w(100%) h(565) bg(white) b(4/white) r(${BorderRadius.MAIN}) relative overflow(hidden)`}
      >
        <div
          className={`w(100%) h(fill) bg(white) gap(0) r(${BorderRadius.MAIN}) grid(${col}) transition(0.5s) translateX(${translate.x}px) translateY(${translate.y}px)`}
        >
          {sectors}
        </div>
      </div>
    </Section>
  );
};

export default MixedSectorContainer;
