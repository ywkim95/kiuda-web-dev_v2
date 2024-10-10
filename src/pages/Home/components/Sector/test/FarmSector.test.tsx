import FarmSector from "../components/FarmSector.tsx";
import dummyFarmData from "../../../../../dummys/DummyFarmData.ts";
import routeRender from "../../../../../util/test/render.tsx";

test("FarmSector 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const farmSector = dummyFarmData.sectors[1];

  const { getByText } = await routeRender(
    <FarmSector farmSector={farmSector} />,
  );

  const textElement = getByText("1-3");
  expect(textElement).toBeInTheDocument();
});
