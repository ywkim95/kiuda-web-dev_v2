import { Dispatch, FC, SetStateAction } from "react";
import { BorderRadius } from "../constant/border.ts";
import P from "./P.tsx";
import { fontSize } from "../constant/font.ts";
import DatePicker from "podo-datepicker-component";

interface CustomDateComponentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
}

const CustomDateComponent: FC<CustomDateComponentProps> = ({
  isOpen,
  setIsOpen,
  setStartDate,
  setEndDate,
}) => {
  return (
    <>
      <DatePicker
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        returnStartDate={setStartDate}
        returnEndDate={setEndDate}
      />
      <button
        className={`absolute(~70,~11) bg(white) b(1/--color-primary) w(52.75) h(16) r(${BorderRadius.INPUT})`}
        onClick={() => setIsOpen(false)}
      >
        <P fontSize={fontSize.SMALL}>닫기</P>
      </button>
    </>
  );
};

export default CustomDateComponent;
