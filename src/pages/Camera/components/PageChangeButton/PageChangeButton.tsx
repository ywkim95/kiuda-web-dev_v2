import { useState } from "react";
import P from "../../../../components/P.tsx";

const PageChangeButton = () => {
  const count = 10;
  const [thisPage, setThisPage] = useState(0);

  const onClickPage = (page: number) => {
    setThisPage(page);
  };

  const handleNext = () => {
    if (thisPage == count - 1) return;
    setThisPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (thisPage == 0) return;
    setThisPage((prevPage) => prevPage - 1);
  };

  const buttonStyle =
    "w(40) h(40) r(4) pack font(14) 400 user-select-none pointer";

  const dotStyle = "w(40) h(40) r(4) pack font(14) 400 user-select-none";

  const buttonRender = () => {
    const render = [];

    if (thisPage <= 6) {
      for (let i = 1; i < 11; i++) {
        render.push(
          <div
            onClick={() => onClickPage(i)}
            className={`${buttonStyle} ${i == thisPage ? "b(1) bc(#CED3D6) bg(#F8FAFB)" : ""}`}
          >
            {i}
          </div>,
        );
      }
      if (count > 10) render.push(<div className={dotStyle}>···</div>);
    } else if (thisPage > 6 && thisPage < count - 5) {
      render.push(<div className={dotStyle}>···</div>);
      for (let i = thisPage - 4; i <= thisPage + 4; i++) {
        render.push(
          <div
            onClick={() => onClickPage(i)}
            className={`${buttonStyle} ${i == thisPage ? "b(1) bc(#CED3D6) bg(#F8FAFB)" : ""}`}
          >
            {i}
          </div>,
        );
      }
      if (count > 10) render.push(<div className={dotStyle}>···</div>);
    } else if (thisPage >= count - 5) {
      if (count > 10) render.push(<div className={dotStyle}>···</div>);
      for (let i = count - 9; i <= count; i++) {
        render.push(
          <div
            onClick={() => onClickPage(i)}
            className={`${buttonStyle} ${i == thisPage ? "b(1) bc(#CED3D6) bg(#F8FAFB)" : ""}`}
          >
            {i}
          </div>,
        );
      }
    }

    return render;
  };

  return (
    <div className="fixed bottom(60) hbox pack gap(20)">
      {count > 1 && (
        <button className="user-select-none" onClick={handlePrev}>
          <P>이전</P>
        </button>
      )}
      <div className="hbox">{buttonRender()}</div>
      {count > 1 && (
        <button className="user-select-none" onClick={handleNext}>
          다음
        </button>
      )}
    </div>
  );
};

export default PageChangeButton;
