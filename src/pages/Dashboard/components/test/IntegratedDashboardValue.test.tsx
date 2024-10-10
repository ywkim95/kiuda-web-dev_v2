import { render, screen } from "@testing-library/react";
import IntegratedDashboardValue from "../../pages/Global/components/IntegratedDashboardValue.tsx";

test("IntegratedDashboardValue 컴포넌트가 정상적으로 렌더링되는지 확인", () => {
  render(
    <IntegratedDashboardValue
      name="Test Sensor"
      value="123"
      unit="unit"
      icon={<div>Icon</div>}
    />,
  );

  const nameElement = screen.getByText(/Test Sensor/i);
  expect(nameElement).toBeInTheDocument();

  const valueElement = screen.getByText(/123unit/i);
  expect(valueElement).toBeInTheDocument();

  const sensorValueElement = screen.getByTestId("sensor-value");
  expect(sensorValueElement).toBeInTheDocument();
});
