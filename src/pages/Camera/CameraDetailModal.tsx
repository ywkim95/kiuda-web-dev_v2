import Modal from "../../components/Modal/Modal.tsx";
import useModalStore from "../../store/useModalStore.ts";
import ModalType from "../../components/Modal/ModalType.ts";
import CloseButtonIcon from "../../components/svg/CloseButtonIcon.tsx";
import { BorderRadius } from "../../constant/border.ts";
import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
import Span from "../../components/Span.tsx";
import RightChevronArrowIcon from "../../components/svg/RightChevronArrowIcon.tsx";
import LeftChevronArrowIcon from "../../components/svg/LeftChevronArrowIcon.tsx";
import useCameraDetailStore from "../../store/useCameraDetailStore.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useGetFarmId } from "../../hooks/useFarmLoader.tsx";
import { getImageDetail, queryClient } from "../../http/http.ts";
import LoadingButton from "../Loading/LoadingButton.tsx";
import { useState } from "react";
import { imageDownload } from "../../util/Util.ts";
import { ImageType } from "../../constant/type.ts";
import PaginationImageModel from "../../models/Image/PaginationImageModel.ts";
import FarmModel from "../../models/Farm/FarmModel.ts";
import DownloadIcon from "../../components/svg/DownloadIcon.tsx";
import { convertKSTToUTC, getDateTime, oneHour } from "../../constant/date.ts";
import useCameraSearchStore from "../../store/useCameraSearchStore.ts";

const CameraDetailModal = () => {
    const farmId = useGetFarmId();
    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;

    const { setCaptureId, captureId } = useCameraDetailStore();
    const { modal, setModal } = useModalStore();
    const { page } = useCameraSearchStore();

    const [index, setIndex] = useState(0);

    const handleCloseModal = () => {
        setCaptureId(undefined);
        setModal(undefined);
    };
    // useQuery
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["farm", farmId, "Images", { captureId }],
        queryFn: ({ signal }) =>
            getImageDetail({ signal, _id: farmId, _captureId: captureId! }),
        staleTime: oneHour,
        retry: 1,
        placeholderData: keepPreviousData,
        enabled: captureId !== undefined && modal === ModalType.CameraDetail,
        refetchOnWindowFocus: false,
        select: (data) => data.sort((a, b) => a.channel - b.channel),
    });

    const handleRight = () => {
        if (index < data!.length - 1) {
            setIndex(index + 1);
        }
    };

    const handleLeft = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const handleDownload = (sectorName: string, type: string, time: string) => {
        imageDownload(data![index].imageString, sectorName, type, time);
    };

    let content;

    if (isPending) {
        content = (
            <div className="w(100%) h(100%) vbox(center+middle) gap(8)">
                <LoadingButton />
                <P>자료를 불러오는 중입니다...</P>
            </div>
        );
    }

    if (isError) {
        content = (
            <div className="h(100%) w(100%) pack bg(--color-background)">
                <h1>{error?.code}</h1>
                <P>{error?.message}</P>
            </div>
        );
    }

    if (data) {
        const cameraInfo = queryClient.getQueryData<PaginationImageModel>([
            "farm",
            farmId,
            "Images",
            { page },
        ]);

        if (!cameraInfo) {
            content = (
                <div>
                    <P>카메라 정보가 없습니다.</P>
                </div>
            );
        } else {
            const image = cameraInfo.images.find(
                (image) => image.captureId === captureId,
            );
            const camera = farm.cameras.find(
                (camera) => camera.id === captureId,
            );
            if (!image) {
                content = (
                    <div>
                        <P>이미지 정보가 없습니다.</P>
                    </div>
                );
            } else {
                const captureInfo = getDateTime(
                    convertKSTToUTC(image.captureTime),
                );
                content = (
                    <div className="vbox(center) gap(16) user-select-none">
                        <P
                            fontWeight={fontWeight.BOLD}
                            fontSize={fontSize.ExtraBIG}
                        >
                            {ImageType[data[index].channel]}
                        </P>
                        <div className="hbox gap(5)">
                            <Span>{camera?.alias}</Span>
                            <Span>|</Span>
                            <Span>
                                {captureInfo.date} {captureInfo.time}
                            </Span>
                        </div>
                        <div className="hbox gap(9.5)">
                            <button onClick={handleLeft}>
                                <LeftChevronArrowIcon
                                    height="32"
                                    width="32"
                                    isOver={true}
                                />
                            </button>
                            <div className="w(828) h(620) user-select-none">
                                <img
                                    src={data[index].imageString}
                                    alt="자세한이미지"
                                />
                            </div>
                            <button onClick={handleRight}>
                                <RightChevronArrowIcon
                                    height="32"
                                    width="32"
                                    isOver={true}
                                />
                            </button>
                        </div>
                        <button
                            onClick={() =>
                                handleDownload(
                                    camera?.alias ?? "",
                                    ImageType[data[index].channel],
                                    `${captureInfo.date}_${captureInfo.time.substring(0, 5)}시`,
                                )
                            }
                            className="absolute(~150,80) "
                        >
                            <DownloadIcon />
                        </button>
                    </div>
                );
            }
        }
    }

    return (
        <Modal
            open={modal === ModalType.CameraDetail}
            onClose={handleCloseModal}
            className={`w(1100) h(808) bg(transparent) b(none) m(auto) pack focus:b(none)+outline(none)`}
        >
            <div
                className={`w(930) h(100%) p(60/16) bg(white) r(${BorderRadius.MAIN})`}
            >
                {content}
                <button
                    className="fixed(~20,16)"
                    onClick={handleCloseModal}
                    data-testid="close-button"
                >
                    <CloseButtonIcon />
                </button>
            </div>
        </Modal>
    );
};

export default CameraDetailModal;
