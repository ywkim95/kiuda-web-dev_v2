import DateButton from "./DateButton.tsx";
import Span from "../Span.tsx";
import useDateOptions from "../../hooks/useDateOptions.tsx";
import { FC } from "react";

interface DateButtonListProps {
  index: number;
  handleClick: (i: number) => void;
  className?: string;
}

const DateButtonList: FC<DateButtonListProps> = ({
  index,
  handleClick,
  className,
}) => {
  const { dateOptions } = useDateOptions();
  return (
    <div className={`vbox(fill) gap(9) h(fill) ${className}`}>
      {dateOptions.map((value, i) => {
        return (
          <DateButton
            onClick={() => handleClick(i)}
            isActive={index === i}
            key={value.text + i}
          >
            <Span color={index === i ? "white" : undefined}>{value.text}</Span>
          </DateButton>
        );
      })}
    </div>
  );
};

export default DateButtonList;
