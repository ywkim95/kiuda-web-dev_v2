export enum MeasurementTarget {
  Indoor = "대기",
  Soil = "토양",
}

type SpecModel = {
  id: number;
  min: number;
  max: number;
  revision: number;
  name: string;
  unit: string;
  target: string;
};

export default SpecModel;
