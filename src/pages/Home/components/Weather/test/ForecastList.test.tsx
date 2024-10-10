import ForecastList from "../components/ForecastList.tsx";
import routeRender from "../../../../../util/test/render.tsx";
import { act } from "@testing-library/react";

test("ForecastList 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText, getByRole } = await routeRender(
    <ForecastList items={[]} />,
  );

  // Check if the date is rendered correctly
  const dateElement = getByText(/\d{1,2}\/\d{1,2}/); // Matches any date in the format "month/day"
  expect(dateElement).toBeInTheDocument();

  // Check if the scroll buttons are rendered correctly
  const leftScrollButton = getByRole("button", {
    name: /LeftChevronArrowIcon/i,
  });
  expect(leftScrollButton).toBeInTheDocument();

  const rightScrollButton = getByRole("button", {
    name: /RightChevronArrowIcon/i,
  });
  expect(rightScrollButton).toBeInTheDocument();
});

test("ForecastList 컴포넌트의 handleScroll 함수가 정상적으로 작동하는지 확인", async () => {
  const { user, getByRole, getByLabelText } = await routeRender(
    <ForecastList items={[]} />,
  );

  const initialDateLabel = getByLabelText("Date");
  console.log(initialDateLabel.textContent);
  expect(initialDateLabel).toHaveTextContent("4/23(화)");

  const rightScrollButton = getByRole("button", {
    name: /RightChevronArrowIcon/i,
  });
  await act(async () => {
    await user.click(rightScrollButton);
    await new Promise((r) => setTimeout(r, 1000));
  });
  expect(initialDateLabel).toHaveTextContent("4/24(수)");

  // Simulate a click event on the scroll buttons
  const leftScrollButton = getByRole("button", {
    name: /LeftChevronArrowIcon/i,
  });
  await act(async () => {
    await user.click(leftScrollButton);
    await new Promise((r) => setTimeout(r, 1000));
  });
  expect(initialDateLabel).toHaveTextContent("4/23(화)");
});

test("ForecastList 컴포넌트의 getDate 함수가 정상적으로 작동하는지 확인", async () => {
  const { getByText } = await routeRender(<ForecastList items={[]} />);

  // Check if the date is rendered correctly
  const dateElement = getByText(/\d{1,2}\/\d{1,2}/); // Matches any date in the format "month/day"
  expect(dateElement).toBeInTheDocument();

  // Check if the day of the week is rendered correctly
  const dayOfWeekElement = getByText(/([일월화수목금토])/); // Matches any day of the week in Korean
  expect(dayOfWeekElement).toBeInTheDocument();
});
