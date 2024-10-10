import LeftChevronArrowIcon from "../../../components/svg/LeftChevronArrowIcon.tsx";
import RightChevronArrowIcon from "../../../components/svg/RightChevronArrowIcon.tsx";
import UpChevronArrowIcon from "../../../components/svg/UpChevronArrowIcon.tsx";
import DownChevronArrowIcon from "../../../components/svg/DownChevronArrowIcon.tsx";
import { FC, useEffect, useState } from "react";
import { useGetFarmId } from "../../../hooks/useFarmLoader.tsx";
import { queryClient } from "../../../http/http.ts";
import FarmModel from "../../../models/Farm/FarmModel.ts";
import { Size, sizeList } from "../../../util/DashboardUtils.ts";
import {Direction} from "../../../constant/enum.ts";

interface SectorMoveButtonListProps {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  width?: string;
  height?: string;
  iconW?: string;
  iconH?: string;
  onMove: (direction: Direction) => void;
  translate: { x: number; y: number };
  size: Size;
}

const SectorMoveButtonList: FC<SectorMoveButtonListProps> = ({
  top,
  left,
  bottom,
  right,
  width = "1240",
  height = "668",
  iconW = "32",
  iconH = "32",
  onMove,
  translate,
  size = Size.medium,
}) => {
  const farmId = useGetFarmId();
  const farm = queryClient.getQueryData(["farm", farmId]) as FarmModel;
  const [isOver, setIsOver] = useState({
    top: false,
    left: false,
    right: false,
    bottom: false,
  });
  const x =
    sizeList[size].x * (farm.sectorRow - 4) <= 0
      ? 0
      : sizeList[size].x * (farm.sectorRow - 4);
  const defaultY = size === Size.medium ? 7 : 3;
  const y =
    sizeList[size].y * (farm.sectorCol - defaultY) <= 0
      ? 0
      : sizeList[size].y * (farm.sectorCol - defaultY);

  useEffect(() => {
    setIsOver({
      top: translate.y !== 0,
      left: translate.x !== 0,
      right: translate.x !== -x, // Assuming each sector is 100px wide
      bottom: translate.y !== -y, // Assuming each sector is 100px tall
    });
  }, [translate.x, translate.y, x, y]);

  const moveButtons = [
    {
      direction: Direction.West,
      className: `absolute ${left ?? "top(0) left(0) py(60) w(60) h(100%)"} text(pack)`,
      arrow: (
        <LeftChevronArrowIcon
          width={iconW}
          height={iconH}
          isOver={isOver.left}
        />
      ),
    },
    {
      direction: Direction.North,
      className: `absolute ${top ?? "top(0) px(60) w(100%) h(60)"} text(pack)`,
      arrow: (
        <UpChevronArrowIcon width={iconW} height={iconH} isOver={isOver.top} />
      ),
    },
    {
      direction: Direction.East,
      className: `absolute ${right ?? "top(0) right(0) py(60) w(60) h(100%)"} text(pack)`,
      arrow: (
        <RightChevronArrowIcon
          width={iconW}
          height={iconH}
          isOver={isOver.right}
        />
      ),
    },
    {
      direction: Direction.South,
      className: `absolute ${bottom ?? "bottom(0) px(60) w(100%) h(60)"} text(pack)`,
      arrow: (
        <DownChevronArrowIcon
          width={iconW}
          height={iconH}
          isOver={isOver.bottom}
        />
      ),
    },
  ];

  return (
    <div className="absolute(0,0)">
      <div className={`relative w(${width}) h(${height})`}>
        {moveButtons.map((moveButton) => (
          <div key={moveButton.direction} className={moveButton.className}>
            <button
              disabled={!moveButton.arrow.props.isOver}
              onClick={() => onMove(moveButton.direction)}
            >
              {moveButton.arrow}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorMoveButtonList;
