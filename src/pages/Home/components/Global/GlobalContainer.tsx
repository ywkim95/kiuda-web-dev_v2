import P from "../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../constant/font.ts";
import RealTimeIcon from "../../../../components/svg/RealTimeIcon.tsx";
import LineChartIcon from "../../../../components/svg/LineChartIcon.tsx";
import SettingIcon from "../../../../components/svg/SettingIcon.tsx";
import SensorList from "./components/SensorList.tsx";
import {FC, useState} from "react";
import IntegratedChart from "./components/IntegratedChart.tsx";
import IntegratedSetting from "./components/IntegratedSetting.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGlobalSensorValues } from "../../../../http/http.ts";
import LoadingButton from "../../../Loading/LoadingButton.tsx";
import { indoorIcons, soilIcons } from "../../../../constant/GlobalIcons.tsx";
import {useGetFarmId} from "../../../../hooks/useFarmLoader.tsx";
import SensorModel from "../../../../models/Sensor/SensorModel.ts";
import ErrorComponent from "../../../Error/ErrorComponent.tsx";

interface GlobalContainerProps {
    globalSensors: SensorModel[];
}

const GlobalContainer:FC<GlobalContainerProps> = ({globalSensors}) => {
  const farmId = useGetFarmId();

  const [isSoil, setIsSoil] = useState(false);
  const [btnIndex, setBtnIndex] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["farm", farmId, "globalValue"],
    queryFn: ({ signal }) => getGlobalSensorValues({ signal, _id: farmId }),
    refetchInterval: 10000,
      refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const handleBtnIndex = (index: number) => setBtnIndex(index);

  let content;

  if (isPending) {
    content = (
      <div className="w(100%) h(353) pack">
        <LoadingButton />
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorComponent className='w(100%) h(353) pack' error={error} />
  );
  }

  if (data) {
    const SoilSensors = globalSensors.filter(
      (sensor) =>
        sensor.sensorSpec.name.includes("토양") || sensor.sensorSpec.name.includes("Soil"),
    ).sort((a, b) => a.id - b.id);

    const IndoorSensors = globalSensors.filter(
      (sensor) =>
        !sensor.sensorSpec.name.includes("토양") &&
        !sensor.sensorSpec.name.includes("Soil"),
    ).sort((a, b) => a.id - b.id);

    const SoilValues = data.filter((value) => {
      return SoilSensors.some((sensor) => sensor.id === value.id);
    }).sort((a, b) => a.id - b.id);
    const IndoorValues = data.filter((value) => {
      return IndoorSensors.some((sensor) => sensor.id === value.id);
    }).sort((a, b) => a.id - b.id);

    const global = isSoil
      ? {
          values: SoilValues,
          icons: soilIcons,
          height: 116,
        }
      : {
          values: IndoorValues,
          icons: indoorIcons,
          height: 0,
        };

    const renderSensorList = () => {
      if (btnIndex === 0) {
        return (
          <SensorList
            {...global}
            sensors={globalSensors}
            isSoil={isSoil}
          />
        );
      } else if (btnIndex === 1) {
        return (
          <IntegratedChart
            isSoil={isSoil}
            btnIndex={btnIndex}
            sensors={isSoil ? SoilSensors : IndoorSensors}
          />
        );
      } else {
        return (
          <IntegratedSetting
            values={global.values}
            sensors={globalSensors}
            height={global.height}
            isSoil={isSoil}
          />
        );
      }
    };

    content = <>{renderSensorList()}</>;
  }
  return (
    <>
      <div className="hbox space-between pb(25)">
        <div className="hbox gap(7.5)">
          <P
            fontSize={fontSize.BIG}
            fontWeight={fontWeight.BOLD}
            color={isSoil ? "--color-nonActive" : "--color-primary"}
            className="pointer"
            onClick={() => setIsSoil(false)}
          >
            대기정보
          </P>
          <div className="bg(--color-nonActive) w(1) h(16)"></div>
          <P
            fontSize={fontSize.BIG}
            fontWeight={fontWeight.BOLD}
            color={isSoil ? "--color-primary" : "--color-nonActive"}
            className="pointer"
            onClick={() => setIsSoil(true)}
          >
            토양정보
          </P>
        </div>
        <div className="hbox gap(24)">
          <button onClick={() => handleBtnIndex(0)}>
            <RealTimeIcon isActive={btnIndex === 0} />
          </button>
          <button onClick={() => handleBtnIndex(1)}>
            <LineChartIcon isActive={btnIndex === 1} />
          </button>
          <button onClick={() => handleBtnIndex(2)}>
            <SettingIcon isActive={btnIndex === 2} />
          </button>
        </div>
      </div>
      {content}
    </>
  );
};

export default GlobalContainer;
