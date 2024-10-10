import DownloadCameraStatus1 from "../../../../components/svg/DownloadCameraStatus1.tsx";
import DownloadCameraStatus2 from "../../../../components/svg/DownloadCameraStatus2.tsx";
import DownloadCameraStatus3 from "../../../../components/svg/DownloadCameraStatus3.tsx";
import P from "../../../../components/P.tsx";
import { FC } from "react";
import { DownloadStatus } from "../../../../constant/enum.ts";

interface DownloadCameraProps {
  cameraId: number;
  alias: string;
  onClick: (cameraId: number) => void;
  status: DownloadStatus;
  selected: boolean;
}

const DownloadCamera: FC<DownloadCameraProps> = ({
  cameraId,
  alias,
  onClick,
  status,
  selected,
}) => {
  let icon;
  if (status === DownloadStatus.NONE) {
    icon = <DownloadCameraStatus3 />;
  } else if (status === DownloadStatus.SELECTED) {
    icon = <DownloadCameraStatus2 />;
  } else {
    icon = <DownloadCameraStatus1 />;
  }

  const handleCamera = () => {
    onClick(cameraId);
  };

  return (
    <button
      className={`hbox w(100%) h(40) bg(${selected ? "--color-background" : "white"})`}
      onClick={handleCamera}
    >
      <div className="hbox text(pack) gap(8) w(80%) h(36)">
        {icon}
        <P>{alias}</P>
      </div>
    </button>
  );
};

export default DownloadCamera;
