import routeRender from "../../../../../util/test/render.tsx";
import CameraContainer from "../CameraContainer.tsx";
import { act } from "@testing-library/react";
test("Camera 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByText } = await routeRender(<CameraContainer />);

  // Assuming '카메라 01' is a text that is rendered by the Camera component
  const cameraElement = getByText("카메라 01");
  expect(cameraElement).toBeInTheDocument();
});

test("Camera 컴포넌트의 이미지는 3장이다.", async () => {
  const { getAllByTestId } = await routeRender(<CameraContainer />);
  const cameraImage = getAllByTestId("camera-image");
  expect(cameraImage).toHaveLength(3);
});

test("Camera 컴포넌트의 왼쪽 화살표 클릭시 카메라 03이 보여야 한다.", async () => {
  const { user, getByTestId } = await routeRender(<CameraContainer />);
  const cameraName = getByTestId("camera-name");
  const leftArrow = getByTestId("LeftButton");
  await act(async () => {
    await user.click(leftArrow);
    await new Promise((r) => setTimeout(r, 1000));
  });
  expect(cameraName).toHaveTextContent("카메라 03");
});

// TODO: Fix the test
// test("Camera 컴포넌트의 오른쪽 화살표 클릭시 카메라 02이 보여야 한다.", async () => {
//   const { user, getByTestId, getAllByRole } = await routeRender(<Camera />);
//   const cameraName = getByTestId("camera-name");
//   const rightArrow = getByTestId("RightButton");
//   console.log(cameraName.textContent);
//
//   await act(async () => {
//     await user.click(rightArrow);
//     await new Promise((r) => setTimeout(r, 1000));
//   });
//   console.log(cameraName.textContent);
//   await waitFor(() => {
//     expect(cameraName).toHaveTextContent("커스텀 카메라");
//   });
// });
