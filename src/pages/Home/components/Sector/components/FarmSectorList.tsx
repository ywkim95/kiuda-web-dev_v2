import { BorderRadius } from "../../../../../constant/border.ts";
import FarmSector from "./FarmSector.tsx";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import { useQueryClient } from "@tanstack/react-query";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { FC } from "react";

interface FarmSectorListProps {
  setDetail?: (id: number) => void;
}

const FarmSectorList: FC<FarmSectorListProps> = ({ setDetail }) => {
  const farmId = useGetFarmId();
  const queryClient = useQueryClient();
  const farm = queryClient.getQueryData<FarmModel>([
    "farm",
    farmId,
  ]) as FarmModel;

  const sectorMap = new Map<string, FarmModel["sectors"][0]>();

  farm.sectors.sort((a,b) => a.id - b.id).forEach((item) => sectorMap.set(`${item.row}-${item.col}`, item));

  const sectors = [];
  

  for (let row = 0; row < farm.sectorRow; row++) {
    for (let col = 0; col < farm.sectorCol; col++) {
      const key = `${row}-${col}`;
      const item = sectorMap.get(key);

      sectors.push(
        item ? (
          <FarmSector
            key={key}
            farmSector={item}
            onClick={setDetail ? () => setDetail(item.id) : undefined}
          />
        ) : (
          <div key={key}></div>
        ),
      );
    }
  }

  return (
    <div
      className={`w(100%) h(fill) bg(white) gap(8) p(8) r(${BorderRadius.MAIN}) grid(${farm.sectorCol})`}
    >
      {sectors}
    </div>
  );
};

export default FarmSectorList;
