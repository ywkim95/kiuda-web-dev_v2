import { useState } from "react";

import CameraTab from "./CameraTab";
import DateTab from "./DateTab";
import TimeTab from "./TimeTab";
import CameraTabButton from "./CameraTabButton.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";

const OptionSelector = () => {
  const [index, setIndex] = useState(0);

  const onClickTap = (index: number) => {
    setIndex(index);
  };

  const CameraTabItems = [
    {
      name: "카메라",
      width: 87,
    },
    {
      name: "날짜",
      width: 73,
    },
    {
      name: "시간",
      width: 73,
    },
  ];

  return (
    <div
      className={`overflow(hidden) r(${BorderRadius.INPUT}) b(1/--color-border)`}
    >
      <div className="hbox gap(1) bg(--color-border)">
        {CameraTabItems.map((item, i) => (
          <CameraTabButton
            key={i}
            width={item.width}
            onClick={() => onClickTap(i)}
            className={
              index === i
                ? "bg(--color-primary) c(--color-box)"
                : "bg(--color-box) c(--color-text)"
            }
          >
            {item.name}
          </CameraTabButton>
        ))}
      </div>
      <div className="bt(1/--color-border) w(235) h(544)">
        {index === 0 ? <CameraTab /> : index === 1 ? <DateTab /> : <TimeTab />}
      </div>
    </div>
  );
};

export default OptionSelector;
