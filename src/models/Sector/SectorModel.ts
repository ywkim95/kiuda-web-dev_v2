import SensorModel from "../Sensor/SensorModel.ts";

export type SectorModel = {
  id: number;
  row: number;
  col: number;
  alias: string | null;
  sensors: SensorModel[];
};

export default SectorModel;
