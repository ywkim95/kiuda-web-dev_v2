import routeRender from "../../../util/test/render.tsx";
import CameraPage from "../Camera.tsx";

describe("Camera Page tests", () => {
  test("Camera Page render", async () => {
    const { getByText } = await routeRender(<CameraPage />);

    const element = getByText(/Camera Page/i);
    expect(element).toBeInTheDocument();
  });
});
