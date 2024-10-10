import Section from "../../../../../components/Section.tsx";
import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import IntegratedDashboardValue from "./IntegratedDashboardValue.tsx";
import Layout from "../../../../../components/Layout.tsx";
import ValueModel from "../../../../../models/Sensor/ValueModel.ts";
import SensorModel from "../../../../../models/Sensor/SensorModel.ts";
import { FC } from "react";
import {
  indoorIcons,
  soilIcons,
} from "../../../../../constant/GlobalIcons.tsx";

interface GlobalDashboardProps {
  values: ValueModel[];
  sensors: SensorModel[];
}

const GlobalDashboard: FC<GlobalDashboardProps> = ({ sensors, values }) => {
  const indoorSensor = sensors
    .filter(
      (sensor) =>
        !sensor.sensorSpec.name.includes("토양") &&
        !sensor.sensorSpec.name.includes("Soil"),
    )
    .sort((a, b) => a.id - b.id);
  const soilSensor = sensors
    .filter(
      (sensor) =>
        sensor.sensorSpec.name.includes("토양") || sensor.sensorSpec.name.includes("Soil"),
    )
    .sort((a, b) => a.id - b.id);

  return (
    <Layout className="w(450) h(808)">
      <Section height="100%" className="p(30) vbox gap(15)">
        <P fontSize={fontSize.BIG} fontWeight={fontWeight.BOLD}>
          대기 센서
        </P>
        <div className="grid(2) gap(15) mt(15)">
          {indoorSensor.map((sensor, index) => {
            const value = values.find((value) => value.id === sensor.id);

            if (!value) {
              return null;
            }

            return (
              <IntegratedDashboardValue
                key={sensor.id}
                name={sensor.sensorSpec.target}
                value={value.value}
                unit={sensor.sensorSpec.unit}
                icon={indoorIcons[index]}
              />
            );
          })}
        </div>
        <P fontSize={fontSize.BIG} fontWeight={fontWeight.BOLD}>
          토양 센서
        </P>
        <div className="grid(2) gap(15) mt(15)">
          {soilSensor.map((sensor, index) => {
            const value = values.find((value) => value.id === sensor.id);

            if (!value) {
              return null;
            }
            return (
              <IntegratedDashboardValue
                key={sensor.id}
                name={sensor.sensorSpec.target}
                value={value.value}
                unit={sensor.sensorSpec.unit}
                icon={soilIcons[index]}
              />
            );
          })}
        </div>
      </Section>
    </Layout>
  );
};

export default GlobalDashboard;
