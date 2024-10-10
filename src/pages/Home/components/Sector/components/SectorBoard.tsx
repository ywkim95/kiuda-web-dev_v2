import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import MoreIcon from "../../../../../components/svg/MoreIcon.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import FarmSectorList from "./FarmSectorList.tsx";
import EntranceLines from "./EntranceLines.tsx";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../../http/routes.ts";
import { FC } from "react";

interface SectorBoardProps {
  setDetail?: (id: number) => void;
}

const SectorBoard: FC<SectorBoardProps> = ({ setDetail }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(pageRoutes.DASHBOARD);

  return (
    <div className="vbox gap(24) h(100%) p(25)">
      <div className="hbox space-between">
        <P fontWeight={fontWeight.BOLD} fontSize={fontSize.BIG}>
          구역 개요
        </P>
        <button onClick={handleNavigate}>
          <MoreIcon />
        </button>
      </div>
      <div
        className={`w(100%) h(fill) bg(--color-sub-background) r(${BorderRadius.MAIN}) pack p(43/40) relative`}
      >
        {setDetail && <FarmSectorList setDetail={setDetail} />}
        <EntranceLines
          top="top(0) px(40) w(716) h(43) hbox"
          right="top(0) right(0) py(43) w(40) h(322) vbox"
          left="top(0) left(0) py(43) w(40) h(322) vbox"
          bottom="bottom(0) px(40) w(716) h(43) hbox"
          iconSize="32"
        />
      </div>
    </div>
  );
};

export default SectorBoard;
