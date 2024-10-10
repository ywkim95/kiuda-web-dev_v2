import useCameraSearchStore from "../../../store/useCameraSearchStore.ts";
import { useGetFarmId } from "../../../hooks/useFarmLoader.tsx";
import { cameraSearchType, imageCount } from "../../../http/httpType.ts";
import { oneHour, searchDateRange } from "../../../constant/date.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getImages } from "../../../http/http.ts";

const useImagePagination = (page: number) => {
    const { cameraList, dateRangeList, timeList } = useCameraSearchStore();
    const farmId = useGetFarmId();
    const searchTerm: cameraSearchType = {
        cameraIds:
            cameraList
                .filter((camera) => camera.selected)
                .map((camera) => camera.id) ?? [],
        dateRanges: dateRangeList.map((date) => {
            return searchDateRange(date.start, date.end);
        }),
        times:
            timeList
                .filter((time) => time.selected)
                .map((time) => Number(`${time.id}00`)) ?? [],
        pageIndex: page,
        pageCount: imageCount,
    };

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["farm", farmId, "Images", { page }],
        queryFn: ({ signal }) =>
            getImages({
                signal,
                _id: farmId,
                searchTerm,
            }),
        retry: 1,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: oneHour,
    });
    return {
        data,
        isPending,
        isError,
        error,
    };
};

export default useImagePagination;
