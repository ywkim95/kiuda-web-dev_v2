import { Dispatch, FC, SetStateAction, useState } from "react";
import P from "../../../../components/P.tsx";
import { getDownloadImages, queryClient } from "../../../../http/http.ts";
import PaginationImageModel from "../../../../models/Image/PaginationImageModel.ts";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";
import { useMutation } from "@tanstack/react-query";
import { fontWeight } from "../../../../constant/font.ts";
import ScrollDiv from "../../../../components/ScrollDiv/ScrollDiv.tsx";
import DownloadCamera from "./DownloadCamera.tsx";
import DownloadImageItem from "./DownloadImageItem.tsx";
import ImageModel from "../../../../models/Image/ImageModel.ts";
import {
  CaptureInfoType,
  DownloadInfoType,
} from "../../../../constant/type.ts";
import { DownloadStatus } from "../../../../constant/enum.ts";
import FarmModel from "../../../../models/Farm/FarmModel.ts";
import useCameraSearchStore from "../../../../store/useCameraSearchStore.ts";

interface DownloadModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsDownload: Dispatch<SetStateAction<boolean>>;
}

const DownloadModal: FC<DownloadModalProps> = ({
  setIsOpen,
  setIsDownload,
}) => {
    
    const {page} = useCameraSearchStore();
  const farmId = useGetFarmId();
  const farm = queryClient.getQueryData<FarmModel>([
    "farm",
    farmId,
  ]) as FarmModel;

  const data = queryClient.getQueryData<PaginationImageModel>([
    "farm",
    farmId,
    "Images",
      {page},
  ]) as PaginationImageModel;

  const transformData = (imageModels: ImageModel[]) => {
    const groupedData = imageModels.reduce(
      (prev, cur) => {
        if (!prev[cur.cameraId]) {
          prev[cur.cameraId] = [];
        }
        prev[cur.cameraId].push({
          captureId: cur.captureId,
          captureTime: cur.captureTime,
          base64Image: cur.base64Image,
          selected: false,
        });
        return prev;
      },
      {} as Record<number, CaptureInfoType[]>,
    );
    return Object.keys(groupedData).map((cameraId) => ({
      cameraId: Number(cameraId),
      selected: false,
      images: groupedData[parseInt(cameraId)],
    }));
  };

  const [DownloadInfos, setDownloadInfos] = useState<DownloadInfoType[]>(
    transformData(data.images),
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    setIsDownload(true);
    const filteredCaptureIds = DownloadInfos.flatMap((info) => {
        return info.images;
    }).filter((image) => image.selected).map((image) => image.captureId);
    await mutateAsync({_captureIds: filteredCaptureIds});
  };

  const handleClickedCamera = (cameraId: number) => {
    setDownloadInfos((prev) =>
      prev.map((info) => {
        if (info.cameraId === cameraId) {
          return {
            ...info,
            selected: !info.selected,
          };
        } else {
          return {
            ...info,
            selected: false,
          };
        }
      }),
    );
  };

  const handleClickImage = (captureId: number) => {
    setDownloadInfos((prev) =>
      prev.map((info) => ({
        ...info,
        images: info.images.map((captureInfo) => {
          if (captureInfo.captureId === captureId) {
            return {
              ...captureInfo,
              selected: !captureInfo.selected,
            };
          }
          return captureInfo;
        }),
      })),
    );
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({_captureIds}:{_captureIds: number[]}) => getDownloadImages({ _id: farmId, _captureIds }),
    onMutate: () => {
      setIsOpen(false);
    },
    onSettled: () => {
      setIsDownload(false);
    },
  });

  return (
    <div
      className={`absolute x(-100) y(30) r(4) b(1/--color-border) vbox gap(16) p(16) bg(white) z(10)`}
    >
      <div className="hbox">
        <div className="vbox gap(8)">
          <P fontWeight={fontWeight.BOLD} color="--color-nonActive">
            카메라
          </P>
          <ScrollDiv className="w(166) h(165) vbox py(4) b(1/--color-border) rl(4)">
            {DownloadInfos.map((info) => {
              const alias = farm.cameras.find(
                (camera) => camera.id === info.cameraId,
              )?.alias;

              const all = info.images.every((image) => image.selected);
              const none = info.images.every((image) => !image.selected);
              const status = all
                ? DownloadStatus.ALL
                : none
                  ? DownloadStatus.NONE
                  : DownloadStatus.SELECTED;

              return (
                <DownloadCamera
                  key={info.cameraId}
                  alias={alias ?? `카메라ID: ${info.cameraId}`}
                  onClick={handleClickedCamera}
                  cameraId={info.cameraId}
                  status={status}
                  selected={info.selected}
                />
              );
            })}
          </ScrollDiv>
        </div>
        <div className="vbox gap(8)">
          <P fontWeight={fontWeight.BOLD} color="--color-nonActive">
            일시
          </P>
          <ScrollDiv className="w(278) h(165) vbox gap(10) py(15) pl(23) b(--color-border) blw(0) rr(4) -webkit-scrollbar-track::rr(3)">
            {DownloadInfos.find((info) => info.selected)?.images.map(
              (captureInfo) => (
                <DownloadImageItem
                  key={captureInfo.captureId}
                  captureInfo={captureInfo}
                  onClick={handleClickImage}
                />
              ),
            ) ?? <P>선택된 카메라가 없습니다.</P>}
          </ScrollDiv>
        </div>
      </div>
      <div className="hbox(right)">
        <button
          className="w(74) h(48) rl(4) bg(--color-primary)"
          onClick={handleSave}
        >
          <P color="--color-box">저장</P>
        </button>
        <button
          className="w(74) h(48) rr(4) b(1) bc(--color-border) bg(--color-box)"
          onClick={handleClose}
        >
          <P>닫기</P>
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
