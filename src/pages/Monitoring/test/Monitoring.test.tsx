import routeRender from "../../../util/test/render.tsx";
import Monitoring from "../Monitoring.tsx";

describe("Monitoring Page tests", () => {
  test("Monitoring Page render", async () => {
    const { getByRole } = await routeRender(<Monitoring />);

    const monitoringElement = getByRole("heading", { name: "Monitoring Page" });

    expect(monitoringElement).toBeInTheDocument();
  });
});
