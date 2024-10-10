import EntranceLine from "./EntranceLine.tsx";
import { cloneElement, FC } from "react";
import LeftEntranceArrowIcon from "../../../../../components/svg/LeftEntranceArrowIcon.tsx";
import UpEntranceArrowIcon from "../../../../../components/svg/UpEntranceArrowIcon.tsx";
import RightEntranceArrowIcon from "../../../../../components/svg/RightEntranceArrowIcon.tsx";
import DownEntranceArrowIcon from "../../../../../components/svg/DownEntranceArrowIcon.tsx";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import { useQueryClient } from "@tanstack/react-query";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import {Direction} from "../../../../../constant/enum.ts";

interface EntranceLinesProps {
  top: string;
  left: string;
  bottom: string;
  right: string;
  iconSize?: string;
  isSetting?: boolean;
}

const EntranceLines: FC<EntranceLinesProps> = ({
  top,
  left,
  bottom,
  right,
  iconSize,
  isSetting,
}) => {
  const farmId = useGetFarmId();

  const queryClient = useQueryClient();

  const farm = queryClient.getQueryData<FarmModel>([
    "farm",
    farmId,
  ]) as FarmModel;

  const entranceLines = [
    {
      length: farm.sectorRow,
      direction: Direction.West,
      className: left,
      arrow: <LeftEntranceArrowIcon iconSize={iconSize} />,
    },
    {
      length: farm.sectorCol,
      direction: Direction.North,
      className: top,
      arrow: <UpEntranceArrowIcon iconSize={iconSize} />,
    },
    {
      length: farm.sectorRow,
      direction: Direction.East,
      className: right,
      arrow: <RightEntranceArrowIcon iconSize={iconSize} />,
    },
    {
      length: farm.sectorCol,
      direction: Direction.South,
      className: bottom,
      arrow: <DownEntranceArrowIcon iconSize={iconSize} />,
    },
  ];

  return (
    <>
      {entranceLines.map(({ length, direction, className, arrow }, index) => {
        const filteredEntranceList = farm.entrances?.filter(
          (item) => item.directionId === direction,
        ) ?? [];

        return (
          <EntranceLine
            testId={`entrance-div-${index}`}
            key={direction}
            length={length}
            direction={direction}
            EntranceList={filteredEntranceList}
            className={className}
            isSetting={isSetting}
          >
            {(color) => cloneElement(arrow, { color })}
          </EntranceLine>
        );
      })}
    </>
  );
};

export default EntranceLines;
