import LoadingButton from "../../Loading/LoadingButton.tsx";
import P from "../../../components/P.tsx";
import ImageList from "./ImageList/ImageList.tsx";
import PageButtonList from "../../Home/components/Alarm/components/PageButtonList.tsx";
import { useState } from "react";
import CameraDateSelectButton from "./CameraSearch/components/CameraDateSelectButton.tsx";
import DownloadButtonList from "./ImageDownload/DownloadButtonList.tsx";
import SettingIcon from "../../../components/svg/SettingIcon.tsx";
import useModalStore from "../../../store/useModalStore.ts";
import ModalType from "../../../components/Modal/ModalType.ts";
import useImagePagination from "./useImagePagination.tsx";
import LoadingIMGDL from "./ImageList/LoadingIMGDL.tsx";
import useCameraSearchStore from "../../../store/useCameraSearchStore.ts";

const ImageContainer = () => {
  const [isDownload, setIsDownload] = useState(false);
    const {page, setPage} = useCameraSearchStore();

  const { setModal } = useModalStore();

  const { data, isPending, isError, error } = useImagePagination(page);

  const handleClickSetting = () => {
    setModal(ModalType.CameraSetting);
  };

  const handleClickSearch = () => {
    setModal(ModalType.CameraSearch);
  };

  let content;

  if (isPending) {
    content = (
      <div className="w(100%) h(738) vbox(center+middle) gap(8)">
        <LoadingButton />
        <P>자료를 불러오는 중입니다...</P>
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="h(738) w(1240) pack bg(--color-background)">
        <h1>{error?.code}</h1>
        <p>{error?.message}</p>
      </div>
    );
  }

  if (data) {
    const pageLength = Math.ceil(data.count / 15);
    const captureIds = data.images.map((image) => image.captureId);
    content = (
      <>
        <div className="hbox justify-between h(56) w(100%)">
          <CameraDateSelectButton onClick={handleClickSearch}>
            카메라 / 일시 선택
          </CameraDateSelectButton>
          <div className="hbox gap(16) h(22)">
            <DownloadButtonList
              captureIds={captureIds}
              setIsDownload={setIsDownload}
            />
            <button onClick={handleClickSetting}>
              <SettingIcon />
            </button>
          </div>
        </div>
        <ImageList images={data.images} setIsDownload={setIsDownload} />
        <PageButtonList
          page={page}
          setPage={setPage}
          pageLength={pageLength}
          className="mt(30)"
        />
        {isDownload && <LoadingIMGDL />}
      </>
    );
  }

  return <>{content}</>;
};

export default ImageContainer;
