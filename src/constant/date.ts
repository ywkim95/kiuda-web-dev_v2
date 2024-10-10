import { forecastTimes } from "../util/WeatherUtils.ts";
import ValueModel from "../models/Sensor/ValueModel.ts";

export const getFormattedDate = (date: Date) => {
  const offset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(date.getTime() + offset);

  return kstDate.toISOString().split("T")[0];
};

export const getFormattedTime = (date: Date) => {
  const offset = 8 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const kstDate = new Date(date.getTime() + offset);

  return kstDate.toISOString().split("T")[1].slice(0, 2);
};

export const getWeatherTime = (date: Date) => {
  const currentHour = date.getHours();

  let closestTime = forecastTimes[0];
  let minDifference = Math.abs(currentHour - parseInt(forecastTimes[0]));

  for (let i = 1; i < forecastTimes.length; i++) {
    const forecastHour = parseInt(forecastTimes[i]);
    const difference = Math.abs(currentHour - forecastHour);
    if (difference < minDifference) {
      minDifference = difference;
      closestTime = forecastTimes[i];
    }
  }
  return closestTime;
};

export const getWeatherDate = (date: Date, flag: boolean = false) => {
  const offset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  let kstDate = new Date(date.getTime() + offset);

  if (flag) {
    kstDate = new Date(kstDate.getTime() - 24 * 60 * 60 * 1000);
  }

  return kstDate.toISOString().split("T")[0].replace(/-/g, "");
};

export const getPreviousDate = (days: number) => {
  const today = new Date();
  today.setDate(today.getDate() - days);
  return getFormattedDate(today);
};

export const getPreviousMonth = (months: number) => {
  const today = new Date();
  today.setMonth(today.getMonth() - months);
  return getFormattedDate(today);
};

export const getFormattedDateAndTime = (date: Date | string) => {
  if (typeof date === "string") {
    date = convertKSTToUTC(date);
  }
  const dateStr = date.toISOString().split("T")[0];
  const day = date.getDay();

  return `${dateStr}(${getFormattedDay(day)})  ${get12HourFormat(date)}`;
};

export const getFormattedKoreanDate = (date: string) => {
    const kst = new Date(date);
    
    return `${kst.getFullYear()}년 ${(kst.getMonth()+1).toDatePad()}월 ${kst.getDate().toDatePad()}일(${getFormattedDay(kst.getDay())}) ${kst.getHours().toDatePad()}:${kst.getMinutes().toDatePad()}`;
}; 

export const getFormattedDay = (day: number) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[day];
};

export const get12HourFormat = (date: Date) => {
  let hours = date.getHours();
  const hoursStr = hours < 10 ? "0" + hours : hours;
  let period = "오전";

  if (hours >= 12) {
    period = "오후";
    hours = hours - 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  const minutes = date.getMinutes();
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${period} ${hoursStr}:${minutesStr}`;
};

export const getDate = (date: string) => {
  const y = parseInt(date.substring(0, 4), 10);
  const m = parseInt(date.substring(4, 6), 10) - 1;
  const d = parseInt(date.substring(6, 8), 10);

  const newDate = new Date(y, m, d);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const dayOfWeek = newDate.getDay();

  return {
    year,
    month,
    day,
    dayOfWeek: ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek],
  };
};

export const getStringDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const sYear = start.getFullYear();
  const sMonth = start.getMonth() + 1;
  const sDay = start.getDate();

  const eYear = end.getFullYear();
  const eMonth = end.getMonth() + 1;
  const eDay = end.getDate();

  if (sYear === eYear && sMonth === eMonth && sDay === eDay) {
    return `${sYear}년 ${sMonth.toDatePad()}월 ${sDay.toDatePad()}일(${getFormattedDay(start.getDay())})`;
  }

  return `${sYear}년 ${sMonth.toDatePad()}월 ${sDay.toDatePad()}일 ~ ${eYear}년 ${eMonth.toDatePad()}월 ${eDay.toDatePad()}일`;
};

export const getDateRange = (startDate: Date, endDate: Date) => {
  const start = getFormattedDate(startDate);
  const end = getFormattedDate(endDate);

  if (start === end) {
    return start;
  }

  return `${start} ~ ${end}`;
};

export const searchDateRange = (startDate: string, endDate: string) => {
  // string or date => 'yyMMdd'
  const start = new Date(startDate);
  const end = new Date(endDate);

  const sYear = start.getFullYear();
  const sMonth = start.getMonth() + 1;
  const sDay = start.getDate();

  const eYear = end.getFullYear();
  const eMonth = end.getMonth() + 1;
  const eDay = end.getDate();

  if (sYear === eYear && sMonth === eMonth && sDay === eDay) {
    return `${sYear.toYearSubstr()}${sMonth.toDatePad()}${sDay.toDatePad()}`;
  }

  return `${sYear.toYearSubstr()}${sMonth.toDatePad()}${sDay.toDatePad()}${eYear.toYearSubstr()}${eMonth.toDatePad()}${eDay.toDatePad()}`;
};

export const dateOptions = [
  { func: () => getPreviousDate(1), text: "1일" },
  { func: () => getPreviousDate(7), text: "7일" },
  { func: () => getPreviousMonth(1), text: "1개월" },
  { func: () => getPreviousMonth(3), text: "3개월" },
  {
    func: () => ({ startDate: "", endDate: "" }),
    text: "사용자 설정",
  },
];

export const TenMinutes = 10 * 60 * 1000;

export const oneHour = 60 * 60 * 1000;

export const fourHours = 4 * 60 * 60 * 1000;

export const oneDay = 24 * 60 * 60 * 1000;

export const oneWeek = 7 * oneDay;

export const oneMonth = 30 * oneDay;

export const averageData = (data: ValueModel[],interval: number ) => {
    if(data.length === 0) {
        return [];
    }
    
    const valueModels: ValueModel[] = [];
    let currentModels: ValueModel[] = [];
    let currentModelStartTime = new Date(data[0].time).getTime();
    
    for(const item of data) {
        const itemTime = new Date(item.time).getTime();
        if(itemTime - currentModelStartTime < interval) {
            currentModels.push(item);
        } else {
            valueModels.push(aggregateGroup(currentModels));
            currentModels = [item];
            currentModelStartTime = itemTime;
        }
    }
    
    if(currentModels.length > 0) {
        valueModels.push(aggregateGroup(currentModels));
    }
    
    return valueModels;
};

const aggregateGroup = (group: ValueModel[]) => {
    const totalValue = group.reduce((sum, item) => sum + item.value, 0);
    
    const averageValue = totalValue / group.length;
    return {
        value: averageValue,
        time: group[0].time,
        id: group[0].id,
    }
};


export const convertKSTToUTC = (kstTime: string) => {
    const date = new Date(kstTime);
    
    const offset = - 9 * 60 * 60 * 1000;
    
    return new Date(date.getTime() + offset);
};

export const getDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    return {
        date: `${year}-${month.toDatePad()}-${day.toDatePad()}`,
        time: `${get12Format(hour)}:${minute.toDatePad()}`,
    }
};

const get12Format = (hour: number) => {
    if(hour > 12) {
        return `오후 ${(hour - 12).toDatePad()}`;
    } else {
        return `오전 ${hour.toDatePad()}`;
    }
};