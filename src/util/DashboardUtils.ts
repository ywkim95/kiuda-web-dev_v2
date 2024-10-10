import FarmModel from "../models/Farm/FarmModel.ts";
import { ChartDataset } from "chart.js";
import { queryClient } from "../http/http.ts";
import { sensorSettingType } from "../http/httpType.ts";
import { cloneDeep } from "lodash";
import ValueModel from "../models/Sensor/ValueModel.ts";
import SensorModel from "../models/Sensor/SensorModel.ts";
import {averageData, convertKSTToUTC, fourHours, oneDay, oneMonth, oneWeek} from "../constant/date.ts";

export const getLabels = (chartData: ValueModel[], startDate:string, endDate: string) => {
  if(chartData.length === 0) {
      return [];
  }
    
  const start = convertKSTToUTC(startDate).getTime();
  const end = convertKSTToUTC(endDate).getTime();
  
  const newSet = new Set(chartData.map((value) => {
      if(end-start <= oneDay) {
          return value.time;
      } else if(end - start <= oneWeek) {
          const date = convertKSTToUTC(value.time);
          const hours = date.getHours();
          const roundedHours = Math.floor(hours / 4) * 4;
          return `${value.time.slice(0, 10)} ${roundedHours.toDatePad()}:00`;
      } else {
          return value.time.slice(0,10);
      }
  }));
  
  const lbs: string[] = Array.from(newSet).sort((a,b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
  });
  
    
  const labels: string[] = [];

  lbs.forEach((value,index) => {
    const date = convertKSTToUTC(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toDatePad();
    const day = date.getDate();
    const hour = date.getHours();
      
    
    
    if(index === 0) {
        if(end - start <= oneWeek) {
            labels.push(`${month}월 ${day.toDatePad()}일 ${hour.toDatePad()}시`);
        } else {
            labels.push(`${year}년 ${month}월 ${day.toDatePad()}일`);
        }
        
        return;
    }
    
    const prevDate = convertKSTToUTC(lbs[index - 1]);
    const prevYear = prevDate.getFullYear();
    const prevMonth = (prevDate.getMonth() + 1).toDatePad();
    const prevDay = prevDate.getDate();
    
    
    if(end-start <= oneDay) {
        if(day !== prevDay) {
            labels.push(`${month}월 ${day.toDatePad()}일 ${hour.toDatePad()}시`);
        } else {
            labels.push(`${hour.toDatePad()}시`);
        }
    } else if(end - start <= oneWeek) {
        if(day !== prevDay) {
            labels.push(`${month}월 ${day.toDatePad()}일 ${hour.toDatePad()}시`);
        } else {
            labels.push(`${day.toDatePad()}일 ${hour.toDatePad()}시`);
        }
    } else if(end - start <= oneMonth) {
        if (month !== prevMonth) {
            labels.push(`${month}월 ${day.toDatePad()}일`);
        } else {
            labels.push(`${day.toDatePad()}일`);
        }
    } else {
        if(year !== prevYear) {
            labels.push(`${year}년 ${month}월 ${day.toDatePad()}일`);
        } else {
            labels.push(`${month}월 ${day.toDatePad()}일`);
        }
    }
  });
  
  
  return labels;
};

export const getDatasets = (data: ValueModel[], farm: FarmModel, startDate: string, endDate: string) => {
  const sensorMap: Map<string, ChartDataset<"line", number[]>[]> = new Map();
  const sensorUnitSet = new Set<string>();

  farm.sectors.forEach((sector, index) => {
    const sectorAlias = sector.alias ?? `${sector.row}-${sector.col}`;

    sector.sensors.forEach((sensor) => {
      const sensorData = data.filter((d) => d.id === sensor.id).sort((a,b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA.getTime() - dateB.getTime();
      });
        
      const start = convertKSTToUTC(startDate).getTime();
      const end =  convertKSTToUTC(endDate).getTime();
      
      const sensorName = sensor.sensorSpec.name;
      const sensorUnit = sensor.sensorSpec.unit;
      
      

      if (sensorData) {
          let filteredData: ValueModel[];
          if(end-start <= oneDay) {
              filteredData = sensorData;
          }
          else if(end - start <= oneWeek) {
              filteredData = averageData(sensorData, fourHours);
          }
          else {
              filteredData = averageData(sensorData, oneDay);
          }
          
          
        const dataset: ChartDataset<"line", number[]> = {
          label: sectorAlias,
          pointStyle: "circle",
          pointBorderColor: colorList[index % 10],
          pointBackgroundColor: "white",
          borderColor: colorList[index % 10],
          backgroundColor: colorList[index % 10],
          data: filteredData.map((v) => parseFloat(v.value.to2Fixed())),
          pointRadius: 3,
          tension: 0.01,
        };

        sensorUnitSet.add(sensorUnit);

        if (!sensorMap.has(sensorName)) {
          sensorMap.set(sensorName, []);
        }
        sensorMap.get(sensorName)!.push(dataset);
      }
    });
  });

  const result = Array.from(sensorMap.entries()).map(
    ([sensorName, datasets]) => ({
      sensorName,
      datasets,
    }),
  );

  return {
    datasets: result,
    sensorUnits: Array.from(sensorUnitSet).map((value) => value),
  };
};

export const setAllSettingData = (
  farmId: number,
  sensorAlarmSettings: sensorSettingType[],
) => {
  queryClient.setQueryData(
    ["farm", farmId],
    (prevFarm: FarmModel | undefined) => {
      if (!prevFarm) {
        return prevFarm;
      }

      return {
        ...prevFarm,
        sectors: prevFarm.sectors.map((sector) => {
          return {
            ...sector,
            sensors: sector.sensors.map((sensor) => {
              const matchingSetting = sensorAlarmSettings.find(
                (setting) => setting.id === sensor.sensorSpec.id,
              );
              if (matchingSetting) {
                return {
                  ...sensor,
                  alarmSetting: {
                    sensorId: sensor.id,
                    min: matchingSetting.min,
                    max: matchingSetting.max,
                    revision: matchingSetting.revision,
                  },
                };
              } else {
                return sensor;
              }
            }),
          };
        }),
      };
    },
  );
};

export const initSetting = (sensors: SensorModel[]) => {
  const initialSensorSettingsSet = new Set<string>();

  return cloneDeep(sensors)
    .map((sensor) => ({
      id: sensor.sensorSpec.id,
      min: sensor.alarmSetting.min,
      max: sensor.alarmSetting.max,
      revision: sensor.alarmSetting.revision,
    }))
    .filter((sensor) => {
      const key = `${sensor.id}-${sensor.min}-${sensor.max}-${sensor.revision}`;
      if (initialSensorSettingsSet.has(key)) {
        return false;
      } else {
        initialSensorSettingsSet.add(key);
        return true;
      }
    });
};

export const initializeSensorSettings = (farm: FarmModel) => {
  return cloneDeep(farm.sectors).flatMap((sector) =>
    sector.sensors.map((sensor) => ({
      id: sensor.id,
      min: sensor.alarmSetting.min,
      max: sensor.alarmSetting.max,
      revision: sensor.alarmSetting.revision,
    })),
  );
};

export const createInitialState = (length: number | undefined) => {
  return Array.from({ length: length ?? 0 }, () => false);
};
export enum Size {
  small,
  medium,
  large,
}

export const sizeList = {
  [Size.small]: { x: 120, y: 57.33 },
  [Size.medium]: { x: 108, y: 79 },
  [Size.large]: { x: 276, y: 178 },
};

const colorList = [
  "red",
  "yellow",
  "blue",
  "black",
  "green",
  "purple",
  "orange",
  "pink",
  "gray",
  "brown",
];

export const getTimes = (rawTimes: string[],startDate: string,endDate: string) => {
    return Array.from(new Set(rawTimes.map((time) => {
        const start = convertKSTToUTC(startDate).getTime();
        const end = convertKSTToUTC(endDate).getTime();
        
        if(end-start <= oneDay) {
            return time;
        } else if(end - start <= oneWeek) {
            const date = convertKSTToUTC(time);
            const hours = date.getHours();
            const roundedHours = Math.floor(hours / 4) * 4;
            return `${time.slice(0, 10)} ${roundedHours.toDatePad()}:00`;
        } else {
            return time.slice(0,10);
        }
    }))).sort((a,b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
    });
};