import Layout from "../../../../../../components/Layout.tsx";
import { getFormattedKoreanDate } from "../../../../../../constant/date.ts";
import { FC, memo, useMemo, useState, useEffect } from "react";
import LoadingButton from "../../../../../Loading/LoadingButton.tsx";
import {
    getDatasets,
    getLabels,
    getTimes,
} from "../../../../../../util/DashboardUtils.ts";
import MixedSectorContainer from "./MixedSectorContainer.tsx";
import useDateHook from "../../../../../../hooks/useDateHook.tsx";
import MixedGraphArea from "./MixedGraphArea.tsx";
import useIndexStore from "../../../../../../store/useIndexStore.ts";
import useInitialDashboard from "../../hooks/useInitialDashboard.tsx";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import { ChartDataset } from "chart.js";

interface MixedDashboardProps {
    farm: FarmModel;
}

const MixedDashboard: FC<MixedDashboardProps> = memo(({ farm }) => {
    const { graphIndex, valueIndex } = useIndexStore();
    const {
        isSearch,
        searchTerm,
        CustomDateComponent,
        showCustomDate,
        DropdownComponent,
    } = useDateHook();

    const { isPending, isError, error, timeSeriesData, sensors, handleIndex } =
        useInitialDashboard({
            isSearch,
            searchTerm,
            farm,
            showCustomDate,
        });

    const sensorName = sensors[valueIndex].name ?? "";

    const [previousData, setPreviousData] = useState<{
        labels: string[];
        datasets: {
            sensorName: string;
            datasets: ChartDataset<"line", number[]>[];
        }[];
        sensorUnits: string[];
        values: number[];
        date: string;
    } | null>(null);

    useEffect(() => {
        if (timeSeriesData && timeSeriesData.length > 0) {
            const labels = getLabels(
                timeSeriesData,
                searchTerm.start,
                searchTerm.end,
            );
            const rawTimes = timeSeriesData.map((data) => data.time);
            const times = getTimes(rawTimes, searchTerm.start, searchTerm.end);
            const rawTime = times[graphIndex];
            const date = getFormattedKoreanDate(rawTime);
            const { datasets, sensorUnits } = getDatasets(
                timeSeriesData,
                farm,
                searchTerm.start,
                searchTerm.end,
            );

            let values: number[] = [];
            try {
                values = datasets[valueIndex].datasets
                    .map((value) => value.data[graphIndex])
                    .filter((value) => value !== undefined);
            } catch (e) {
                console.error("Error processing values: ", e);
            }

            setPreviousData({ labels, datasets, sensorUnits, values, date });
        }
    }, [timeSeriesData, searchTerm, graphIndex, farm, valueIndex]);

    const content = useMemo(() => {
        if (isPending && !previousData) {
            return (
                <Layout className="w(100%) h(903) pack">
                    <LoadingButton />
                </Layout>
            );
        }

        if (isError && !previousData) {
            return (
                <Layout className="w(100%) h(100%) pack">
                    <h1>{error?.code}</h1>
                    <p>{error?.message}</p>
                </Layout>
            );
        }

        if (previousData) {
            const { labels, datasets, sensorUnits, values, date } =
                previousData;

            return (
                <>
                    <Layout className="h(100%) w(454)">
                        <MixedSectorContainer
                            farm={farm}
                            values={values}
                            unit={sensorUnits[valueIndex]}
                            date={date}
                        />
                    </Layout>
                    <Layout className="h(100%) w(735)">
                        <MixedGraphArea
                            handleIndex={handleIndex}
                            valueIndex={valueIndex}
                            labels={labels}
                            datasets={datasets[valueIndex].datasets}
                            sensorName={`${sensorName} (${sensorUnits[valueIndex]})`}
                        >
                            <DropdownComponent />
                            {showCustomDate && (
                                <div className="absolute(~0,50) bg(white)">
                                    <CustomDateComponent />
                                </div>
                            )}
                        </MixedGraphArea>
                    </Layout>
                </>
            );
        }

        return null;
    }, [
        CustomDateComponent,
        DropdownComponent,
        error,
        farm,
        graphIndex,
        handleIndex,
        isError,
        isPending,
        sensorName,
        showCustomDate,
        previousData,
        valueIndex,
    ]);

    return <div className="hbox w(100%) h(fill) gap(51)">{content}</div>;
});

export default MixedDashboard;
