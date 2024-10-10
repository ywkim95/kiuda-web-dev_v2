import { RefObject } from "react";
import ImageModel from "../../../../../models/Image/ImageModel.ts";

const ImageList = ({
  imageRef,
  imageList,
}: {
  imageRef: RefObject<HTMLDivElement>;
  imageList: ImageModel[];
}) => {
  return (
    <div ref={imageRef} className="h(fill) w(100%) clip hbox bg(white)">
      {imageList.map((image) => {
        
        return (
          <img
            data-testid="camera-image"
            key={image.cameraId}
            src={image.base64Image}
            alt={image.base64Image}
          />
        );
      })}
    </div>
  );
};

export default ImageList;
