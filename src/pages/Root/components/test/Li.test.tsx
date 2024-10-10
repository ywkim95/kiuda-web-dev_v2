import { render, screen } from "@testing-library/react";
import Li from "../Navigation/Li.tsx";

test("Li 컴포넌트가 정상적으로 렌더링되는지 확인", () => {
  render(
    <Li id="test-id" className="test-class">
      테스트
    </Li>,
  );

  const liElement = screen.getByText("테스트");
  expect(liElement).toBeInTheDocument();
  expect(liElement).toHaveClass("test-class");
  expect(liElement.id).toBe("test-id");
});
