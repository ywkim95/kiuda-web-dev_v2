import LeftChevronArrowIcon from "../../../../../components/svg/LeftChevronArrowIcon.tsx";
import RightChevronArrowIcon from "../../../../../components/svg/RightChevronArrowIcon.tsx";
import { FC } from "react";

interface DetailButtonListProps {
  handleSector: (isNext: boolean) => void;
}

const DetailButtonList: FC<DetailButtonListProps> = ({ handleSector }) => {
  return (
    <>
      <button onClick={() => handleSector(false)} className="absolute(20,210)">
        <LeftChevronArrowIcon width="16" height="16" isOver={true} />
      </button>
      <button onClick={() => handleSector(true)} className="absolute(~20,210)">
        <RightChevronArrowIcon width="16" height="16" isOver={true} />
      </button>
    </>
  );
};

export default DetailButtonList;
