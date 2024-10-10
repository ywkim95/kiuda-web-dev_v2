import {ChangeEvent, Dispatch, FC, /*MouseEvent as ReactMouseEvent,*/ SetStateAction, useCallback, useState,} from "react";
import TagIcon from "../../../../components/svg/TagIcon.tsx";
import ExpandIcon from "../../../../components/svg/ExpandIcon.tsx";
import SmallDownloadIcon from "../../../../components/svg/SmallDownloadIcon.tsx";
import Span from "../../../../components/Span.tsx";
import {fontSize, fontWeight} from "../../../../constant/font.ts";
import {BorderRadius} from "../../../../constant/border.ts";
import useModalStore from "../../../../store/useModalStore.ts";
import ModalType from "../../../../components/Modal/ModalType.ts";
import useCameraDetailStore from "../../../../store/useCameraDetailStore.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getCameraSetting, getDownloadImage, patchCameraSetting,} from "../../../../http/http.ts";
import {useGetFarmId} from "../../../../hooks/useFarmLoader.tsx";
import P from "../../../../components/P.tsx";
import CameraSettingModel from "../../../../models/Image/CameraSettingModel.ts";
import {oneHour} from "../../../../constant/date.ts";
/*import {calculateSectorId} from "../../../../util/SectorUtils.ts";*/

interface ImageItemProps {
    cameraId: number;
    captureId: number;
    name: string;
    alias: string;
    date: string;
    time: string;
    setIsDownload: Dispatch<SetStateAction<boolean>>;
    index: number;
}

