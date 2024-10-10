import { render, screen } from "@testing-library/react";
import ImageItem from "../ImageItem.tsx";

describe("ImageItem Component", () => {
  test("ImgaeItem 컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
    render(<ImageItem index={0} />);

    expect(screen.getByText("카메라 01")).toBeInTheDocument();
    expect(screen.getByAltText("미리보기이미지")).toBeInTheDocument();
    expect(screen.getByTitle("TagIcon")).toBeInTheDocument();
    expect(screen.getByTitle("ExpandIcon")).toBeInTheDocument();
    expect(screen.getByTitle("SmallDownloadIcon")).toBeInTheDocument();
    expect(screen.getByText("2024-04-23")).toBeInTheDocument();
    expect(screen.getByText("|")).toBeInTheDocument();
    expect(screen.getByText("오전 8:00")).toBeInTheDocument();
  });
});
