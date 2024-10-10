import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import Span from "../../../../../components/Span.tsx";
import Forecast from "./Forecast.tsx";
import { groupedWeatherDataType } from "../../../../../http/httpType.ts";
import useScrollHook from "../../../hooks/useScrollHook.tsx";
import { getDate } from "../../../../../constant/date.ts";
import WeatherTab from "./WeatherTab.tsx";
import WeatherButtonList from "./WeatherButtonList.tsx";
import { FC } from "react";

interface ForecastListProps {
  items: groupedWeatherDataType[];
}

const ForecastList: FC<ForecastListProps> = ({ items }) => {
  const { index, handleScroll, scrollRef } = useScrollHook({
    length: 3,
    scrollValue: 401,
    isInfinite: false,
  });

  const date = getDate(items[index * 8].date);

  return (
    <div className="vbox gap(15)">
      <P
        aria-label="Date"
        fontSize={fontSize.BIG}
        fontWeight={fontWeight.BOLD}
        className="hbox(top) gap(5)"
      >
        {date.month}/{date.day}
        <Span fontSize={fontSize.SMALL} fontWeight={fontWeight.BOLD}>
          ({date.dayOfWeek})
        </Span>
      </P>
      <div className="relative">
        <div className="hbox clip" ref={scrollRef}>
          {items.map((item, index) => (
            <div className="hbox px(2)" key={item.date + item.time}>
              <Forecast
                time={item.date + item.time}
                type={item.skyValue}
                temp={item.tmpValue ?? "0"}
              />
              {index !== items.length - 1 && (
                <div className="w(1) h(30) bg(--color-seperated) mx(5)"></div>
              )}
            </div>
          ))}
        </div>
        <WeatherTab index={index} />
        <WeatherButtonList handleScroll={handleScroll} index={index} />
      </div>
    </div>
  );
};

export default ForecastList;
