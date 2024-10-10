import { useCallback, useEffect, useState } from "react";

import SelectItem from "./SelectItem.tsx";
import useCameraSearchStore from "../../../../../store/useCameraSearchStore.ts";

const CameraTab = () => {
  const { cameraList, setCameraList } = useCameraSearchStore();
  const [allSelect, setAllSelect] = useState(false);

  const onClickAll = () => {
    if (allSelect) {
      setAllSelect(false);
      allItemChange(false);
    } else if (!allSelect) {
      setAllSelect(true);
      allItemChange(true);
    }
  };

  useEffect(() => {
    for (let i = 0; i < cameraList.length; i++) {
      if (!cameraList[i].selected) {
        setAllSelect(false);
        return;
      }
    }
    setAllSelect(true);
  }, [cameraList]);

  const allItemChange = (is: boolean) => {
    const tempList = [...cameraList];
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].selected = is;
    }
    setCameraList(tempList);
  };

  const onClickItem = useCallback(
    (index: number) => {
      const tempList = [...cameraList];
      tempList[index].selected = !tempList[index].selected;
      setCameraList(tempList);
    },
    [cameraList, setCameraList],
  );

  const cameraRender = () => {
    const render = [];

    render.push(
      <SelectItem isSelected={allSelect} onClick={onClickAll} key="전체 선택">
        전체 선택
      </SelectItem>,
    );

    for (let i = 0; i < cameraList.length; i++) {
      render.push(
        <SelectItem
          key={cameraList[i].id}
          isSelected={cameraList[i].selected}
          onClick={() => onClickItem(i)}
        >
          {cameraList[i].alias}
        </SelectItem>,
      );
    }

    return render;
  };

  return (
    <div className="scroll-y h(100%) p(15/23) vbox gap(10) -webkit-scrollbar::w(8) -webkit-scrollbar-track::bg(--color-scrollbar) -webkit-scrollbar-thumb::b(2/--color-scrollbar)+r(10)+bg(--color-scrollbar-thumb) -webkit-scrollbar-button::vertical:end:increment:block+w(10)+bg(--color-scrollbar)">
      {cameraRender()}
    </div>
  );
};

export default CameraTab;
