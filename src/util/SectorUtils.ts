import SectorModel from "../models/Sector/SectorModel.ts";

export const calculateSensorIndex = (
  sensorIndex: number,
  sensorListLength: number,
) => {
  if (sensorIndex < 0) {
    return sensorListLength - 1;
  } else if (sensorIndex >= sensorListLength) {
    return 0;
  } else {
    return sensorIndex;
  }
};

export const calculateSectorId = (
  isNext: boolean,
  currentSectorIndex: number,
  sectorListLength: number,
  sectorList: SectorModel[],
) => {
  if (isNext) {
    return currentSectorIndex === sectorListLength - 1
      ? sectorList[0].id
      : sectorList[currentSectorIndex + 1].id;
  } else {
    return currentSectorIndex === 0
      ? sectorList[sectorListLength - 1].id
      : sectorList[currentSectorIndex - 1].id;
  }
};
