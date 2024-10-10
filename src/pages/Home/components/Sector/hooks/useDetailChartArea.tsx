import { useMemo } from "react";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { ChartDataset } from "chart.js";
import {
    getSensorValueFromSector,
    queryClient,
} from "../../../../../http/http.ts";
import { DateType } from "../../../../../constant/type.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SpecModel from "../../../../../models/Sensor/SpecModel.ts";
import {
    averageData,
    convertKSTToUTC,
    fourHours,
    oneDay,
    oneHour,
    oneWeek,
} from "../../../../../constant/date.ts";

interface DetailChartAreaProps {
    farmId: number;
    sectorId: number;
    sensorId: number;
    isSearch: boolean;
    searchTerm: DateType;
    showCustomDate: boolean;
}

const useDetailChartArea = ({
    farmId,
    sectorId,
    sensorId,
    isSearch,
    searchTerm,
    showCustomDate,
}: DetailChartAreaProps) => {
    // const { timeSeriesData, isPending, isError, error } = useTimeSeriesQuery({
    //   farmId,
    //   isSearch,
    //   searchTerm,
    // });
    const {
        data: timeSeriesData,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["farm", farmId, "sector", sectorId, searchTerm],
        queryFn: ({ signal }) =>
            getSensorValueFromSector({
                signal,
                _id: farmId,
                searchTerm,
                sectorId,
            }),
        enabled: isSearch && !showCustomDate,
        retry: 1,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: oneHour,
    });

    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;

    const chartData = useMemo(() => {
        if (!timeSeriesData) {
            return [];
        }

        const filteredData = timeSeriesData
            .filter((value) => value.id === sensorId)
            .sort((a, b) => {
                const dateA = new Date(a.time);
                const dateB = new Date(b.time);
                return dateA.getTime() - dateB.getTime();
            });

        const start = convertKSTToUTC(searchTerm.start).getTime();
        const end = convertKSTToUTC(searchTerm.end).getTime();

        if (end - start <= oneDay) {
            return filteredData;
        } else if (end - start <= oneWeek) {
            return averageData(filteredData, fourHours);
        } else {
            return averageData(filteredData, oneDay);
        }
    }, [sensorId, timeSeriesData]);

    const label = useMemo(() => {
        if (chartData.length === 0) {
            return undefined;
        }

        return new Set(
            farm.sectors
                .map(
                    (value) =>
                        value.sensors.find(
                            (sensor) => sensor.id === chartData[0].id,
                        )?.sensorSpec,
                )
                .filter((value) => value !== undefined)
                .sort((a, b) => a!.id - b!.id),
        )
            .values()
            .next().value as SpecModel;
    }, [chartData, farm.sectors]);

    const labels = useMemo(() => {
        if (!chartData) {
            return [];
        }

        return chartData.map((value, index, array) => {
            const date = convertKSTToUTC(value.time);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();

            const start = convertKSTToUTC(searchTerm.start).getTime();
            const end = convertKSTToUTC(searchTerm.end).getTime();

            if (index === 0) {
                if (end - start <= oneWeek) {
                    return `${month.toDatePad()}월 ${day.toDatePad()}일 ${hour.toDatePad()}시`;
                } else {
                    return `${month.toDatePad()}월 ${day.toDatePad()}일`;
                }
            }

            const prevDate = convertKSTToUTC(array[index - 1].time);
            const prevMonth = prevDate.getMonth() + 1;
            const prevDay = prevDate.getDate();

            if (end - start <= oneDay) {
                if (day !== prevDay) {
                    return `${month.toDatePad()}월 ${day.toDatePad()}일 ${hour.toDatePad()}시`;
                } else {
                    return `${hour.toDatePad()}시`;
                }
            } else if (end - start <= oneWeek) {
                if (day !== prevDay) {
                    return `${month.toDatePad()}월 ${day.toDatePad()}일 ${hour.toDatePad()}시`;
                } else {
                    return `${day.toDatePad()}일 ${hour.toDatePad()}시`;
                }
            } else {
                if (month !== prevMonth) {
                    return `${month.toDatePad()}월 ${day.toDatePad()}일`;
                } else {
                    return `${day.toDatePad()}일`;
                }
            }
        });
    }, [chartData]);

    const data = useMemo(
        () => chartData?.map((value) => value.value),
        [chartData],
    );

    const datasets: ChartDataset<"line", number[]>[] = useMemo(() => {
        if (!label) {
            return [];
        }

        return [
            {
                label: `${label.name}(${label.unit})`,
                data: data!,
                fill: false,
                pointRadius: 0.5,
                backgroundColor: "rgba(20, 159, 72, 0.6)",
                borderColor: "rgba(20, 159, 72, 0.6)",
                tension: 0.3,
            },
        ];
    }, [data, label]);

    return {
        labels,
        datasets,
        isPending,
        isError,
        error,
    };
};

export default useDetailChartArea;
