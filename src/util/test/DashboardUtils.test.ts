import { expect, test } from "vitest";

import SensorTimeSeriesModel from "../../models/SensorTimeSeriesValueModel.ts";
import FarmModel, { MeasurementTarget } from "../../models/Farm/FarmModel.ts";
import dummyTimeSeries from "../../dummys/DummyTimeSeries.ts";
import {
  createInitialState,
  getDatasets,
  getLabels,
  initializeSensorSettings,
  initSetting,
} from "../DashboardUtils.ts";
import dummyFarmData from "../../dummys/DummyFarmData.ts";

describe("DashboardUtils", () => {
  test("getLabels returns correct labels", () => {
    const data: SensorTimeSeriesModel[] = dummyTimeSeries;

    const expectedLabels = [
      "2024년 06월 01일",
      "02일",
      "03일",
      "04일",
      "05일",
      "06일",
      "07일",
      "08일",
      "09일",
      "10일",
      "11일",
      "12일",
      "13일",
      "14일",
      "15일",
      "16일",
      "17일",
      "18일",
      "19일",
      "20일",
      "21일",
      "22일",
      "23일",
      "24일",
      "25일",
      "26일",
      "27일",
      "28일",
      "29일",
      "30일",
    ];

    const actualLabels = getLabels(data);

    expect(actualLabels).toEqual(expectedLabels);
  });

  test("getDatasets returns correct datasets and sensorUnits", () => {
    const data: SensorTimeSeriesModel[] = [
      {
        id: 1,
        values: [
          { value: 21, input_time: "2024-06-01T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-02T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-03T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-04T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-05T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-06T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-07T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-08T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-09T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-10T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-11T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-12T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-13T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-14T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-15T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-16T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-17T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-18T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-19T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-20T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-21T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-22T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-23T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-24T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-25T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-26T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-27T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-28T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-29T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-30T00:00:00.000Z" },
        ],
      },
      {
        id: 2,
        values: [
          { value: 50, input_time: "2024-06-01T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-02T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-03T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-04T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-05T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-06T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-07T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-08T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-09T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-10T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-11T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-12T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-13T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-14T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-15T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-16T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-17T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-18T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-19T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-20T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-21T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-22T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-23T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-24T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-25T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-26T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-27T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-28T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-29T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-30T00:00:00.000Z" },
        ],
      },
      {
        id: 3,
        values: [
          { value: 20, input_time: "2024-06-01T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-02T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-03T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-04T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-05T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-06T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-07T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-08T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-09T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-10T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-11T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-12T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-13T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-14T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-15T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-16T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-17T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-18T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-19T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-20T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-21T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-22T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-23T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-24T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-25T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-26T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-27T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-28T00:00:00.000Z" },
          { value: 20, input_time: "2024-06-29T00:00:00.000Z" },
          { value: 21, input_time: "2024-06-30T00:00:00.000Z" },
        ],
      },
      {
        id: 4,
        values: [
          { value: 51, input_time: "2024-06-01T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-02T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-03T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-04T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-05T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-06T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-07T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-08T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-09T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-10T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-11T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-12T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-13T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-14T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-15T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-16T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-17T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-18T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-19T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-20T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-21T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-22T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-23T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-24T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-25T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-26T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-27T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-28T00:00:00.000Z" },
          { value: 51, input_time: "2024-06-29T00:00:00.000Z" },
          { value: 50, input_time: "2024-06-30T00:00:00.000Z" },
        ],
      },
    ];

    const farm: FarmModel = {
      id: 1,
      alias: "농장",
      sector_row: 1,
      sector_col: 3,
      farm_address: {
        sig_code: "43730",
        emd_code: "25000",
      },
      farm_entrances: [
        {
          farm_id: 1,
          direction_id: 1,
          position_number: 1,
        },
      ],
      farm_sectors: [
        {
          id: 1,
          farm_sector_row: "1",
          farm_sector_col: "1",
          alias: null,
          sensor_list: [
            {
              id: 1,
              sensor_spec: {
                id: 1,
                min: -40,
                max: 60,
                revision: 0,
                name: "토양온도",
                unit: "℃",
                measurement_target: MeasurementTarget.Soil,
              },
              sensor_alarm_setting: {
                id: 1,
                farm_sector_id: 1,
                min: -40,
                max: 60,
                revision: 0,
              },
            },
            {
              id: 2,
              sensor_spec: {
                id: 2,
                min: 0,
                max: 100,
                revision: 0,
                name: "토양습도",
                unit: "%",
                measurement_target: MeasurementTarget.Soil,
              },
              sensor_alarm_setting: {
                id: 2,
                farm_sector_id: 1,
                min: 0,
                max: 100,
                revision: 0,
              },
            },
          ],
        },

        {
          id: 3,
          farm_sector_row: "1",
          farm_sector_col: "3",
          alias: null,
          sensor_list: [
            {
              id: 3,
              sensor_spec: {
                id: 1,
                min: -40,
                max: 60,
                revision: 0,
                name: "토양온도",
                unit: "℃",
                measurement_target: MeasurementTarget.Soil,
              },
              sensor_alarm_setting: {
                id: 3,
                farm_sector_id: 3,
                min: -40,
                max: 60,
                revision: 0,
              },
            },
            {
              id: 4,
              sensor_spec: {
                id: 2,
                min: 0,
                max: 100,
                revision: 0,
                name: "토양습도",
                unit: "%",
                measurement_target: MeasurementTarget.Soil,
              },
              sensor_alarm_setting: {
                id: 4,
                farm_sector_id: 3,
                min: 0,
                max: 100,
                revision: 0,
              },
            },
          ],
        },
      ],
      farm_alarms: [
        {
          id: 1,
          time: new Date().toISOString(),
          value: 1.3,
          level: 3,
        },
      ],
    };

    const expectedDatasets = {
      datasets: [
        {
          sensorName: "토양온도",
          datasets: [
            {
              label: "1-1",
              pointStyle: "circle",
              pointBorderColor: "red",
              pointBackgroundColor: "white",
              borderColor: "red",
              backgroundColor: "red",
              data: [
                21, 21, 20, 21, 20, 20, 20, 21, 20, 20, 21, 21, 21, 21, 20, 20,
                20, 20, 21, 21, 21, 21, 21, 21, 21, 20, 20, 21, 20, 20,
              ],
              pointRadius: 3,
              tension: 0.01,
            },
            {
              label: "1-3",
              pointStyle: "circle",
              pointBorderColor: "yellow",
              pointBackgroundColor: "white",
              borderColor: "yellow",
              backgroundColor: "yellow",
              data: [
                20, 20, 21, 21, 20, 21, 20, 21, 20, 20, 20, 20, 21, 21, 21, 20,
                21, 20, 21, 20, 20, 20, 21, 21, 21, 20, 20, 21, 20, 21,
              ],
              pointRadius: 3,
              tension: 0.01,
            },
          ],
        },
        {
          sensorName: "토양습도",
          datasets: [
            {
              label: "1-1",
              pointStyle: "circle",
              pointBorderColor: "red",
              pointBackgroundColor: "white",
              borderColor: "red",
              backgroundColor: "red",
              data: [
                50, 50, 50, 51, 51, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 50,
                51, 50, 51, 50, 50, 50, 51, 50, 51, 51, 51, 50, 51, 50,
              ],
              pointRadius: 3,
              tension: 0.01,
            },
            {
              label: "1-3",
              pointStyle: "circle",
              pointBorderColor: "yellow",
              pointBackgroundColor: "white",
              borderColor: "yellow",
              backgroundColor: "yellow",
              data: [
                51, 50, 51, 51, 50, 50, 50, 51, 51, 51, 50, 51, 51, 50, 51, 50,
                50, 50, 50, 51, 50, 51, 50, 51, 51, 51, 51, 50, 51, 50,
              ],
              pointRadius: 3,
              tension: 0.01,
            },
          ],
        },
      ],
      sensorUnits: ["℃", "%"],
    };

    const actualDatasets = getDatasets(data, farm);

    expect(actualDatasets).toEqual(expectedDatasets);
  });

  test("initSetting returns correct initial sensor settings", () => {
    const farm: FarmModel = dummyFarmData;

    const expectedSettings = [
      { id: 1, min: -40, max: 60, revision: 0 },
      { id: 2, min: 0, max: 100, revision: 0 },
    ];

    const actualSettings = initSetting(farm);

    expect(actualSettings).toEqual(expectedSettings);
  });

  test("initializeSensorSettings returns correct sensor settings", () => {
    const farm: FarmModel = dummyFarmData;

    const expectedSettings = [
      { id: 1, min: -40, max: 60, revision: 0 },
      { id: 2, min: 0, max: 100, revision: 0 },
      { id: 3, min: -40, max: 60, revision: 0 },
      { id: 4, min: 0, max: 100, revision: 0 },
      { id: 5, min: -40, max: 60, revision: 0 },
      { id: 6, min: 0, max: 100, revision: 0 },
      { id: 29, min: -40, max: 60, revision: 0 },
      { id: 30, min: 0, max: 100, revision: 0 },
      { id: 7, min: -40, max: 60, revision: 0 },
      { id: 8, min: 0, max: 100, revision: 0 },
      { id: 9, min: -40, max: 60, revision: 0 },
      { id: 10, min: 0, max: 100, revision: 0 },
      { id: 11, min: -40, max: 60, revision: 0 },
      { id: 12, min: 0, max: 100, revision: 0 },
      { id: 13, min: -40, max: 60, revision: 0 },
      { id: 14, min: 0, max: 100, revision: 0 },
      { id: 15, min: -40, max: 60, revision: 0 },
      { id: 16, min: 0, max: 100, revision: 0 },
      { id: 17, min: -40, max: 60, revision: 0 },
      { id: 18, min: 0, max: 100, revision: 0 },
      { id: 19, min: -40, max: 60, revision: 0 },
      { id: 20, min: 0, max: 100, revision: 0 },
      { id: 21, min: -40, max: 60, revision: 0 },
      { id: 22, min: 0, max: 100, revision: 0 },
      { id: 23, min: -40, max: 60, revision: 0 },
      { id: 24, min: 0, max: 100, revision: 0 },
      { id: 25, min: -40, max: 60, revision: 0 },
      { id: 26, min: 0, max: 100, revision: 0 },
      { id: 27, min: -40, max: 60, revision: 0 },
      { id: 28, min: 0, max: 100, revision: 0 },
    ];

    const actualSettings = initializeSensorSettings(farm);

    expect(actualSettings).toEqual(expectedSettings);
  });

  test("createInitialState returns correct initial state", () => {
    const length: number = 5;

    const expectedState = [false, false, false, false, false];

    const actualState = createInitialState(length);

    expect(actualState).toEqual(expectedState);
  });
});
