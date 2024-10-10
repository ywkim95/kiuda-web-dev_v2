import { JSX, useEffect, useState } from "react";
import TimeTabItem from "./TimeTabItem";
import ScrollDiv from "../../../../../components/ScrollDiv/ScrollDiv.tsx";
import useCameraSearchStore from "../../../../../store/useCameraSearchStore.ts";
import { CameraItem } from "../../../../../constant/type.ts";

const TimeTab = () => {
  const { timeList, setTimeList } = useCameraSearchStore();
  const [selectedAMPM, setSelectedAMPM] = useState({
    am: false,
    pm: false,
  });

  useEffect(() => {
    const amTimeList = timeList.filter((time) => time.alias.includes("오전"));

    const pmTimeList = timeList.filter((time) => time.alias.includes("오후"));

    const allSelectedAM = amTimeList.every((time) => time.selected);
    if (!allSelectedAM) {
      setSelectedAMPM((prev) => ({
        ...prev,
        am: false,
      }));
    } else {
      setSelectedAMPM((prev) => ({
        ...prev,
        am: true,
      }));
    }

    const allSelectedPM = pmTimeList.every((time) => time.selected);
    if (!allSelectedPM) {
      setSelectedAMPM((prev) => ({
        ...prev,
        pm: false,
      }));
    } else {
      setSelectedAMPM((prev) => ({
        ...prev,
        pm: true,
      }));
    }
  }, [timeList]);

  const handleClickItem = (value: number) => {
    setTimeList(
      timeList.map((time) => {
        if (time.id === value) {
          return {
            ...time,
            selected: !time.selected,
          };
        }
        return time;
      }),
    );
  };
  const handleClickAMPM = (condition: (item: CameraItem) => boolean) => {
    const filteredTimeList = timeList.filter(condition);

    if (filteredTimeList.length === 0) {
      return;
    }

    const allSelected = filteredTimeList.every((time) => time.selected);

    if (allSelected) {
      setTimeList(
        timeList.map((time) =>
          condition(time) ? { ...time, selected: false } : time,
        ),
      );
    } else {
      setTimeList(
        timeList.map((time) =>
          condition(time) ? { ...time, selected: true } : time,
        ),
      );
    }
  };

  const timeRender = () => {
    const render: JSX.Element[] = [];
    render.push(
      <TimeTabItem
        key={"오전전체"}
        alias="오전 전체"
        isSelected={selectedAMPM.am}
        onClick={() =>
          handleClickAMPM((item: CameraItem) => item.alias.includes("오전"))
        }
      />,
    );
    render.push(
      <TimeTabItem
        key={"오후전체"}
        alias="오후 전체"
        isSelected={selectedAMPM.pm}
        onClick={() =>
          handleClickAMPM((item: CameraItem) => item.alias.includes("오후"))
        }
      />,
    );
    timeList.map((item) => {
      render.push(
        <TimeTabItem
          key={item.id}
          alias={item.alias}
          isSelected={item.selected}
          onClick={() => handleClickItem(item.id)}
        />,
      );
    });

    return render;
  };

  return (
    <ScrollDiv
      enableScrollPadding={true}
      className="h(100%) p(15/23) vbox gap(10)"
    >
      {timeRender()}
    </ScrollDiv>
  );
};

export default TimeTab;
