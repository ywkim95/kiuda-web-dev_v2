// import { useGetFarmId } from "./useFarmLoader.tsx";
// import { useEffect, useState } from "react";
// import FarmModel from "../models/FarmModel.ts";
// import { useQueryClient } from "@tanstack/react-query";
//
// const useFarmData = () => {
//   const farmId = useGetFarmId();
//   const queryClient = useQueryClient();
//   const farm = queryClient.getQueryData<FarmModel>([
//     "farm",
//     farmId,
//   ]) as FarmModel;
//
//   const [farmData, setFarmData] = useState<FarmModel>(farm);
//
//   useEffect(() => {
//     const newFarm = queryClient.getQueryData<FarmModel>([
//       "farm",
//       farmId,
//     ]) as FarmModel;
//     if (newFarm !== farmData) {
//       console.log("farmData changed");
//       setFarmData(newFarm);
//     }
//   }, [farm, farmData, farmId, queryClient]);
//
//   return farmData;
// };
//
// export default useFarmData;
import { useGetFarmId } from "./useFarmLoader.tsx";
import { useEffect, useState } from "react";
import FarmModel from "../models/Farm/FarmModel.ts";
import { useQueryClient } from "@tanstack/react-query";

const useFarmData = () => {
  const farmId = useGetFarmId();
  const queryClient = useQueryClient();
  const [farmData, setFarmData] = useState<FarmModel | undefined>(() =>
    queryClient.getQueryData<FarmModel>(["farm", farmId]),
  );

  useEffect(() => {
    const handleDataChange = () => {
      const newFarm = queryClient.getQueryData<FarmModel>(["farm", farmId]);
      if (newFarm !== farmData) {
        setFarmData(newFarm);
      }
    };

    const unsubscribe = queryClient.getQueryCache().subscribe(handleDataChange);

    return () => {
      unsubscribe();
    };
  }, [farmId, queryClient]);

  return farmData;
};

export default useFarmData;
