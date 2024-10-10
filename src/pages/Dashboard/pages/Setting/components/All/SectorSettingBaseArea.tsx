import SectorMoveButtonList from "../../../../components/SectorMoveButtonList.tsx";
import { BorderRadius } from "../../../../../../constant/border.ts";
import NameEntrance from "./NameEntrance.tsx";
import { cloneElement, Dispatch, FC, ReactNode, SetStateAction } from "react";
import useTranslate from "../../hooks/useTranslate.tsx";
import entranceBase from "../EntranceLines.tsx";
import { Size } from "../../../../../../util/DashboardUtils.ts";
import EntranceModel from "../../../../../../models/Farm/EntranceModel.ts";
import {Direction} from "../../../../../../constant/enum.ts";

interface SectorSettingBaseAreaProps {
  row: number;
  col: number;
  entrances: EntranceModel[];
  setEntrances?: Dispatch<SetStateAction<EntranceModel[]>>;
  isSetting: boolean;
  children: ReactNode;
}

const SectorSettingBaseArea: FC<SectorSettingBaseAreaProps> = ({
  row,
  col,
  entrances,
  setEntrances,
  isSetting,
  children,
}) => {
  const { handleMove, translate } = useTranslate({
    row: row,
    col: col,
    size: Size.small,
  });
  const entrancesBase = entranceBase(row, col);

  return (
    <div className={`p(10/30/30/30) relative`}>
      <SectorMoveButtonList
        top="top(-15) left(30) px(30) w(548) h(30)"
        left="top(10) left(0) py(30) w(30) h(240)"
        right="top(10) right(-60) py(30) w(30) h(240)"
        bottom="bottom(-40) left(30) px(30) w(548) h(30)"
        width="548"
        height="240"
        iconW="24"
        iconH="24"
        onMove={handleMove}
        translate={translate}
        size={Size.small}
      />
      <div
        className={`w(548) h(240) p(30) bg(--color-sub-background) r(${BorderRadius.MAIN}) relative overflow(hidden)`}
      >
        {entrancesBase.map((entrance, index) => {
          const filteredEntranceList = entrances.filter(
            (item) => item.directionId === entrance.direction,
          );

          const isHorizontal = entrance.direction === Direction.West || entrance.direction === Direction.East;

          return (
            <NameEntrance
              testId={`entrance-div-${index}`}
              key={`entrance-div-${entrance.direction}-${index}-${isHorizontal}`}
              length={entrance.length}
              direction={entrance.direction}
              EntranceList={filteredEntranceList}
              className={`${entrance.className} transition(0.5s) ${!isHorizontal ? `translateX(${translate.x}px)` : `translateY(${translate.y}px)`}`}
              setEntranceList={setEntrances}
              isSetting={isSetting}
            >
              {(color) => cloneElement(entrance.arrow, { color })}
            </NameEntrance>
          );
        })}
        <div
          className={`absolute(0,0) w(30) h(30) bg(--color-sub-background)`}
        />
        <div
          className={`absolute(~0,0) w(30) h(30) bg(--color-sub-background)`}
        />
        <div
          className={`absolute(~0,~0) w(30) h(30) bg(--color-sub-background)`}
        />
        <div
          className={`absolute(0,~0) w(30) h(30) bg(--color-sub-background)`}
        />
        <div
          className={`w(100%) h(100%) bg(white) b(4/white) r(${BorderRadius.MAIN}) overflow(hidden)`}
        >
          <div
            className={`w(100%) h(100%) grid(${col}) gap(0) r(${BorderRadius.MAIN}) transition(0.5s) translateX(${translate.x}px) translateY(${translate.y}px)`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorSettingBaseArea;
