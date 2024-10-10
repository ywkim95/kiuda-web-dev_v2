import DetailChart from "../../Sector/components/DetailChart.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import { ChartDataset } from "chart.js";
import useDateHook from "../../../../../hooks/useDateHook.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import {
    getGlobalSensorValueFromId,
    queryClient,
} from "../../../../../http/http.ts";
import { FC, useEffect, useState } from "react";
import LoadingButton from "../../../../Loading/LoadingButton.tsx";
import P from "../../../../../components/P.tsx";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { fontWeight } from "../../../../../constant/font.ts";
import RightCarrotArrowIcon from "../../../../../components/svg/RightCarrotArrowIcon.tsx";
import LeftCarrotArrowIcon from "../../../../../components/svg/LeftCarrotArrowIcon.tsx";
import {
    getChartData,
    getChartLabels,
    getDatasets,
    getUniqueSpecs,
} from "../../../../../util/ChartUtil.ts";
import SensorModel from "../../../../../models/Sensor/SensorModel.ts";
import ErrorComponent from "../../../../Error/ErrorComponent.tsx";
import ValueModel from "../../../../../models/Sensor/ValueModel.ts";
import { oneHour } from "../../../../../constant/date.ts";

interface IntegratedChartProps {
    sensors: SensorModel[];
    btnIndex: number;
    isSoil: boolean;
}

const IntegratedChart: FC<IntegratedChartProps> = ({
    sensors,
    btnIndex,
    isSoil,
}) => {
    const [globalSensorIndex, setGlobalSensorIndex] = useState(0);
    const {
        ButtonsComponent,
        showCustomDate,
        CustomDateComponent,
        searchTerm,
    } = useDateHook();

    const farmId = useGetFarmId();
    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;
    const initIndex =
        globalSensorIndex >= sensors.length ? 0 : globalSensorIndex;

    useEffect(() => {
        if (globalSensorIndex >= sensors.length) {
            setGlobalSensorIndex(0);
        }
    }, [globalSensorIndex, sensors]);

    const {
        data: globalValues,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: [
            "farm",
            farmId,
            "globalValue",
            sensors[initIndex].id,
            searchTerm,
        ],
        queryFn: ({ signal }) =>
            getGlobalSensorValueFromId({
                signal,
                _id: farmId,
                globalSensorId: sensors[initIndex].id,
                searchTerm,
            }),
        enabled:
            btnIndex === 1 &&
            searchTerm.start !== "" &&
            searchTerm.end !== "" &&
            !showCustomDate,
        retry: 1,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: oneHour,
    });

    const handleNext = () => {
        setGlobalSensorIndex((prev) => {
            return prev === sensors.length - 1 ? 0 : prev + 1;
        });
    };

    const handlePrev = () => {
        setGlobalSensorIndex((prev) => {
            return prev === 0 ? sensors.length - 1 : prev - 1;
        });
    };

    const globalSensor = sensors[initIndex];

    let content;

    if (isPending) {
        content = (
            <div className="w(100%) h(244) vbox pack gap(10)">
                <LoadingButton height="40" width="40" />
                <P>데이터를 불러오는 중입니다...</P>
            </div>
        );
    }

    if (isError) {
        content = (
            <ErrorComponent
                className="w(100%) h(244) vbox pack gap(10)"
                error={error}
            />
        );
    }

    if (globalValues && globalValues.length > 0) {
        let chartData: ValueModel[];

        if (globalValues[0].id !== sensors[initIndex].id) {
            chartData = getChartData(
                globalValues,
                globalValues[0].id,
                searchTerm.start,
                searchTerm.end,
            );
        } else {
            chartData = getChartData(
                globalValues,
                globalSensor.id,
                searchTerm.start,
                searchTerm.end,
            );
        }

        const uniqueSpecs = getUniqueSpecs(chartData ?? [], farm.globalSensors);

        const labels = getChartLabels(
            chartData ?? [],
            searchTerm.start,
            searchTerm.end,
        );

        const data = chartData?.map((value) => value.value) ?? [];

        const index = isSoil ? globalSensorIndex + 4 : globalSensorIndex;

        const datasets: ChartDataset<"line", number[]>[] = getDatasets(
            uniqueSpecs,
            data,
            index,
        );

        content = (
            <>
                <DetailChart
                    labels={labels}
                    datasets={datasets}
                    className={`w(fill) h(244) p(10/20) bg(white) r(${BorderRadius.INPUT})`}
                    align="end"
                />
                <div className="absolute(150,10) hbox gap(8) text(pack)">
                    <button onClick={handlePrev} className="pack">
                        <LeftCarrotArrowIcon />
                    </button>
                    <P
                        fontWeight={fontWeight.BOLD}
                        className="user-select-none w(100)"
                    >
                        {globalSensor?.sensorSpec.target}
                    </P>
                    <button onClick={handleNext} className="pack">
                        <RightCarrotArrowIcon />
                    </button>
                </div>
                <ButtonsComponent className="w(110)" />
                {showCustomDate && (
                    <div className="absolute(~0,~42) bg(white)">
                        <CustomDateComponent />
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="hbox w(100%) h(fill) gap(15) relative">{content}</div>
    );
};

export default IntegratedChart;
