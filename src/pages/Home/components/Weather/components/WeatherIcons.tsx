import Sunny from "../../../../../components/svg/Sunny.tsx";
import SunnyAndCloudy from "../../../../../components/svg/SunnyAndCloudy.tsx";
import Cloudy from "../../../../../components/svg/Cloudy.tsx";
import { FC } from "react";

interface WeatherIconsProps {
  type: string;
  size?: { width: number; height: number };
}

const WeatherIcons: FC<WeatherIconsProps> = ({ type, size }) => {
  if (type === "맑음")
    return <Sunny width={size?.width} height={size?.height} />;
  if (type === "구름 많음")
    return <SunnyAndCloudy width={size?.width} height={size?.height} />;
  if (type === "흐림")
    return <Cloudy width={size?.width} height={size?.height} />;

  return null;
};

export default WeatherIcons;
