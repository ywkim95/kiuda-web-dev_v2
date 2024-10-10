import DashboardCommonHeader from "../DashboardCommonHeader.tsx";
import routeRender from "../../../../util/test/render.tsx";

describe("GraphHeader 컴포넌트", () => {
  test("GraphHeader 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    const { getByText } = await routeRender(
      <DashboardCommonHeader title="Test Title" />,
    );

    const titleElement = getByText(/Test Title/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("GraphHeader 컴포넌트의 이전 버튼이 정상적으로 작동하는지 확인", async () => {
    const handleClickPrev = vi.fn();
    const { user, getAllByRole } = await routeRender(
      <DashboardCommonHeader
        title="Test Title"
        onClickPrev={handleClickPrev}
      />,
    );

    const prevButton = getAllByRole("button")[0];
    await user.click(prevButton);

    expect(handleClickPrev).toHaveBeenCalled();
  });

  test("GraphHeader 컴포넌트의 다음 버튼이 정상적으로 작동하는지 확인", async () => {
    const handleClickNext = vi.fn();
    const { user, getAllByRole } = await routeRender(
      <DashboardCommonHeader
        title="Test Title"
        onClickNext={handleClickNext}
      />,
    );

    const nextButton = getAllByRole("button")[1];
    await user.click(nextButton);

    expect(handleClickNext).toHaveBeenCalled();
  });
});
