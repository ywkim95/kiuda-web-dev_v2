import React, { SetStateAction, useEffect, useState } from "react";
import DownloadIcon from "../../../../components/svg/DownloadIcon.tsx";
import LeftChevronArrowIcon from "../../../../components/svg/LeftChevronArrowIcon.tsx";
import RightChevronArrowIcon from "../../../../components/svg/RightChevronArrowIcon.tsx";
import CloseButtonIcon from "../../../../components/svg/CloseButtonIcon.tsx";

const ImageDetail = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [imgNum, setImgNum] = useState(0);
  const [image, setImage] = useState("public\\assets\\images\\rgb.jpg");

  useEffect(() => {
    if (imgNum === 0) {
      setImage("assets\\images\\rgb.jpg");
    } else if (imgNum === 1) {
      setImage("assets\\images\\nir1.jpg");
    } else if (imgNum === 2) {
      setImage("assets\\images\\nir2.jpg");
    }
  }, [imgNum]);

  const onClickLeft = () => {
    if (imgNum == 0) {
      setImgNum(2);
    } else {
      setImgNum(imgNum - 1);
    }
  };

  const onClickRight = () => {
    if (imgNum == 2) {
      setImgNum(0);
    } else {
      setImgNum(imgNum + 1);
    }
  };

  const onClickClose = () => {
    if (setIsOpen != undefined) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`${isOpen ? "" : "none"}`}>
      <div className="absolute bg(#bfbfbf) opacity(0.5) w(100vw) h(100vh) top(0) left(0) z(20)"></div>
      <div className="hbox ai(normal) z(21) absolute top(50%) left(50%) ml(-465) mt(-404)">
        <div className="w(930) h(808) r(12) pt(60) bg(white)">
          <div className="hbox pack justify-between px(72) mb(24)">
            <div className="w(17) hidden">a</div>
            <div className="vbox pack">
              <div
                className="font(26) 700 c(#4D5256) mb(16) user-select-none"
                aria-label="RNNInfo"
              >
                {imgNum == 0 ? "RGB" : imgNum == 1 ? "NIR1" : "NIR2"}
              </div>
              <div className="font(14) 400 c(#4D5256) hbox">
                <div className="font(14) 400 c(#4D5256)">카메라 01</div>
                <div className="mx(5) font(14) 400 c(#4D5256)"> | </div>
                <div className="font(14) 400 c(#4D5256)">
                  2024-04-23 오전 8:00
                </div>
              </div>
            </div>
            <div className="w(17) h(20)">
              <DownloadIcon />
            </div>
          </div>
          <div className="hbox pack">
            <div className="mr(16) pointer" onClick={onClickLeft}>
              <LeftChevronArrowIcon />
            </div>
            <div className="w(828) h(620) user-select-none">
              <img src={image} alt="자세한이미지" />
            </div>
            <div className="ml(16) pointer" onClick={onClickRight}>
              <RightChevronArrowIcon />
            </div>
          </div>
        </div>
        <div className="ml(15) mt(16) pointer h(32)" onClick={onClickClose}>
          <CloseButtonIcon />
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
