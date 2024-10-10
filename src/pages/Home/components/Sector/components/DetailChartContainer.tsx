import { BorderRadius } from "../../../../../constant/border.ts";
import LoadingButton from "../../../../Loading/LoadingButton.tsx";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import DetailChart from "./DetailChart.tsx";
import useDateHook from "../../../../../hooks/useDateHook.tsx";
import { FC } from "react";
import useDetailChartArea from "../hooks/useDetailChartArea.tsx";
import ErrorComponent from "../../../../Error/ErrorComponent.tsx";

interface DetailChartContainerProps {
    sensorId: number;
    sectorId: number;
}

const DetailChartContainer: FC<DetailChartContainerProps> = ({
    sensorId,
    sectorId,
}) => {
    const {
        isSearch,
        searchTerm,
        showCustomDate,
        CustomDateComponent,
        ButtonsComponent,
    } = useDateHook();

    const farmId = useGetFarmId();

    const { labels, datasets, error, isError, isPending } = useDetailChartArea({
        farmId,
        sensorId,
        sectorId,
        isSearch,
        searchTerm,
        showCustomDate,
    });

    let content;

    if (isPending) {
        content = (
            <div className="w(100%) h(100%) pack">
                <LoadingButton />
            </div>
        );
    } else if (isError) {
        content = (
            <ErrorComponent className="w(100%) h(fill) pack" error={error} />
        );
    } else {
        content = (
            <DetailChart
                labels={labels}
                datasets={datasets}
                className="w(539) h(316) p(10/20)"
                align="end"
            />
        );
    }

    return (
        <>
            <ButtonsComponent />
            {showCustomDate && (
                <div className="absolute(20,~36) bg(white)">
                    <CustomDateComponent />
                </div>
            )}
            <div
                className={`bg(white) r(${BorderRadius.INPUT}) w(539) h(316) text(pack)`}
            >
                {content}
            </div>
        </>
    );
};

export default DetailChartContainer;
