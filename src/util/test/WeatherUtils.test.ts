import { test } from "vitest";

import {
  groupedWeatherDataType,
  weatherDataType,
} from "../../http/httpType.ts";
import {
  dfs_xy_conv,
  filterAndGroupWeatherData,
  ptyConvUltraShortTerm,
  skyConvStr,
  timeConverter,
} from "../WeatherUtils.ts";

describe("WeatherUtils", () => {
  test("dfs_xy_conv correctly converts to XY", () => {
    const result = dfs_xy_conv("toXY", 37.5665, 126.978);
    expect(result.x).toBeCloseTo(60);
    expect(result.y).toBeCloseTo(127);
  });

  test("dfs_xy_conv correctly converts to LL", () => {
    const result = dfs_xy_conv("toLL", 60, 127);
    expect(result.lat).toBeCloseTo(37.579871128849334);
    expect(result.lng).toBeCloseTo(126.98935225645432);
  });

  test("skyConvStr correctly converts sky code to string", () => {
    expect(skyConvStr("1")).toBe("맑음");
    expect(skyConvStr("3")).toBe("구름 많음");
    expect(skyConvStr("4")).toBe("흐림");
    expect(skyConvStr("0")).toBe("맑음");
  });

  test("ptyConvUltraShortTerm correctly converts pty code to string", () => {
    expect(ptyConvUltraShortTerm("0")).toBe("");
    expect(ptyConvUltraShortTerm("1")).toBe("비");
    expect(ptyConvUltraShortTerm("2")).toBe("비/눈");
    expect(ptyConvUltraShortTerm("3")).toBe("눈");
    expect(ptyConvUltraShortTerm("5")).toBe("빗방울");
    expect(ptyConvUltraShortTerm("6")).toBe("빗방울/눈날림");
    expect(ptyConvUltraShortTerm("7")).toBe("눈날림");
  });

  test("filterAndGroupWeatherData correctly groups weather data", () => {
    const data: weatherDataType[] = [
      {
        category: "SKY",
        fcstDate: "20220101",
        fcstTime: "0200",
        fcstValue: "1",
        baseDate: "20220101",
        baseTime: "0000",
        nx: 60,
        ny: 127,
      },
      {
        category: "TMP",
        fcstDate: "20220101",
        fcstTime: "0200",
        fcstValue: "10",
        baseDate: "20220101",
        baseTime: "0000",
        nx: 60,
        ny: 127,
      },
      {
        category: "SKY",
        fcstDate: "20220101",
        fcstTime: "0500",
        fcstValue: "3",
        baseDate: "20220101",
        baseTime: "0000",
        nx: 60,
        ny: 127,
      },
      {
        category: "TMP",
        fcstDate: "20220101",
        fcstTime: "0500",
        fcstValue: "15",
        baseDate: "20220101",
        baseTime: "0000",
        nx: 60,
        ny: 127,
      },
    ];
    const expected: groupedWeatherDataType[] = [
      { date: "20220101", time: "0200", skyValue: "맑음", tmpValue: "10" },
      { date: "20220101", time: "0500", skyValue: "구름 많음", tmpValue: "15" },
    ];
    const actual = filterAndGroupWeatherData(data);
    expect(actual).toEqual(expected);
  });

  test("timeConverter correctly converts time", () => {
    expect(timeConverter("2022010102")).toBe("오전 2시");
    expect(timeConverter("2022010114")).toBe("오후 2시");
  });
});
