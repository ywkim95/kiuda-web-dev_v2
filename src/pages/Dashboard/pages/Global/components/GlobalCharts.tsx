import Section from "../../../../../components/Section.tsx";
import DashboardCommonHeader from "../../../components/DashboardCommonHeader.tsx";
import DownloadIcon from "../../../../../components/svg/DownloadIcon.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import DetailChart from "../../../../Home/components/Sector/components/DetailChart.tsx";
import Layout from "../../../../../components/Layout.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { getGlobalSensorValueFromId } from "../../../../../http/http.ts";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import SensorModel from "../../../../../models/Sensor/SensorModel.ts";
import useDateHook from "../../../../../hooks/useDateHook.tsx";
import LoadingButton from "../../../../Loading/LoadingButton.tsx";
import {
    getChartData,
    getChartLabels,
    getDatasets,
    getUniqueSpecs,
} from "../../../../../util/ChartUtil.ts";
import { ChartDataset } from "chart.js";
import { oneHour } from "../../../../../constant/date.ts";

interface GlobalChartsProps {
    sensors: SensorModel[];
}

const GlobalCharts: FC<GlobalChartsProps> = ({ sensors }) => {
    const farmId = useGetFarmId();
    const [globalSensorIndex, setGlobalSensorIndex] = useState(0);
    const {
        searchTerm,
        CustomDateComponent,
        DropdownComponent,
        showCustomDate,
    } = useDateHook();

    const handlePrev = () => {
        setGlobalSensorIndex(
            (prev) => (prev - 1 + sensors.length) % sensors.length,
        );
    };

    const handleNext = () => {
        setGlobalSensorIndex((prev) => (prev + 1) % sensors.length);
    };

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
            sensors[globalSensorIndex].id,
            searchTerm,
        ],
        queryFn: ({ signal }) =>
            getGlobalSensorValueFromId({
                signal,
                _id: farmId,
                globalSensorId: sensors[globalSensorIndex].id,
                searchTerm,
            }),
        enabled:
            searchTerm.start !== "" && searchTerm.end !== "" && !showCustomDate,
        retry: 1,
        staleTime: oneHour,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });

    const globalSensor = sensors[globalSensorIndex];

    const chartData = getChartData(
        globalValues ?? [],
        globalSensor.id,
        searchTerm.start,
        searchTerm.end,
    );

    const uniqueSpecs = getUniqueSpecs(chartData ?? [], sensors);

    const labels = getChartLabels(chartData, searchTerm.start, searchTerm.end);

    const data = chartData.map((value) => value.value);

    const datasets: ChartDataset<"line", number[]>[] = getDatasets(
        uniqueSpecs,
        data,
        globalSensorIndex,
    );

    const handleDownload = () => {
        if (!globalValues) {
            return;
        }

        const title = `${globalSensor.sensorSpec.target}_data`;
        const head = `date, ${globalSensor.sensorSpec.target}(${globalSensor.sensorSpec.unit})\n`;
        const csv = globalValues
            .map((value) => {
                const date = new Date(value.time);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()},${value.value}`;
            })
            .join("\n");
        const csvData = head + csv;

        const element = document.createElement("a");

        element.href = URL.createObjectURL(
            new Blob([csvData], { type: "text/csv" }),
        );
        element.download = `${title}.csv`;

        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    let content;

    if (isPending) {
        content = (
            <div className="w(100%) h(fill) pack">
                <LoadingButton />
            </div>
        );
    }

    if (isError) {
        content = (
            <div className="w(100%) h(fill) pack">
                <h1>{error?.code}</h1>
                <p>{error?.message}</p>
            </div>
        );
    }

    if (globalValues) {
        // const datasets = [
        //   {
        //     label: "실내온도",
        //     data: globalValues.map((value) => value.value),
        //     fill: false,
        //     borderColor: "#149F48",
        //     tension: 0.4,
        //   },
        // ];
        content = (
            <>
                <DashboardCommonHeader
                    title={globalSensor.sensorSpec.target}
                    onClickNext={handleNext}
                    onClickPrev={handlePrev}
                    className="h(50) w(fill) gap(30) hbox text(pack)"
                >
                    <div className="absolute(~30,30) hbox(pack) gap(20)">
                        <DropdownComponent />
                        {showCustomDate && (
                            <div className="absolute(~40,55)">
                                <CustomDateComponent />
                            </div>
                        )}
                        <button onClick={handleDownload}>
                            <DownloadIcon />
                        </button>
                    </div>
                </DashboardCommonHeader>
                <div
                    data-testid="graph-section"
                    className={`bg(white) r(${BorderRadius.INPUT}) w(100%) h(705)`}
                >
                    <DetailChart
                        labels={labels}
                        datasets={datasets}
                        className={`w(fill) h(705) p(10/20) bg(white) r(${BorderRadius.INPUT})`}
                        align="start"
                    />
                </div>
            </>
        );
    }

    return (
        <Layout className="w(766) h(808)">
            <Section height="100%" className="p(30) vbox relative">
                {content}
            </Section>
        </Layout>
    );
};

export default GlobalCharts;
