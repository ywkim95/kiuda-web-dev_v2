import GraphDashboard from "../../pages/Sector/components/Graph/GraphDashboard.tsx";
import routeRender from "../../../../util/test/render.tsx";
import useModalStore from "../../../../store/useModalStore.ts";
import { dateOptions } from "../../../../constant/date.ts";

const initialState = useModalStore.getState();

describe("GraphSector component tests", () => {
  beforeEach(() => {
    useModalStore.setState(initialState, true);
  });
  test("GraphSector 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { getByText } = await routeRender(<GraphDashboard />);

    const titleElement = getByText(/토양온도/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("GraphSector 컴포넌트의 드롭다운이 정상적으로 작동하는지 확인", async () => {
    const { user, getByText } = await routeRender(<GraphDashboard />);

    const dropdownElement = getByText(dateOptions[1].text);
    await user.click(dropdownElement);

    const dropdownOption = getByText(dateOptions[0].text);
    await user.click(dropdownOption);

    expect(dropdownElement.textContent).toBe(dateOptions[0].text);
  });
});
