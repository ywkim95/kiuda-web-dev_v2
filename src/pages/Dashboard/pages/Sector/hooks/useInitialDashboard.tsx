import { getSensorValueFromSpec } from "../../../../../http/http.ts";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { useCallback, useEffect, useMemo } from "react";
import { DateType } from "../../../../../constant/type.ts";
import useIndexStore from "../../../../../store/useIndexStore.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SpecModel from "../../../../../models/Sensor/SpecModel.ts";
import { oneHour } from "../../../../../constant/date.ts";
import useQueryKeyStore from "../../../../../store/useQueryKeyStore.ts";

interface InitialDashboardProps {
    isSearch: boolean;
    searchTerm: DateType;
    farm: FarmModel;
    showCustomDate: boolean;
}

const useInitialDashboard = ({
    searchTerm,
    isSearch,
    farm,
    showCustomDate,
}: InitialDashboardProps) => {
    const { setValueIndex, valueIndex } = useIndexStore();
    const { setQueryKey } = useQueryKeyStore();

    const specs = useMemo(() => {
        const sensorSpecs = farm.sectors.flatMap((sector) =>
            sector.sensors.map((sensor) => sensor.sensorSpec),
        );
        const map = new Map<number, SpecModel>();
        sensorSpecs.forEach((spec) => {
            map.set(spec.id, spec);
        });
        return Array.from(map.values());
    }, [farm]);

    const sensorSpecId = specs[valueIndex]?.id;

    const {
        data: timeSeriesData,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["farm", farm.id, "spec", sensorSpecId, searchTerm],
        queryFn: ({ signal }) =>
            getSensorValueFromSpec({
                signal,
                _id: farm.id,
                sensorSpecId,
                searchTerm,
            }),
        enabled: isSearch && !showCustomDate,
        retry: 1,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: oneHour,
    });

    const handleIndex = useCallback(
        (i: number) => {
            if (!specs.length) {
                return;
            }

            const newIndex = (i + specs.length) % specs.length;
            setValueIndex(newIndex);
        },
        [specs.length, setValueIndex],
    );

    useEffect(() => {
        if (isSearch) {
            console.log(["farm", farm.id, "spec", sensorSpecId, searchTerm]);
            setQueryKey(
                JSON.stringify([
                    "farm",
                    farm.id,
                    "spec",
                    sensorSpecId,
                    searchTerm,
                ]),
            );
        }
    }, [isSearch, farm, sensorSpecId, searchTerm]);

    return {
        farm,
        timeSeriesData,
        isPending,
        isError,
        error,
        sensors: specs,
        handleIndex,
    };
};

export default useInitialDashboard;
