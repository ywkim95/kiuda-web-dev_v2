import { render, screen } from "@testing-library/react";
import ImageList from "../ImageList.tsx";

test("ImageList 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  const mockSetPage = vi.fn();

  render(<ImageList />);

  const renderedItems = screen.getAllByText(/카메라/i);

  expect(renderedItems.length).toBeGreaterThanOrEqual(18);
});
