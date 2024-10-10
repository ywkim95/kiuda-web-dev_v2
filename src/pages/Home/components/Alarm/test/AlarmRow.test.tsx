import { AlarmRowType } from "../components/AlarmTable.tsx";
import AlarmRow from "../components/AlarmRow.tsx";
import routeRender from "../../../../../util/test/render.tsx";

const data: AlarmRowType = {
  alarmType: "Test Alarm",
  date: "2022-01-01",
  time: "12:00",
  sectorName: "Test Sector",
  sensorType: "Test Sensor",
  alarmStandard: "Test Standard",
  sensorValue: "100",
  overValue: "50",
};
test("AlarmRow 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<AlarmRow data={data} />);

  // Check if the rendered output contains the expected values
  expect(getByText(data.alarmType)).toBeInTheDocument();
  expect(getByText(data.date)).toBeInTheDocument();
  expect(getByText(data.time)).toBeInTheDocument();
  expect(getByText(data.sectorName)).toBeInTheDocument();
  expect(getByText(data.sensorType)).toBeInTheDocument();
  expect(getByText(data.alarmStandard)).toBeInTheDocument();
  expect(getByText(data.sensorValue)).toBeInTheDocument();
  expect(getByText(data.overValue)).toBeInTheDocument();
});

test("AlarmRow 컴포넌트가 헤더일때 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<AlarmRow isHeader data={data} />);

  const alarmType = getByText(data.alarmType) as HTMLParagraphElement;
  const date = getByText(data.date);
  const time = getByText(data.time);
  const name = getByText(data.sectorName);
  const type = getByText(data.sensorType);
  const standard = getByText(data.alarmStandard);
  const value = getByText(data.sensorValue);
  const over = getByText(data.overValue);
  expect(alarmType).toHaveClass("700 c(white)", { exact: false });
  expect(date).toHaveClass("700 c(white)", { exact: false });
  expect(time).toHaveClass("700 c(white)", { exact: false });
  expect(name).toHaveClass("700 c(white)", { exact: false });
  expect(type).toHaveClass("700 c(white)", { exact: false });
  expect(standard).toHaveClass("700 c(white)", { exact: false });
  expect(value).toHaveClass("700 c(white)", { exact: false });
  expect(over).toHaveClass("700 c(white)", { exact: false });
});
