import { renderHook, act } from "@testing-library/react";
import useScrollBar from "../useScrollBar.tsx";
import { MouseEvent as ReactMouseEvent } from "react";

test("useScrollBar 커스텀 훅이 정상적으로 작동하는지 확인", () => {
  const { result } = renderHook(() => useScrollBar());

  // Check if the hook returns the correct initial values
  expect(result.current.containerRef).toBeDefined();
  expect(result.current.contentRef).toBeDefined();
  expect(result.current.scrollbarRef).toBeDefined();
  expect(result.current.handleScrollbarDrag).toBeInstanceOf(Function);

  // Simulate a scroll event
  act(() => {
    const event = new Event("scroll");
    result.current.contentRef.current?.dispatchEvent(event);
  });

  // Simulate a mouse event
  act(() => {
    const event = new MouseEvent("mousedown", { clientY: 100 });
    const reactEvent = event as unknown as ReactMouseEvent<HTMLDivElement>;
    result.current.handleScrollbarDrag(reactEvent);
  });
});
