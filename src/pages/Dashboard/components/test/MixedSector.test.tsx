import MixedSector from "../../pages/Sector/components/Mixed/MixedSector.tsx";
import {
  FarmSectorModel,
  MeasurementTarget,
} from "../../../../models/Farm/FarmModel.ts";
import ValueModel from "../../../../models/Sensor/ValueModel.ts";
import routeRender from "../../../../util/test/render.tsx";

test("MixedSector 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockFarmSector: FarmSectorModel = {
    id: 1,
    row: "3",
    col: "4",
    alias: null,
    sensor_list: [
      {
        id: 1,
        sensor_spec: {
          min: 0,
          max: 100,
          revision: 0,
          name: "이름",
          unit: "단위",
          measurement_target: MeasurementTarget.Indoor,
        },
        sensor_alarm_setting: {
          min: 0,
          max: 100,
          revision: 0,
        },
      },
    ],
    // FarmSectorModel에 맞는 mock 데이터를 입력하세요.
  };

  const mockValues: ValueModel[] = [
    {
      id: 1,
      value: 50,
    },
    // SensorValueModel에 맞는 mock 데이터를 입력하세요.
  ];

  const { findByText } = await routeRender(
    <MixedSector alias={""} value={1} unit={""} />,
  );

  const sectorElement = await findByText(
    `${mockFarmSector.row}-${mockFarmSector.col}`,
  );
  expect(sectorElement).toBeInTheDocument();

  const valueElement = await findByText(
    `${mockValues[0].value}${mockFarmSector.sensor_list.find((sensor) => sensor.id === mockValues[0].id)?.sensor_spec?.unit}`,
  );
  expect(valueElement).toBeInTheDocument();
});
