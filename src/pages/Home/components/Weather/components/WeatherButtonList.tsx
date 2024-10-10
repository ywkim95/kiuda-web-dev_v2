import LeftChevronArrowIcon from "../../../../../components/svg/LeftChevronArrowIcon.tsx";
import RightChevronArrowIcon from "../../../../../components/svg/RightChevronArrowIcon.tsx";
import { FC } from "react";

interface WeatherButtonListProps {
  handleScroll: (isLeft: boolean) => void;
  index: number;
}

const WeatherButtonList: FC<WeatherButtonListProps> = ({
  handleScroll,
  index,
}) => {
  return (
    <>
      <button
        aria-label="LeftChevronArrowIcon"
        onClick={() => handleScroll(true)}
        className="absolute(-20,25)"
      >
        <LeftChevronArrowIcon width="16" height="16" isOver={index !== 0} />
      </button>
      <button
        aria-label="RightChevronArrowIcon"
        onClick={() => handleScroll(false)}
        className="absolute(~-20,25)"
      >
        <RightChevronArrowIcon width="16" height="16" isOver={index !== 2} />
      </button>
    </>
  );
};

export default WeatherButtonList;