const ImageItem: FC<ImageItemProps> = ({
                                           cameraId,
                                           captureId,
                                           name,
                                           alias,
                                           date,
                                           time,
                                           setIsDownload,
                                           index,
                                       }) => {
    const farmId = useGetFarmId();
    const {setCaptureId} = useCameraDetailStore();
    const {setModal} = useModalStore();
    const [isHover, setIsHover] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [modifiedAlias, setModifiedAlias] = useState<string | undefined>(alias);
    /*const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });*/

    const {mutateAsync: downloadImage} = useMutation({
        mutationFn: () => getDownloadImage({_id: farmId, _captureId: captureId}),
        onSettled: () => {
            setIsDownload(false);
        },
    });

    const {mutateAsync: patchSetting} = useMutation({
        mutationFn: ({
                         cameraSettings,
                     }: {
            cameraSettings: CameraSettingModel[];
        }) => patchCameraSetting({_id: farmId, cameraSettings}),
    });

    const {data: cameraSettingData} = useQuery({
        queryKey: ["farm", farmId, "CameraSetting"],
        queryFn: ({signal}) => getCameraSetting({signal, _id: farmId}),
        enabled: isEdit && modifiedAlias !== alias,
        refetchOnWindowFocus: false,
        staleTime: oneHour,
    });

    const handleDetail = useCallback(() => {
        setCaptureId(captureId);
        setModal(ModalType.CameraDetail);
        // setModalOpen(true);
    }, [captureId, setCaptureId, setModal]);

    const handleNameModi = useCallback(() => {
        setIsEdit(true);
    }, []);

    const handleNameDone = useCallback(async () => {
        // apiCall

        const cameraSetting = cameraSettingData?.find(
            (item) => item.id === cameraId,
        );

        if (!cameraSetting) {
            alert("카메라 정보를 찾을 수 없습니다.");
            return;
        }

        if (!modifiedAlias) {
            alert("변경할 이름을 입력해주세요.");
            return;
        }

        setIsEdit(false);

        const newSetting: CameraSettingModel = {
            ...cameraSetting,
            alias: modifiedAlias,
        };
        setModifiedAlias(undefined);

        try {
            await patchSetting({cameraSettings: [newSetting]});
        } catch (e) {
            console.error(e);
        }
    }, [cameraId, cameraSettingData, modifiedAlias, patchSetting]);

    const handleNameCancel = useCallback(() => {
        setIsEdit(false);
        setModifiedAlias(alias);
    }, [alias]);

    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setModifiedAlias(e.target.value);
    }, []);

    const handleDownload = useCallback(async () => {
        setIsDownload(true);
        await downloadImage();
    }, [downloadImage, setIsDownload]);

    const hoverOn = useCallback(() => setIsHover(true), []);

    const hoverOff = useCallback(() => setIsHover(false), []);
    
    
    const prevPosX = () => {
        const pos = index < 3 ? 0 : index < 6 ? 1 : index < 9 ? 0 : index < 12 ? 1 : index < 15 ? 0 : 1;
        
        switch(pos){
            case 0:
                return "left(23)";
            case 1:
                return "right(463)"
            default:
                return "left(23)";
        }
    }
    
    const prevPosY = () => {
        const pos = index < 6 ? 0 : index < 12 ? 1 : 2;

        // top(-45)
        // top(-228.5)
        // top(-411)
        
        switch (pos) {
            case 0:
                return "top(-45)";
            case 1:
                return "top(-228.5)";
            case 2:
                return "top(-411)";
            default:
                return "top(-45)";
        }
    }

    /*const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
        setMousePosition({x: e.clientX, y: e.clientY});
    }, []);*/

    return (
        <>
            <div
                className={`w(186) h(201) b(1/--color-background) r(${BorderRadius.MAIN}) box-shadow(4/12/30/0/#00000017) /*overflow(hidden)*/`}
            >
                <div
                    className={`w(100%) h(fill) vbox gap(${isEdit ? "8" : "10"}) p(15) justify-between`}
                >
                    <div className="hbox justify-between">
                        {isEdit ? (
                            <div className="w(85) h(fill)">
                                <input
                                    value={modifiedAlias}
                                    onChange={handleNameChange}
                                    className={`w(100%) h(100%) font-size(${fontSize.MEDIUM}) font-weight(${fontWeight.BOLD}) guide(var(--color-primary)) b(none) r(${BorderRadius.INPUT}) p(0/5) m(0)`}
                                    maxLength={6}
                                />
                            </div>
                        ) : (
                            <Span fontWeight={fontWeight.BOLD} className="user-select-none overflow(hidden) w(80) h(14)" onClick={() => navigator.clipboard.writeText(alias)}>
                                {
                                    /*alias*/
                                    /*index*/
                                }
                                {
                                    alias.length > 6 ? alias.substring(0, 6) + "..." : alias
                                }
                            </Span>
                        )}
                        <div className="hbox gap(10.7) w(61) h(13)">
                            {isEdit ? (
                                <>
                                    <button onClick={handleNameDone}>
                                        <P color="--color-primary" fontWeight={fontWeight.BOLD}>
                                            저장
                                        </P>
                                    </button>
                                    <button onClick={handleNameCancel}>
                                        <P fontWeight={fontWeight.BOLD}>취소</P>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="h(13)" onClick={handleNameModi}>
                                        <TagIcon/>
                                    </button>
                                    <button className="h(13)" onClick={handleDownload}>
                                        <SmallDownloadIcon/>
                                    </button>
                                    <button className="h(13)" onClick={handleDetail}>
                                        <ExpandIcon/>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hbox">
                        <Span
                            fontSize={fontSize.SMALL}
                            fontWeight={fontWeight.BOLD}
                            className="user-select-none"
                        >
                            {date} | {time}
                        </Span>
                    </div>
                </div>
                <div
                    className="w(100%) h(fill) text(pack)"
                    /*onMouseMove={handleMouseMove}*/
                    onMouseOver={hoverOn}
                    onMouseLeave={hoverOff}
                >
                    <img src={name} alt="썸네일" className={`user-select-none rb(${BorderRadius.MAIN})`}/>
                </div>
                {/* 이미지 hover로 띄워주는곳 이후에 ref를 이용하여 마우스르 따라다니게 만들기 */}
                {/* top(${mousePosition.y + 30}) left(${mousePosition.x + 30})  b(1/#F1F5F5) b(1/#fc032c) ${prevPos()} */}
                <div
                    className={`relative translateX(100) ${prevPosY()} ${prevPosX()} w(424) h(318) pointer-events-none ${isHover ? "" : "none"} b(1/#F1F5F5) r(13)`}
                >
                    <img src={name} alt="미리보기이미지" className="user-select-none r(13)"/>
                </div>
            </div>
        </>
    );
};

export default ImageItem;
