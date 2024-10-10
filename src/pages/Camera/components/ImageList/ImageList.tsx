import ImageItem from "./ImageItem.tsx";
import { Dispatch, FC, SetStateAction } from "react";
import ImageModel from "../../../../models/Image/ImageModel.ts";
import { useGetFarmId } from "../../../../hooks/useFarmLoader.tsx";
import FarmModel from "../../../../models/Farm/FarmModel.ts";
import { queryClient } from "../../../../http/http.ts";
import { convertKSTToUTC, getDateTime } from "../../../../constant/date.ts";
import P from "../../../../components/P.tsx";

interface ImageListProps {
    images: ImageModel[];
    setIsDownload: Dispatch<SetStateAction<boolean>>;
}

const ImageList: FC<ImageListProps> = ({ images, setIsDownload }) => {
    const farmId = useGetFarmId();
    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;

    // 이미지와 카메라를 따로 받으면 어떤방법으로 이미지의 정보를 통하여 카메라 정보를 가져올지 고민해보기
    // 현재 방법으로는 이미지의 name에서 카메라 정보를 추출하는 방식으로...

    console.log(123123123);
    return (
        <div className="grid(6) gap(25) h(653)">
            {images.length !== 0 ? (
                Array.from({ length: 18 }).map((_, index) => {
                    const image = images[index] ?? undefined;
                    if (image) {
                        const camera = farm.cameras.find(
                            (camera) => camera.id === image.cameraId,
                        );
                        if (!camera) {
                            return null;
                        }
                        const captureTime = getDateTime(
                            convertKSTToUTC(image.captureTime),
                        );

                        return (
                            <ImageItem
                                key={`${index}-${image.captureId}`}
                                index={index}
                                cameraId={camera.id}
                                captureId={image.captureId}
                                name={image.base64Image}
                                time={captureTime.time}
                                date={captureTime.date}
                                alias={camera.alias}
                                setIsDownload={setIsDownload}
                            />
                        );
                    } else {
                        return <div key={index} className="h(201)"></div>;
                    }
                })
            ) : (
                <div className="w(100%) h(100%) vbox(pack) gap(8)">
                    <P>이미지가 없습니다.</P>
                </div>
            )}
        </div>
    );
};

export default ImageList;
