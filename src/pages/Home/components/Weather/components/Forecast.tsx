import P from "../../../../../components/P.tsx";
import { fontWeight } from "../../../../../constant/font.ts";
import WeatherIcons from "./WeatherIcons.tsx";
import { timeConverter } from "../../../../../util/WeatherUtils.ts";
import { FC } from "react";

interface ForecastProps {
  time: string;
  type: string;
  temp: string;
}

const Forecast: FC<ForecastProps> = ({ time, type, temp }) => {
  return (
    <div className="vbox(center) gap(11)">
      <P fontSize={10}>{timeConverter(time)}</P>
      <WeatherIcons type={type} />
      <P fontWeight={fontWeight.BOLD}>{temp}°</P>
    </div>
  );
};

export default Forecast;
