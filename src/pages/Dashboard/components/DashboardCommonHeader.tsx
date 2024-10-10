import LeftChevronArrowIcon from "../../../components/svg/LeftChevronArrowIcon.tsx";
import P from "../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../constant/font.ts";
import RightChevronArrowIcon from "../../../components/svg/RightChevronArrowIcon.tsx";
import { FC, ReactNode } from "react";

interface DashboardCommonHeaderProps {
  className?: string;
  onClickPrev?: () => void;
  onClickNext?: () => void;
  children?: ReactNode;
  title: string;
}

const DashboardCommonHeader: FC<DashboardCommonHeaderProps> = ({
  className,
  onClickPrev,
  onClickNext,
  children,
  title,
}) => {
  return (
    <>
      <div className={className}>
        <button onClick={onClickPrev} data-testid="prev-button">
          <LeftChevronArrowIcon height="12" width="12" isOver={true} />
        </button>
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.BIG}
          className="w(150) text(center)"
        >
          {title}
        </P>
        <button onClick={onClickNext} data-testid="next-button">
          <RightChevronArrowIcon height="12" width="12" isOver={true} />
        </button>
      </div>
      {children}
    </>
  );
};

export default DashboardCommonHeader;
