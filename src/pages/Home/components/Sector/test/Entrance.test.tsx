import { act } from "@testing-library/react";
import EntranceLine from "../components/EntranceLine.tsx";
import { FarmEntranceModel } from "../../../../../models/Farm/FarmModel.ts";
import { cloneElement } from "react";
import LeftEntranceArrowIcon from "../../../../../components/svg/LeftEntranceArrowIcon.tsx";
import routeRender from "../../../../../util/test/render.tsx";

const mockEntranceList: FarmEntranceModel[] = [
  { id: 1, direction_id: 1, position_number: 1 },
  { id: 2, direction_id: 1, position_number: 2 },
  // 필요에 따라 더 많은 모의 데이터를 추가하세요
];

test("Entrance 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const { getByTestId } = await routeRender(
    <EntranceLine length={2} direction={1} EntranceList={mockEntranceList}>
      {(color) => cloneElement(<LeftEntranceArrowIcon />, { color })}
    </EntranceLine>,
  );

  // 정확한 수의 자식 요소가 렌더링되는지 확인
  const children = getByTestId("arrow-div-0");
  expect(children).toBeTruthy();
});

test("Entrance 컴포넌트의 handleList 함수가 정상적으로 작동하는지 확인", async () => {
  const { user, getByTestId } = await routeRender(
    <EntranceLine
      length={2}
      direction={1}
      EntranceList={mockEntranceList}
      isSetting={true}
    >
      {(color) => cloneElement(<LeftEntranceArrowIcon />, { color })}
    </EntranceLine>,
  );

  // 첫 번째 자식 요소에서 클릭 이벤트를 시뮬레이션
  const firstChild = getByTestId("arrow-div-0");
  const oldSvg = firstChild?.firstChild as SVGSVGElement;
  const oldPath = oldSvg.firstChild as SVGPathElement;
  const oldFillColor = oldPath!.getAttribute("fill");
  expect(oldFillColor).toBe("#149F48");
  await act(async () => {
    await user.click(firstChild);
  });
  const svg = firstChild?.firstChild as SVGSVGElement;
  const path = svg.firstChild as SVGPathElement;

  const fillColor = path!.getAttribute("fill");
  expect(fillColor).toBe("#878D91");
});
