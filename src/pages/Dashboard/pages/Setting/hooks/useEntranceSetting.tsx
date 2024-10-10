import { useEffect, useState } from "react";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { useMutation } from "@tanstack/react-query";
import { patchEntrances, queryClient } from "../../../../../http/http.ts";
import { cloneDeep } from "lodash";
import EntranceModel from "../../../../../models/Farm/EntranceModel.ts";

interface useEntranceSettingProps {
  farm: FarmModel;
}
const useEntranceSetting = ({ farm }: useEntranceSettingProps) => {
  const [entrances, setEntrances] = useState<EntranceModel[]>([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setEntrances(cloneDeep(farm.entrances));
  }, [farm]);

  useEffect(() => {
    setIsShow(!areEntrancesEqual(entrances, farm.entrances));
  }, [entrances, farm.entrances]);

  const { mutate } = useMutation({
    mutationFn: () => patchEntrances({ _id: farm.id, entrances }),
    onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey: ["farm", farm.id]});
      // queryClient.setQueryData(["farm", farm.id], (prevFarm) => {
      //   if (!prevFarm) {
      //     return prevFarm;
      //   }
      //   return {
      //     ...prevFarm,
      //     farm_entranceList: cloneDeep(entrances),
      //   };
      // });
      //
      // const updatedFarm = queryClient.getQueryData<FarmModel>([
      //   "farm",
      //   farm.id,
      // ]);
      // if (updatedFarm) {
      //   setEntrances(cloneDeep(updatedFarm.entrances));
      // }
    },
  });

  const handleSave = () => {
    if (isShow) {
      mutate();
    }
  };

  const handleRollback = () => {
    setEntrances(farm.entrances);
    setIsShow(false);
  };

  const areEntrancesEqual = (
    list1: EntranceModel[],
    list2: EntranceModel[],
  ) => {
    if (list1.length !== list2.length) {
      return false;
    }
    for (let i = 0; i < list1.length; i++) {
      if (
        list1[i].positionNumber !== list2[i].positionNumber ||
        list1[i].directionId !== list2[i].directionId
      ) {
        return false;
      }
    }
    return true;
  };

  return {
    isShow,
    setIsShow,
    entrances,
    setEntrances,
    handleSave,
    handleRollback,
  };
};

export default useEntranceSetting;
