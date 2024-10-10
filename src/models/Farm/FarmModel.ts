import CameraModel from "../Image/CameraModel.ts";
import AddressModel from "./AddressModel.ts";
import SectorModel from "../Sector/SectorModel.ts";
import AlarmModel from "../Alarm/AlarmModel.ts";
import EntranceModel from "./EntranceModel.ts";
import SensorModel from "../Sensor/SensorModel.ts";
import ImageModel from "../Image/ImageModel.ts";

type FarmModel = {
  id: number;
  alias: string;
  address: AddressModel;
  sectorRow: number;
  sectorCol: number;
  sectors: SectorModel[];
  sectorAlarms: AlarmModel[];
  entrances: EntranceModel[];
  globalSensors: SensorModel[];
  globalAlarms: AlarmModel[];
  cameras: CameraModel[];
  images: ImageModel[];
};

export default FarmModel;
