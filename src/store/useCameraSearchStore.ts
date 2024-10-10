import { create, StateCreator } from "zustand";
import { CameraItem } from "../constant/type.ts";
import { defaultSearchType } from "../http/httpType.ts";

interface State {
    cameraList: CameraItem[];
    dateRangeList: defaultSearchType[];
    timeList: CameraItem[];
    page: number;
}

interface Action {
    setCameraList: (cameras: CameraItem[]) => void;
    setDateRangeList: (dateRanges: defaultSearchType[]) => void;
    setTimeList: (times: CameraItem[]) => void;
    setPage: (page: number) => void;
}

type useCameraSearchStoreProps = State & Action;

const times = () => {
    const timeList: CameraItem[] = [];
    for (let i = 0; i < 24; i++) {
        if (i < 12) {
            timeList.push({
                id: i,
                alias: `오전 ${i.toString().padStart(2, "0")}시`,
                selected: false,
            });
        } else {
            timeList.push({
                id: i,
                alias: `오후 ${i.toString().padStart(2, "0")}시`,
                selected: false,
            });
        }
    }
    return timeList;
};

const useCameraSearchCreator: StateCreator<useCameraSearchStoreProps> = (
    set,
) => ({
    cameraList: [],
    dateRangeList: [],
    timeList: times(),
    page: 0,
    setCameraList: (cameras: CameraItem[]) => set({ cameraList: cameras }),
    setDateRangeList: (dateRangeList: defaultSearchType[]) =>
        set({ dateRangeList }),
    setTimeList: (times: CameraItem[]) => set({ timeList: times }),
    setPage: (page: number) => set({ page }),
});

const useCameraSearchStore = create(useCameraSearchCreator);

export default useCameraSearchStore;
