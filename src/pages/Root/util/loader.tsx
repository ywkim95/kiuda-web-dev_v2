import {defer} from "react-router-dom";
import { getFarmList, queryClient } from "../../../http/http.ts";
import { RootLoaderData } from "../../../constant/type.ts";
// import {fourHours} from "../../../constant/date.ts";
const loadFarms = async () => {
    return await queryClient.ensureQueryData({
        queryKey: ["user"],
        queryFn: ({ signal }) => getFarmList({ signal }),
        staleTime: Infinity,
        gcTime: Infinity,
        retry: 1,
    });
};

export const loader = async () => {
  
  // TODO: 유저 정보 및 농장 리스트 가져오기
  const loadFarm = await loadFarms();
  
  const farms: RootLoaderData = {
    farms: loadFarm,
  };

  return defer({
    ...farms,
  });
};
