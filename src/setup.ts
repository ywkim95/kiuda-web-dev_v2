// // src/test/setup.ts
// // toBeInTheDocument API를 사용하기 위함.
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import handlers from "./__mock__/handler.ts";
import { setupServer } from "msw/node";
import ReactDOM from "react-dom";
//
// // 이거 주석 해제 하지 마세요 테스트 에러 일어납니다.
// // vi.mock('zustand');
//
export const server = setupServer(...handlers);

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
console.log("ResizeObserver has been mocked");

const MutationObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("MutationObserver", MutationObserverMock);

const IntersectionObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

export const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
  mockNavigate.mockClear();
});

afterAll(() => {
  vi.resetAllMocks();
  server.close();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(HTMLDivElement.prototype, "scrollTo", {
  configurable: true,
  value: function (options: ScrollToOptions) {
    this.scrollLeft =
      typeof options.left === "number" ? options.left : this.scrollLeft;
    this.scrollTop =
      typeof options.top === "number" ? options.top : this.scrollTop;
  },
});

HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

const originalCreatePortal = ReactDOM.createPortal;

vi.spyOn(ReactDOM, "createPortal").mockImplementation((element, container) => {
  if (!container || !(container instanceof HTMLElement)) {
    const containerElement = document.createElement("div");
    document.body.appendChild(containerElement);
    return originalCreatePortal(element, containerElement);
  }
  return originalCreatePortal(element, container);
});

const modalContainer = document.createElement("div");
modalContainer.id = "modal";
document.body.appendChild(modalContainer);
