import NumericalSector from "../../pages/Sector/components/Numerical/NumericalSector.tsx";
import {
  FarmSectorModel,
  MeasurementTarget,
} from "../../../../models/Farm/FarmModel.ts";
import ValueModel from "../../../../models/Sensor/ValueModel.ts";
import routeRender from "../../../../util/test/render.tsx";

test("NumericalSector 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
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
    <NumericalSector farmSector={mockFarmSector} values={mockValues} />,
  );

  const sectorElement = await findByText(
    `${mockFarmSector.row}-${mockFarmSector.col}`,
  );
  expect(sectorElement).toBeInTheDocument();

  for (const value of mockValues) {
    const valueElement = await findByText(
      `${value.value}${mockFarmSector.sensor_list.find((sensor) => sensor.id === value.id)?.sensor_spec?.unit}`,
    );
    expect(valueElement).toBeInTheDocument();
  }
});
