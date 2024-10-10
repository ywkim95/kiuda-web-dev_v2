import SpecModel from "./SpecModel.ts";
import AlarmSettingModel from "../Alarm/AlarmSettingModel.ts";

type SensorModel = {
  id: number;
  sensorSpec: SpecModel;
  alarmSetting: AlarmSettingModel;
};

export default SensorModel;
