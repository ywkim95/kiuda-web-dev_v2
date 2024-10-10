import AlarmRow from "./AlarmRow.tsx";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import Span from "../../../../../components/Span.tsx";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import { AlarmRowType, AlarmType } from "../../../../../constant/type.ts";
import { queryClient } from "../../../../../http/http.ts";
import { FC } from "react";
import PaginationAlarmModel from "../../../../../models/Alarm/PaginationAlarmModel.ts";

interface AlarmTableProps {
    alarm: PaginationAlarmModel;
    alarmType: "sector" | "global";
}

const AlarmTable: FC<AlarmTableProps> = ({ alarm, alarmType }) => {
    const farmId = useGetFarmId();
    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;

    const headerRow: AlarmRowType = {
        alarmType: "알람 유형",
        date: "날짜",
        time: "시간",
        sectorName: "구역명",
        sensorType: "센서유형",
        alarmStandard: "알람 기준",
        sensorValue: "센서 값",
        overValue: "초과/미달 값",
    };

    const renderAlarmRows = () => {
        if (!farm || alarm.alarms.length === 0) {
            return (
                <div className="w(100%) h(450) bg(white) pack">
                    <Span>알람 내역이 없습니다.</Span>
                </div>
            );
        }
        if (alarmType === "sector") {
            return alarm.alarms.map((alarm, index) => {
                const alarmType = AlarmType[alarm.level];
                const date = alarm.time.split("T")[0];
                const time = alarm.time.split("T")[1].slice(0, 5);

                const sector = farm.sectors.find(
                    (sector) =>
                        sector.sensors.find(
                            (sensor) => sensor.id === alarm.sensorId,
                        )?.id === alarm.sensorId,
                );
                const sectorName =
                    sector === undefined
                        ? "-"
                        : sector.alias ?? `${sector.row}-${sector.col}`;
                const sensor = sector?.sensors.find(
                    (sensor) => sensor.id === alarm.sensorId,
                );
                if (!sensor) return null;
                const sensorType = sensor.sensorSpec.name ?? "-";
                const sensorValue = `${alarm.value.to2Fixed()} ${sensor.sensorSpec.unit ?? ""}`;
                // 알람 설정의 맥스 값보다 센서 값이 더 높을 때
                const isOverMax = sensor.alarmSetting.max < alarm.value;
                const overValue = isOverMax
                    ? (alarm.value - sensor.alarmSetting.max).to2Fixed()
                    : (sensor.alarmSetting.min - alarm.value).to2Fixed();
                const alarmStandard = isOverMax
                    ? sensor.alarmSetting.max
                    : sensor.alarmSetting.min;

                const data: AlarmRowType = {
                    alarmType,
                    date,
                    time,
                    sectorName,
                    sensorType,
                    alarmStandard,
                    sensorValue,
                    overValue,
                };

                return <AlarmRow key={index} data={data} index={index + 2} />;
            });
        } else {
            return alarm.alarms.map((alarm, index) => {
                const alarmType = AlarmType[alarm.level];
                const date = alarm.time.split("T")[0];
                const time = alarm.time.split("T")[1].slice(0, 5);
                const sensor = farm.globalSensors.find(
                    (sensor) => sensor.id === alarm.sensorId,
                );
                if (!sensor) return null;
                const sensorType = sensor.sensorSpec.target ?? "-";
                const sensorValue = `${alarm.value.to2Fixed()} ${sensor.sensorSpec.unit ?? ""}`;
                // 알람 설정의 맥스 값보다 센서 값이 더 높을 때
                const isOverMax = sensor.alarmSetting.max < alarm.value;
                const overValue = isOverMax
                    ? (alarm.value - sensor.alarmSetting.max).to2Fixed()
                    : (sensor.alarmSetting.min - alarm.value).to2Fixed();
                const alarmStandard = isOverMax
                    ? sensor.alarmSetting.max
                    : sensor.alarmSetting.min;

                const data: AlarmRowType = {
                    alarmType,
                    date,
                    time,
                    sectorName: "전역",
                    sensorType,
                    alarmStandard,
                    sensorValue,
                    overValue,
                };

                return <AlarmRow key={index} data={data} index={index + 2} />;
            });
        }
    };

    return (
        <div className="w(100%) h(480)">
            <div className="w(100%) bg(white) b(--color-box) bw(2) r(4) clip">
                <AlarmRow isHeader data={headerRow} />
                {renderAlarmRows()}
            </div>
        </div>
    );
};

export default AlarmTable;
