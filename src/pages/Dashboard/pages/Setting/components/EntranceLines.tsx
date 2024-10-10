import LeftEntranceArrowIcon from "../../../../../components/svg/LeftEntranceArrowIcon.tsx";
import UpEntranceArrowIcon from "../../../../../components/svg/UpEntranceArrowIcon.tsx";
import RightEntranceArrowIcon from "../../../../../components/svg/RightEntranceArrowIcon.tsx";
import DownEntranceArrowIcon from "../../../../../components/svg/DownEntranceArrowIcon.tsx";
import {Direction} from "../../../../../constant/enum.ts";

const EntranceLines = (row: number, col: number) => [
  {
    length: row,
    direction: Direction.West,
    className: "top(0) left(0) py(30) w(30) h(100%) vbox",
    arrow: <LeftEntranceArrowIcon />,
  },
  {
    length: col,
    direction: Direction.North,
    className: "top(0) w(100%) h(30) hbox",
    arrow: <UpEntranceArrowIcon />,
  },
  {
    length: row,
    direction: Direction.East,
    className: "top(0) right(0) py(30) w(30) h(100%) vbox",
    arrow: <RightEntranceArrowIcon />,
  },
  {
    length: col,
    direction: Direction.South,
    className: "bottom(0) pr(60) w(100%) h(30) hbox",
    arrow: <DownEntranceArrowIcon />,
  },
];

export default EntranceLines;
