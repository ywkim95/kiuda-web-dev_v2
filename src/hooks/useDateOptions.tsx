import { getPreviousDate, getPreviousMonth } from "../constant/date.ts";
import { useState } from "react";
import { dateOptionsType } from "../constant/type.ts";

const useDateOptions = () => {
  const [customDateFunc, setCustomDateFunc] = useState(() => ({
    start: "",
    end: "",
  }));
  const dateOptions: dateOptionsType[] = [
    { func: () => getPreviousDate(1), text: "1일" },
    { func: () => getPreviousDate(7), text: "7일" },
    { func: () => getPreviousMonth(1), text: "1개월" },
    { func: () => getPreviousMonth(3), text: "3개월" },
    {
      func: () => customDateFunc,
      text: "사용자 설정",
    },
  ];

  return {
    dateOptions,
    setCustomDateFunc,
  };
};

export default useDateOptions;
