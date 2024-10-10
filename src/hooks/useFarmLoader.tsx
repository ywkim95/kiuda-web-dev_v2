// import { useRouteLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFarmDetail, queryClient } from "../http/http.ts";
// import { RootLoaderData } from "../constant/type.ts";
import { oneHour } from "../constant/date.ts";
import UserModel from "../models/User/UserModel.ts";
import { dateSort, idSort } from "../util/Util.ts";

export const useGetFarmId = () => {
    // const { farms } = useRouteLoaderData("root") as RootLoaderData;
    const farms = queryClient.getQueryData(["user"]) as UserModel;

    let farmIndex = localStorage.getItem("farmIndex") ?? "0";
    localStorage.setItem("farmIndex", farmIndex);
    let farmIndexNumber = Number.parseInt(farmIndex);

    // farmIndexNumber 유효성 검사 및 기본값 설정
    if (
        isNaN(farmIndexNumber) ||
        farmIndexNumber < 0 ||
        farmIndexNumber >= farms.farmList.length
    ) {
        window.alert(
            `잘못된 인덱스 값 입니다. 현재 인덱스 값: ${farmIndex}. \n 값을 초기화 하였습니다.`,
        );
        farmIndex = "0";
        localStorage.setItem("farmIndex", farmIndex);
        farmIndexNumber = Number.parseInt(farmIndex);
    }

    return farms.farmList[farmIndexNumber].farmId;
};

const useFarmLoader = () => {
    const farmId = useGetFarmId();
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["farm", farmId],
        queryFn: ({ signal }) => getFarmDetail({ signal, _id: farmId }),
        retry: 1,
        gcTime: 1000 * 60 * 60,
        staleTime: oneHour,
        enabled: farmId !== undefined,
        refetchOnWindowFocus: false,
        select: (data) => {
            const sectors = idSort(data.sectors);
            const globalSensors = idSort(data.globalSensors);
            const images = idSort(
                data.images.map((image) => ({ ...image, id: image.cameraId })),
            );
            const cameras = idSort(data.cameras);
            const sectorAlarms = dateSort(data.sectorAlarms);
            const globalAlarms = dateSort(data.globalAlarms);
            return {
                ...data,
                sectors,
                globalSensors,
                images,
                cameras,
                sectorAlarms,
                globalAlarms,
            };
        },
    });

    return {
        data,
        isPending,
        isError,
        error,
    };
};

export default useFarmLoader;
