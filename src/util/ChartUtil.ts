import ValueModel from "../models/Sensor/ValueModel.ts";
import SpecModel from "../models/Sensor/SpecModel.ts";
import SensorModel from "../models/Sensor/SensorModel.ts";
import {averageData, convertKSTToUTC, fourHours, oneDay, oneWeek} from "../constant/date.ts";

export const getChartData = (values: ValueModel[], id: number, startDate: string, endDate: string) => {
  if (values.length === 0) {
    return [];
  }
    
    const filteredData = values.filter((value) => value.id === id).sort((a,b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA.getTime() - dateB.getTime();
    });
  
  const start = convertKSTToUTC(startDate).getTime();
  const end =  convertKSTToUTC(endDate).getTime();
  
  if(end-start <= oneDay) {
      return filteredData;
  } else if(end - start <= oneWeek) {
      return averageData(filteredData, fourHours);
  } else {
      return averageData(filteredData, oneDay);
  }
};

export const getChartLabels = (chartData: ValueModel[], startDate:string, endDate: string) => {
  if (chartData.length === 0) {
    return [];
  }

  return chartData.map((value, index, array) => {
    const date = convertKSTToUTC(value.time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hour = date.getHours();
    
    const start = convertKSTToUTC(startDate).getTime();
    const end = convertKSTToUTC(endDate).getTime();

    if (index === 0) {
      if(end - start <= oneWeek) {
          return `${month}월 ${day}일 ${hour}시`;
      } else {
          return `${month}월 ${day}일`;
      }
    }

    const prevDate = convertKSTToUTC(array[index - 1].time);
    const prevMonth = prevDate.getMonth() + 1;
    const prevDay = prevDate.getDate();
    
    if(end-start <= oneDay) {
        if(day !== prevDay) {
            return `${month}월 ${day}일 ${hour}시`;
        } else {
            return `${hour}시`;
        }
    } else if(end - start <= oneWeek) {
        if(day !== prevDay) {
            return `${month}월 ${day}일 ${hour}시`;
        } else {
            return `${day}일 ${hour}시`;
        }
    } else {
        if (month !== prevMonth) {
            return `${month}월 ${day}일`;
        } else {
            return `${day}일`;
        }
    }
  });
};

export const getUniqueSpecs = (
  chartData: ValueModel[],
  sensors: SensorModel[],
) => {
  if (!chartData) {
    return [];
  }

  const specsArray = sensors
    .map((value) => value.sensorSpec)
    .filter((value) => value !== undefined);

  const uniqueSpecsSet = new Set<string>(); // 고유한 SpecModel 문자열화를 위한 Set
  const uniqueSpecs: SpecModel[] = [];

  specsArray.forEach((spec) => {
    const specString = JSON.stringify(spec); // 객체를 문자열로 변환하여 비교
    if (!uniqueSpecsSet.has(specString)) {
      uniqueSpecsSet.add(specString);
      uniqueSpecs.push(spec);
    }
  });

  return uniqueSpecs;
};

export const getDatasets = (
  uniqueSpecs: SpecModel[],
  data: number[],
  index: number,
) => {
  if (uniqueSpecs.length === 0) {
    return [];
  }

  if (data.length === 0) {
    return [];
  }
  // const index = isSoil ? globalSensorIndex + 4 : globalSensorIndex;

  return [
    {
      label: `${uniqueSpecs[index].target}(${uniqueSpecs[index].unit})`,
      data: data!,
      fill: false,
      pointRadius: 0.5,
      backgroundColor: "rgba(20, 159, 72, 0.6)",
      borderColor: "rgba(20, 159, 72, 0.6)",
      tension: 0.3,
    },
  ];
};
