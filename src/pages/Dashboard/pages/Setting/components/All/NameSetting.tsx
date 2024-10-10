import SettingHeader from "../SettingHeader.tsx";
import Section from "../../../../../../components/Section.tsx";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import SectorSettingBaseArea from "./SectorSettingBaseArea.tsx";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sectorType } from "../../../../../../http/httpType.ts";
import { patchSectorsAlias, queryClient } from "../../../../../../http/http.ts";
import NameSector from "./NameSector.tsx";
import useFarmData from "../../../../../../hooks/useFarmData.tsx";
import SectorModel from "../../../../../../models/Sector/SectorModel.ts";

const NameSetting = () => {
  const farm = useFarmData() as FarmModel;
  // 실제 데이터 매핑
  const [items, setItems] = useState<SectorModel[]>([]);
  // 리셋키 - optional
  const [resetKey, setResetKey] = useState<number[]>([]);
  // 전체 저장, 되돌리기 버튼 표기 유무 상태 값
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (farm) {
      setItems(farm.sectors);
      setResetKey(
        Array.from(
          { length: farm.sectorRow * farm.sectorCol },
          () => parseFloat((Math.random() * 10000).toFixed(5)),
        ),
      );
    }
  }, [farm]);

  useEffect(() => {
    const show =
      items.length === farm.sectors.length &&
      items.every((item, index) => {
        const sector = farm.sectors[index];
        return sector.id === item.id && sector.alias === item.alias;
      });

    setIsShow(!show);
  }, [items, farm.sectors]);

  const { mutateAsync } = useMutation({
    mutationFn: ({ sectors }: { sectors: sectorType[] }) =>
      patchSectorsAlias({ sectors, _id: farm!.id }),
    onSuccess: async () => {
      // const { sectors: varSectors } = variables;
      //
      // updateSectorAlias(farm.id, varSectors);
      //
      // setItems((prevState) => {
      //   return prevState.map((item) => {
      //     const sector = varSectors.find(
      //       (sector) => sector.id === item.id,
      //     );
      //     if (sector) {
      //       return {
      //         ...item,
      //         alias: sector.alias,
      //       };
      //     } else {
      //       return item;
      //     }
      //   });
      // });
        await queryClient.invalidateQueries({queryKey: ["farm", farm.id]});
    },
  });

  const handleSave = async () => {
    const sector = items
      .map((item) => ({
        id: item.id,
        alias: item.alias,
      }))
      .filter((item) => item.alias !== null).filter((item,index) => item.alias !== farm.sectors[index].alias) as sectorType[];

    await mutateAsync({ sectors: sector });
  };

  const handleRollback = () => {
    setItems(farm.sectors);
    setResetKey((prevKeys) => {
      return prevKeys.map((key) => key + 1);
    });
  };

  const sectorMap = useMemo(() => {
    const map = new Map();
    farm.sectors.forEach((item) => {
      const key = `${item.row+1}-${item.col+1}`;
      map.set(key, item);
    });
    return map;
  }, [farm.sectors]);

  const sectors = useMemo(() => {
    const sectorElements = [];
    if (resetKey.length > 0) {
      for (let row = 0; row < farm.sectorRow; row++) {
        for (let col = 0; col < farm.sectorCol; col++) {
          const key = `${row + 1}-${col + 1}`;
          const item = sectorMap.get(key);
          const itemKey = resetKey[(col) + (row) * farm.sectorRow];
          sectorElements.push(
            item ? (
              <NameSector
                key={itemKey}
                farmSector={item}
                setSectorList={setItems}
              />
            ) : (
              <div key={itemKey}></div>
            ),
          );
        }
      }
      return sectorElements;
    }
  }, [farm, sectorMap, resetKey]);

  return (
    <Section className="w(608) h(355)">
      <SettingHeader
        title="구역 이름"
        onSave={handleSave}
        onRollback={handleRollback}
        isShow={isShow}
      />
      <SectorSettingBaseArea
        row={farm.sectorRow}
        col={farm.sectorCol}
        entrances={farm.entrances}
        isSetting={false}
      >
        {sectors}
      </SectorSettingBaseArea>
    </Section>
  );
};

export default NameSetting;

// const updateSectorAlias = (farmId: number, newSectorTypeList: sectorType[]) => {
//   queryClient.setQueryData<FarmModel>(["farm", farmId], (prevFarm) => {
//     if (!prevFarm) {
//       return prevFarm;
//     }
//     return {
//       ...prevFarm,
//       farmInfo: {
//         ...prevFarm,
//         sectors: prevFarm.sectors.map((sector) => {
//           const matchedSector = newSectorTypeList.find(
//             (newSector) => newSector.id === sector.id,
//           );
//           if (matchedSector) {
//             return {
//               ...sector,
//               alias: matchedSector.alias,
//             };
//           } else {
//             return sector;
//           }
//         }),
//       },
//     };
//   });
// };
