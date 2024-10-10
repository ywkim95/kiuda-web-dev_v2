import ImageList from "./components/ImageList.tsx";
import CameraButtons from "./components/CameraButtons.tsx";
import useScrollHook from "../../hooks/useScrollHook.tsx";
import CameraModel from "../../../../models/Image/CameraModel.ts";
import {FC} from "react";
import ImageModel from "../../../../models/Image/ImageModel.ts";

interface CameraContainerProps {
    cameras: CameraModel[];
    images: ImageModel[];
}

const CameraContainer:FC<CameraContainerProps> = ({cameras, images}) => {

  const { index, handleScroll, scrollRef } = useScrollHook({
    length: images.length,
    scrollValue: 450,
    isInfinite: true,
  });

  const cameraId = images[index].cameraId;

  const name =
    cameras.find((camera) => camera.id === cameraId)?.alias ?? "";

  return (
    <>
      <div className="width(100%) height(46px) relative text(pack)">
        <CameraButtons handleScroll={handleScroll} name={name} />
      </div>
      <ImageList imageRef={scrollRef} imageList={images} />
    </>
  );
};

export default CameraContainer;
