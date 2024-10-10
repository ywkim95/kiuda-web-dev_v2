import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import {FC, useState} from "react";
import NumericalFormIcon from "../../../../../components/svg/NumericalFormIcon.tsx";
import NumericalDashboard from "./Numerical/NumericalDashboard.tsx";
import MixedFormIcon from "../../../../../components/svg/MixedFormIcon.tsx";
import MixedDashboard from "./Mixed/MixedDashboard.tsx";
import GraphFormIcon from "../../../../../components/svg/GraphFormIcon.tsx";
import GraphDashboard from "./Graph/GraphDashboard.tsx";
import P from "../../../../../components/P.tsx";
import {fontSize, fontWeight} from "../../../../../constant/font.ts";
import DownloadIcon from "../../../../../components/svg/DownloadIcon.tsx";
import {queryClient} from "../../../../../http/http.ts";
import ValueModel from "../../../../../models/Sensor/ValueModel.ts";
import {RTDataExcelStructure, TSDataExcelStructure} from "../../../../../util/ExcelUtil.ts";
import useQueryKeyStore from "../../../../../store/useQueryKeyStore.ts";
import {DateType} from "../../../../../constant/type.ts";

interface GlobalContainerProps {
    farm: FarmModel;
}

const SectorContainer:FC<GlobalContainerProps> = ({farm}) => {
    const {queryKey} = useQueryKeyStore();
    const [zoneIndex, setZoneIndex] = useState(0);
    
    const ZoneBtnList = [
        {
            id: 1,
            name: "수치형 대시보드",
            icon: <NumericalFormIcon isSelected={zoneIndex === 0} />,
            children: <NumericalDashboard farm={farm} />,
        },
        {
            id: 2,
            name: "혼합형 대시보드",
            icon: <MixedFormIcon isSelected={zoneIndex === 1} />,
            children: <MixedDashboard farm={farm} />,
        },
        {
            id: 3,
            name: "그래프형 대시보드",
            icon: <GraphFormIcon isSelected={zoneIndex === 2} />,
            children: <GraphDashboard farm={farm} />,
        },
    ];
    
    const handleDownload = () => {
        if(zoneIndex === 0) {
            // logic 실행
            const data = queryClient.getQueryData(["farm", farm.id, "sensorValue"]) as ValueModel[] | undefined;
            if(!data) {
                window.alert("데이터가 없습니다.");
                return;
            }
            RTDataExcelStructure(farm, data);
        } else {
            console.log(queryKey);
            // logic 실행
            if(!queryKey) {
                window.alert("키가 올바르지 않습니다.");
                return;
            }
            
            const parsedQueryKey = JSON.parse(queryKey) as (string | number | DateType)[];
            
            const data = queryClient.getQueryData(parsedQueryKey) as ValueModel[] | undefined;
            
            if(!data) {
                window.alert("데이터가 없습니다.");
                return;
            }
            
            TSDataExcelStructure(farm, data, parsedQueryKey[3] as number);
        }
    };
    
    return (
        <div className="w(1240) h(100%)">
            <div className="hbox space-between w(100%) my(46)">
                <P fontSize={fontSize.ExtraBIG} fontWeight={fontWeight.BOLD}>
                    {ZoneBtnList[zoneIndex].name}
                </P>
                <div className="hbox gap(8)">
                    <button className="mr(12)" onClick={handleDownload}>
                        <DownloadIcon />
                    </button>
                    {ZoneBtnList.map((zone, index) => (
                        <button key={zone.id} onClick={() => setZoneIndex(index)}>
                            {zone.icon}
                        </button>
                    ))}
                </div>
            </div>
            {ZoneBtnList[zoneIndex].children}
        </div>
    );
};

export default SectorContainer;
