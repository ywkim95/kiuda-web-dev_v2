import { groupedWeatherDataType, weatherDataType } from "../http/httpType.ts";

const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기1준점 Y좌표(GRID)

export const forecastTimes = ["02", "05", "08", "11", "14", "17", "20", "23"]; // 시간 조건

//
// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//

export const dfs_xy_conv = (code: "toXY" | "toLL", v1: number, v2: number) => {
  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let theta;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  const rs = {
    x: 0,
    y: 0,
    lat: 0,
    lng: 0,
  };
  if (code == "toXY") {
    rs.lat = v1;
    rs.lng = v2;
    let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs.x = v1;
    rs.y = v2;
    const xn = v1 - XO;
    const yn = ro - v2 + YO;
    let ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) ra = -ra;
    let alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) theta = -theta;
      } else theta = Math.atan2(xn, yn);
    }
    const alon = theta / sn + olon;
    rs.lat = alat * RADDEG;
    rs.lng = alon * RADDEG;
  }
  return rs;
};

export const skyConvStr = (sky: string) => {
  switch (sky) {
    case "1":
      return "맑음";
    case "3":
      return "구름 많음";
    case "4":
      return "흐림";
    default:
      return "맑음";
  }
};
// export const ptyConvShortTerm = (pty: string) => {
//   switch (pty) {
//     case "0":
//       return "";
//     case "1":
//       return "비";
//     case "2":
//       return "비/눈";
//     case "3":
//       return "눈";
//     case "4":
//       return "소나기";
//     default:
//       return "";
//   }
// };

export const ptyConvUltraShortTerm = (pty: string) => {
  switch (pty) {
    case "0":
      return "";
    case "1":
      return "비";
    case "2":
      return "비/눈";
    case "3":
      return "눈";
    case "5":
      return "빗방울";
    case "6":
      return "빗방울/눈날림";
    case "7":
      return "눈날림";
    default:
      return "";
  }
};

export const filterAndGroupWeatherData = (
  data: weatherDataType[],
): groupedWeatherDataType[] => {
  const validTimes = [
    "0200",
    "0500",
    "0800",
    "1100",
    "1400",
    "1700",
    "2000",
    "2300",
  ];

  // 시간대별로 데이터를 그룹화하여 skyValue와 tmpValue를 저장할 객체
  const groupedData: Record<
    string,
    { skyValue: string | null; tmpValue: string | null }
  > = {};

  // 데이터 필터링 및 그룹화
  data.forEach((item) => {
    const key = `${item.fcstDate}-${item.fcstTime}`;

    if (validTimes.includes(item.fcstTime)) {
      if (!groupedData[key]) {
        groupedData[key] = { skyValue: null, tmpValue: null };
      }

      if (item.category === "SKY") {
        groupedData[key].skyValue = item.fcstValue;
      } else if (item.category === "TMP") {
        groupedData[key].tmpValue = item.fcstValue;
      }
    }
  });

  // 최종 결과를 배열로 변환
  return Object.entries(groupedData).map(([key, values]) => {
    const [fcstDate, fcstTime] = key.split("-");
    const skyValue = skyConvStr(values.skyValue ?? "");
    return {
      date: fcstDate,
      time: fcstTime,
      skyValue,
      tmpValue: values.tmpValue,
    };
  });
};

export const timeConverter = (date: string) => {
  const y = parseInt(date.substring(0, 4), 10);
  const m = parseInt(date.substring(4, 6), 10) - 1;
  const d = parseInt(date.substring(6, 8), 10);
  const h = parseInt(date.substring(8, 10), 10);

  const time = new Date(y, m, d, h);

  const hour = time.getHours();
  if (hour > 12) {
    return `오후 ${hour - 12}시`;
  } else {
    return `오전 ${hour}시`;
  }
};
