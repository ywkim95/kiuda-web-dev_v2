import Section from "../../../../../../components/Section.tsx";
import Layout from "../../../../../../components/Layout.tsx";
import { BorderRadius } from "../../../../../../constant/border.ts";
import DashboardCommonHeader from "../../../../components/DashboardCommonHeader.tsx";
import P from "../../../../../../components/P.tsx";
import useModalStore from "../../../../../../store/useModalStore.ts";
import ModalType from "../../../../../../components/Modal/ModalType.ts";
import useDateHook from "../../../../../../hooks/useDateHook.tsx";
import LoadingButton from "../../../../../Loading/LoadingButton.tsx";
import DetailChart from "../../../../../Home/components/Sector/components/DetailChart.tsx";
import {
    getDatasets,
    getLabels,
} from "../../../../../../util/DashboardUtils.ts";
import useIndexStore from "../../../../../../store/useIndexStore.ts";
import { FC, useCallback, useEffect } from "react";
import useShowSectorStore from "../../../../../../store/useShowSectorStore.ts";
import useInitialDashboard from "../../hooks/useInitialDashboard.tsx";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";

interface GraphDashboardProps {
    farm: FarmModel;
}

const GraphDashboard: FC<GraphDashboardProps> = ({ farm }) => {
    const { list, setList } = useShowSectorStore();
    const { valueIndex } = useIndexStore();
    const { setModal } = useModalStore();
    const {
        DropdownComponent,
        showCustomDate,
        CustomDateComponent,
        searchTerm,
        isSearch,
    } = useDateHook();

    const { isPending, isError, error, timeSeriesData, handleIndex } =
        useInitialDashboard({
            isSearch,
            searchTerm,
            farm,
            showCustomDate,
        });

    const handleModal = useCallback(() => {
        setModal(ModalType.SectorSetting);
    }, [setModal]);

    useEffect(() => {
        const newShowGraph = farm.sectors.map((data) => ({
            id: data.id,
            show: true,
        }));

        setList(newShowGraph);
    }, [farm, setList]);

    const getContent = useCallback(() => {
        if (isPending) {
            return (
                <div className="h(668) w(100%) bg(white) pack">
                    <LoadingButton />
                </div>
            );
        }

        if (isError) {
            return (
                <Layout className="w(100%) h(100%) pack">
                    <h1>{error?.code}</h1>
                    <p>{error?.message}</p>
                </Layout>
            );
        }

        if (timeSeriesData) {
            const labels = getLabels(
                timeSeriesData,
                searchTerm.start,
                searchTerm.end,
            );
            const { datasets, sensorUnits } = getDatasets(
                timeSeriesData,
                farm,
                searchTerm.start,
                searchTerm.end,
            );
            const sensorName = datasets[valueIndex].sensorName;
            const title = `${sensorName} (${sensorUnits[valueIndex]})`;

            let filteredDatasets = datasets[valueIndex].datasets.filter(
                (data) => {
                    const sector = farm.sectors.find((sector) => {
                        const alias =
                            sector.alias ?? `${sector.row}-${sector.col}`;
                        return alias === data.label;
                    });
                    if (!sector) {
                        return false;
                    }
                    const value = list.find((value) => value.id === sector.id);
                    return value?.show ?? true;
                },
            );

            if (list.every((value) => !value.show)) {
                filteredDatasets = datasets[valueIndex].datasets;
            }
            console.log(labels);
            console.log(datasets[valueIndex].datasets);

            return (
                <>
                    <DashboardCommonHeader
                        className="h(40) w(fill) gap(16) hbox(top) text(middle)"
                        onClickNext={() => handleIndex(valueIndex + 1)}
                        onClickPrev={() => handleIndex(valueIndex - 1)}
                        title={title}
                    >
                        <div className="absolute(~32,12) hbox gap(16)">
                            <P
                                onClick={handleModal}
                                className={`w(100) h(50) r(${BorderRadius.INPUT}) b(--color-border) bg(--color-box) pointer text(pack)`}
                            >
                                구역 선택
                            </P>
                            <DropdownComponent />
                            {showCustomDate && (
                                <div className="absolute(~0,50) bg(white)">
                                    <CustomDateComponent />
                                </div>
                            )}
                        </div>
                    </DashboardCommonHeader>
                    <div
                        className={`w(100%) h(563) r(${BorderRadius.INPUT}) bg(white)`}
                    >
                        <DetailChart
                            labels={labels}
                            datasets={filteredDatasets}
                            align="start"
                            className={"w(100%) h(563) p(10/20)"}
                            zeroAtYAxis={false}
                        />
                    </div>
                </>
            );
        }
    }, [
        CustomDateComponent,
        DropdownComponent,
        error,
        farm,
        handleIndex,
        handleModal,
        isError,
        isPending,
        list,
        showCustomDate,
        timeSeriesData,
        valueIndex,
    ]);

    return (
        <Layout className="h(100%) w(1240)">
            <Section height="668" className="p(32) bg(white) relative">
                {getContent()}
            </Section>
        </Layout>
    );
};

export default GraphDashboard;
