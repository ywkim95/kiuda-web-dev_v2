import { FC } from "react";
import SelectItem from "../CameraSearch/components/SelectItem.tsx";
import { CaptureInfoType } from "../../../../constant/type.ts";

interface DownloadImageItemProps {
  captureInfo: CaptureInfoType;
  onClick: (captureId: number) => void;
}

const DownloadImageItem: FC<DownloadImageItemProps> = ({
  captureInfo,
  onClick,
}) => {
  return (
    <SelectItem
      isSelected={captureInfo.selected}
      onClick={() => onClick(captureInfo.captureId)}
    >
      {captureInfo.captureTime}
    </SelectItem>
  );
};

export default DownloadImageItem;
