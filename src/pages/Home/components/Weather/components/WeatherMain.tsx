import WeatherIcons from "./WeatherIcons.tsx";
import { FC } from "react";

interface WeatherMainProps {
  sky: string;
}

const WeatherMain: FC<WeatherMainProps> = ({ sky }) => {
  return (
    <div className="w(145) h(106)">
      <WeatherIcons type={sky} size={{ width: 145, height: 106 }} />
    </div>
  );
};

export default WeatherMain;
