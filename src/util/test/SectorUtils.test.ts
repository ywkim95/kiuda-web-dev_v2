import { test } from "vitest";
import { calculateSectorId, calculateSensorIndex } from "../SectorUtils.ts";
import { FarmSectorModel } from "../../models/Farm/FarmModel.ts";

describe("SectorUtils", () => {
  test("calculateSensorIndex returns correct index when sensorIndex is negative", () => {
    const sensorIndex = -1;
    const sensorListLength = 5;
    const expectedIndex = 4;
    const actualIndex = calculateSensorIndex(sensorIndex, sensorListLength);
    expect(actualIndex).toBe(expectedIndex);
  });

  test("calculateSensorIndex returns correct index when sensorIndex is greater than sensorListLength", () => {
    const sensorIndex = 6;
    const sensorListLength = 5;
    const expectedIndex = 0;
    const actualIndex = calculateSensorIndex(sensorIndex, sensorListLength);
    expect(actualIndex).toBe(expectedIndex);
  });

  test("calculateSensorIndex returns correct index when sensorIndex is within range", () => {
    const sensorIndex = 3;
    const sensorListLength = 5;
    const expectedIndex = 3;
    const actualIndex = calculateSensorIndex(sensorIndex, sensorListLength);
    expect(actualIndex).toBe(expectedIndex);
  });

  test("calculateSectorId returns correct id when isNext is true and currentSectorIndex is the last index", () => {
    const isNext = true;
    const currentSectorIndex = 2;
    const sectorListLength = 3;
    const sectorList: FarmSectorModel[] = [
      {
        id: 1,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 2,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 3,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
    ];
    const expectedId = 1;
    const actualId = calculateSectorId(
      isNext,
      currentSectorIndex,
      sectorListLength,
      sectorList,
    );
    expect(actualId).toBe(expectedId);
  });

  test("calculateSectorId returns correct id when isNext is false and currentSectorIndex is the first index", () => {
    const isNext = false;
    const currentSectorIndex = 0;
    const sectorListLength = 3;
    const sectorList: FarmSectorModel[] = [
      {
        id: 1,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 2,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 3,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
    ];
    const expectedId = 3;
    const actualId = calculateSectorId(
      isNext,
      currentSectorIndex,
      sectorListLength,
      sectorList,
    );
    expect(actualId).toBe(expectedId);
  });

  test("calculateSectorId returns correct id when isNext is true and currentSectorIndex is not the last index", () => {
    const isNext = true;
    const currentSectorIndex = 1;
    const sectorListLength = 3;
    const sectorList: FarmSectorModel[] = [
      {
        id: 1,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 2,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 3,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
    ];
    const expectedId = 3;
    const actualId = calculateSectorId(
      isNext,
      currentSectorIndex,
      sectorListLength,
      sectorList,
    );
    expect(actualId).toBe(expectedId);
  });

  test("calculateSectorId returns correct id when isNext is false and currentSectorIndex is not the first index", () => {
    const isNext = false;
    const currentSectorIndex = 2;
    const sectorListLength = 3;
    const sectorList: FarmSectorModel[] = [
      {
        id: 1,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 2,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
      {
        id: 3,
        row: "1",
        col: "1",
        sensor_list: [],
        alias: null,
      },
    ];
    const expectedId = 2;
    const actualId = calculateSectorId(
      isNext,
      currentSectorIndex,
      sectorListLength,
      sectorList,
    );
    expect(actualId).toBe(expectedId);
  });
});
