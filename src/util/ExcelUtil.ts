import ValueModel from "../models/Sensor/ValueModel.ts";
import FarmModel from "../models/Farm/FarmModel.ts";
import { utils, writeFile } from "xlsx";
import { getFormattedDate } from "../constant/date.ts";

export const RTExcelDownload = (data: string[][], title: string) => {
    const workSheet = utils.json_to_sheet(data);
    const workBook = utils.book_new();
    const newDate = new Date();
    const date = getFormattedDate(newDate);

    utils.book_append_sheet(workBook, workSheet, title);
    writeFile(workBook, `${title}_${date}.xlsx`);
};

// 1. 실시간 데이터를 기반으로 하는 파일
// 2. 시계열 데이터를 기반으로 하는 파일
export const RTDataExcelStructure = (farm: FarmModel, values: ValueModel[]) => {
    const time = values.map((value) => value.time)[0];
    const sortedSectors = farm.sectors.sort((a, b) => a.id - b.id);
    const sectorNames = sortedSectors.map(
        (sector) => sector.alias ?? `${sector.row}-${sector.col}`,
    );
    const sensors = farm.sectors.flatMap((sector) => {
        return sector.sensors.map((sensor) => sensor);
    });

    const uniqueSensorNames: string[] = Array.from(
        new Set(
            sensors.map((sensor) =>
                JSON.stringify(
                    `${sensor.sensorSpec.target}(${sensor.sensorSpec.unit})`,
                ),
            ),
        ),
    ).map((name) => JSON.parse(name));
    const data = sectorNames.map((name, index) => {
        const sector = sortedSectors.find(
            (sector) =>
                name === sector.alias || name === `${sector.row}-${sector.col}`,
        );
        const valueList =
            sector?.sensors.map((sensor) => {
                const value = values.find((value) => value.id === sensor.id);
                return value?.value.toString() ?? "-";
            }) ?? [];
        return [`${index + 1}`, name, ...valueList];
    });

    const excel = [
        [`${farm.alias} 섹터별 데이터`],
        [`시간`, time],
        ["index", "구역명", ...uniqueSensorNames],
        ...data,
    ];

    RTExcelDownload(excel, `${farm.alias} 섹터별 데이터`);
};

export const TSDataExcelStructure = (
    farm: FarmModel,
    values: ValueModel[],
    specId: number,
) => {
    const times = Array.from(new Set(values.map((value) => value.time))).sort();

    const sensors = farm.sectors.flatMap((sector) =>
        sector.sensors.filter((sensor) => sensor.sensorSpec.id === specId),
    );
    const uniqueSensorNames = Array.from(
        new Set(sensors.map((sensor) => sensor.sensorSpec.target)),
    );
    if (uniqueSensorNames.length === 0) {
        return;
    }

    const sensorName = uniqueSensorNames[0];

    const titleRow = [`${farm.alias} ${sensorName} 시계열 데이터`];

    const sensorRow = ["센서명", sensorName];
    const infoRow = ["단위", sensors[0].sensorSpec.unit];

    const headerRow = ["index", "구역명", ...times];

    const dataRows = farm.sectors.map((sector, index) => {
        const row = [
            `${index + 1}`,
            sector.alias ?? `${sector.row}-${sector.col}`,
        ];
        times.forEach((time) => {
            const sensor = sector.sensors.find(
                (sensor) => sensor.sensorSpec.target === sensorName,
            );
            const value = values.find(
                (value) => value.id === sensor?.id && value.time === time,
            );
            row.push(value?.value.toString() ?? "-");
        });
        return row;
    });

    const worksheetData = [
        titleRow,
        sensorRow,
        infoRow,
        headerRow,
        ...dataRows,
    ];

    const workBook = utils.book_new();
    const workSheet = utils.aoa_to_sheet(worksheetData);
    utils.book_append_sheet(workBook, workSheet, sensorName);

    const newDate = new Date();
    const date = getFormattedDate(newDate);
    writeFile(workBook, `${farm.alias}_${sensorName}_${date}.xlsx`);
};
