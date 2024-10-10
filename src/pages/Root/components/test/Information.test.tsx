import routeRender from "../../../../util/test/render.tsx";
import Information from "../Information.tsx";
import { act } from "@testing-library/react";
test("Information 컴포넌트가 초기 상태에서 정상적으로 렌더링되는지 확인", async () => {
  const { getByTestId } = await routeRender(<Information />);

  const informationElement = getByTestId("information");
  expect(informationElement).toBeInTheDocument();
  expect(informationElement).toHaveClass("fixed bottom(60) right(60)");
});

test("Information 컴포넌트가 클릭 이벤트에 응답하여 상태를 변경하는지 확인", async () => {
  const { user, getByTestId, findByText } = await routeRender(<Information />);

  const informationElement = getByTestId("information");
  await act(async () => {
    await user.click(informationElement);
  });

  const detailedInformationElement =
    await findByText(/경기도 성남시 수정구 창업로43,/i);

  expect(detailedInformationElement).toBeInTheDocument();
});

test("Information 컴포넌트가 다시 클릭 이벤트에 응답하여 상태를 원래대로 돌리는지 확인", async () => {
  const { user, getByTestId, queryByText } = await routeRender(<Information />);

  const informationElement = getByTestId("information");
  await user.click(informationElement);
  await user.click(informationElement);

  const detailedInformationElement =
    queryByText(/경기도 성남시 수정구 창업로43,/i);
  expect(detailedInformationElement).not.toBeInTheDocument();
});
