import ActiveTab from "../../../../../components/svg/ActiveTab.tsx";
import Tab from "../../../../../components/svg/Tab.tsx";
import { FC } from "react";

interface WeatherTabProps {
  index: number;
}

const WeatherTab: FC<WeatherTabProps> = ({ index }) => {
  return (
    <div className="hbox(center) gap(16) pt(15)">
      {[0, 1, 2].map((item) => (
        <div key={item}>
          {index === item && <ActiveTab />}
          {index !== item && <Tab />}
        </div>
      ))}
    </div>
  );
};

export default WeatherTab;
