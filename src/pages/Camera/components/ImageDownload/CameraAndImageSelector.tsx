import DownloadCamera from "./DownloadCamera.tsx";
import DownloadImageItem from "./DownloadImageItem.tsx";
import P from "../../../../components/P.tsx";
import { fontWeight } from "../../../../constant/font.ts";
import ScrollDiv from "../../../../components/ScrollDiv/ScrollDiv.tsx";

const CameraAndImageSelector = (props: any) => {
  const { cameraCount, imageCount } = props;

  const cameraRender = () => {
    const render = [];

    for (let i = 0; i < cameraCount; i++) {
      render.push(
        <DownloadCamera status={2} cameraIndex={i + 1} select={false} />,
      );
    }
    return render;
  };

  const imageRender = () => {
    const render = [];

    for (let i = 0; i < imageCount; i++) {
      render.push(
        <DownloadImageItem
          checked={false}
          itemIndex={i}
          title={`2024-04-23 오전 11:00`}
        />,
      );
    }

    return render;
  };

  return (
    <div className="hbox">
      <div className="vbox gap(8)">
        <P fontWeight={fontWeight.BOLD} color="--color-nonActive">
          카메라
        </P>
        <ScrollDiv className="w(166) h(165) vbox gap(20) py(20) pl(24) b(1/--color-border) rl(4)">
          {cameraRender()}
        </ScrollDiv>
      </div>
      <div className="vbox gap(8)">
        <P fontWeight={fontWeight.BOLD} color="--color-nonActive">
          일시
        </P>
        <ScrollDiv className="w(278) h(165) vbox gap(10) py(15) pl(23) b(--color-border) blw(0) rr(4) -webkit-scrollbar-track::rr(3)">
          {imageRender()}
        </ScrollDiv>
      </div>
    </div>
  );
};

export default CameraAndImageSelector;
