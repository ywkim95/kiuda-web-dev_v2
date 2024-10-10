import AlarmModel from "./AlarmModel.ts";

type PaginationAlarmModel = {
  count: number;
  alarms: AlarmModel[];
};

export default PaginationAlarmModel;
