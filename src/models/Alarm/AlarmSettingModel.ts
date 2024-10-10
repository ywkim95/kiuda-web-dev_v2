type AlarmSettingModel = {
  sensorId: number;
  min: number;
  max: number;
  revision: number;
  dangerThreshold: number;
  highThreshold: number;
  lowThreshold: number;
};

export default AlarmSettingModel;
