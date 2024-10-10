import { useCallback, useEffect, useMemo, useState } from "react";
import useModalStore from "../../../../../store/useModalStore.ts";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import { queryClient } from "../../../../../http/http.ts";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import {
    alarmCount,
    alarmSearchType,
    globalAlarmSearchType,
} from "../../../../../http/httpType.ts";
import { getFormattedDate } from "../../../../../constant/date.ts";
import {
    AlarmType,
    dateOptionsType,
    listType,
} from "../../../../../constant/type.ts";

const useAlarmModal = ({
    selectedOption,
    alarmType,
}: {
    selectedOption: dateOptionsType;
    alarmType: "sector" | "global";
}) => {
    const [page, setPage] = useState(0);
    const { setModal } = useModalStore();
    const farmId = useGetFarmId();
    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;

    const createCheckboxList = useCallback(
        (items: { name: string; value: number }[]) =>
            items.map((value) => ({ ...value, checked: false })),
        [],
    );

    const alarmTypeArray = useMemo(
        () =>
            Object.entries(AlarmType)
                .filter(([_, value]) => !isNaN(Number(value)))
                .map(([key, value]) => ({
                    name: key,
                    value: Number(value),
                })),
        [],
    );

    const alarmList = useMemo(
        () => createCheckboxList(alarmTypeArray),
        [alarmTypeArray, createCheckboxList],
    );

    const [alarmTypeList, setAlarmTypeList] = useState<listType[]>(alarmList);
    const [sensorTypeList, setSensorTypeList] = useState<listType[]>([]);
    const [sectorList, setSectorList] = useState<listType[]>([]);
    const [globalSensorList, setGlobalSensorList] = useState<listType[]>([]);
    /**
     * selectedOption가 변경되면 api 콜을 한다.
     * selectedOption
     */

    const handleCloseModal = useCallback(() => setModal(undefined), [setModal]);

    useEffect(() => {
        setPage(0);
    }, [selectedOption]);

    const changeChecked = useCallback((list: listType[], item: number) => {
        return list.map((value) => ({
            ...value,
            checked: value.value === item ? !value.checked : value.checked,
        }));
    }, []);

    const handleItem = useCallback(
        (type: "alarm" | "sensor" | "sector", item: number) => {
            if (type === "alarm") {
                setAlarmTypeList((prev) => changeChecked(prev, item));
            } else if (type === "sensor") {
                setSensorTypeList((prev) => changeChecked(prev, item));
            } else if (type === "sector") {
                setSectorList((prev) => changeChecked(prev, item));
            }
            setPage(0);
        },
        [changeChecked],
    );

    const handleGlobalItem = useCallback((item: number) => {
        setGlobalSensorList((prev) => changeChecked(prev, item));
    }, []);

    useEffect(() => {
        if (farm) {
            const sensorList = createCheckboxList(
                farm.sectors[0].sensors.map((sensor) => ({
                    name: sensor.sensorSpec.name,
                    value: sensor.sensorSpec.id,
                })),
            );

            setSensorTypeList(sensorList);
            const sectors = createCheckboxList(
                farm.sectors.map((sector) => ({
                    name: sector.alias ?? `${sector.row}-${sector.col}`,
                    value: sector.id,
                })),
            );
            setSectorList(sectors);

            const globalSensorList = createCheckboxList(
                farm.globalSensors.map((sensor) => ({
                    name: sensor.sensorSpec.target,
                    value: sensor.sensorSpec.id,
                })),
            );
            setGlobalSensorList(globalSensorList);
        }
    }, [farm, createCheckboxList]);

    const getParams = useCallback(():
        | alarmSearchType
        | globalAlarmSearchType => {
        if (!selectedOption || !selectedOption.func) {
            console.error("selectedOption or selectedOption.func is undefined");
            const defaultType = {
                orderAsc: false,
                pageIndex: 0,
                pageCount: alarmCount,
                start: "",
                end: "",
            };
            if (alarmType === "global") {
                return {
                    ...defaultType,
                    alarmLevels: [],
                    globalSensorIds: [],
                };
            } else {
                return {
                    ...defaultType,
                    alarmLevels: [],
                    sensorSpecIds: [],
                    sectorIds: [],
                };
            }
        }

        const selectedDate = selectedOption.func();
        const selectedAlarmTypes = alarmTypeList
            .filter((v) => v.checked)
            .map((v) => v.value);

        const defaultValue = {
            orderAsc: false,
            pageIndex: page,
            pageCount: alarmCount,
            start:
                typeof selectedDate === "string"
                    ? selectedDate
                    : selectedDate.start,
            end:
                typeof selectedDate === "string"
                    ? getFormattedDate(new Date())
                    : selectedDate.end,
        };
        if (alarmType === "sector") {
            const selectedSensorTypes = sensorTypeList
                .filter((v) => v.checked)
                .map((v) => v.value);

            const selectedSectorNames = sectorList
                .filter((v) => v.checked)
                .map((v) => v.value);

            return {
                ...defaultValue,
                alarmLevels:
                    selectedAlarmTypes.length !== 0 ? selectedAlarmTypes : [],
                sensorSpecIds:
                    selectedSensorTypes.length !== 0 ? selectedSensorTypes : [],
                sectorIds:
                    selectedSectorNames.length !== 0 ? selectedSectorNames : [],
            };
        } else {
            const selectedGlobalSensorTypes = globalSensorList
                .filter((v) => v.checked)
                .map((v) => v.value);
            return {
                ...defaultValue,
                alarmLevels:
                    selectedAlarmTypes.length !== 0 ? selectedAlarmTypes : [],
                globalSensorIds:
                    selectedGlobalSensorTypes.length !== 0
                        ? selectedGlobalSensorTypes
                        : [],
            };
        }
    }, [selectedOption, alarmTypeList, sensorTypeList, sectorList, page]);

    return {
        alarmTypeList,
        sensorTypeList,
        sectorList,
        globalSensorList,
        page,
        setPage,
        handleCloseModal,
        handleItem,
        handleGlobalItem,
        getParams,
    };
};

export default useAlarmModal;
