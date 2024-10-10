import { FC } from "react";
import DateButtonList from "./DateButtons/DateButtonList.tsx";

interface ButtonsComponentProps {
  index: number;
  handleClick: (index: number) => void;
  className?: string;
}

const ButtonsComponent: FC<ButtonsComponentProps> = ({
  index,
  handleClick,
  className = "pt(100) w(fill)",
}) => (
  <DateButtonList
    index={index}
    handleClick={handleClick}
    className={className}
  />
);

export default ButtonsComponent;
