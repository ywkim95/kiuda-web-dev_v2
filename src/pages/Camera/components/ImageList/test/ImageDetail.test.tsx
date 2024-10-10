import userEvent from "@testing-library/user-event";
import ImageItem from "../ImageItem.tsx";
import { render, screen } from "@testing-library/react";
import ImageDetail from "../ImageDetail.tsx";

test("ImageItem의 버튼이 정상적으로 ImageDetail컴포넌트를 렌더링하는지 확인", async () => {
  const { getByRole } = render(<ImageItem index={0} />);

  const expandButton = getByRole("button", { name: /expand/i });
  userEvent.click(expandButton);

  const modal = screen.getByAltText(/이미지/i);

  expect(modal).toBeInTheDocument();
});

test("ImageDetail컴포넌트가 정상적으로 렌더링되는지 확인", async () => {
  render(<ImageDetail isOpen={true} />);

  const RgbNir12 = screen.getByText(/RGB/i || /NIR1/i || /NIR2/i);
  const Camera = screen.getByText(/카메라/i);
  const Image = screen.getByAltText(/이미지/i);
  const DateTime = screen.getByText(
    /20/i &&
      (/0/i || /1/i) &&
      (/0/i || /1/i || /2/i || /3/i) &&
      (/오전/i || /오후/i),
  );
  const DownloadButton = screen.getByTitle(/DownloadIcon/i);
  const leftArrow = screen.getByTitle(/LeftChevronArrowIcon/i);
  const rightArrow = screen.getByTitle(/RightChevronArrowIcon/i);

  expect(RgbNir12).toBeInTheDocument();
  expect(Camera).toBeInTheDocument();
  expect(DateTime).toBeInTheDocument();
  expect(Image).toBeInTheDocument();
  expect(DownloadButton).toBeInTheDocument();
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});
