import SelectedItem from "./SelectedItem";
import CameraSettingScrollBox from "../../SettingModal/CameraSettingScrollBox.tsx";
import ResetButton from "./ResetButton.tsx";
import useCameraSearchStore from "../../../../../store/useCameraSearchStore.ts";
import { getStringDateRange } from "../../../../../constant/date.ts";
import P from "../../../../../components/P.tsx";

const SelectedOptions = () => {
    const {
        cameraList,
        dateRangeList,
        timeList,
        setCameraList,
        setDateRangeList,
        setTimeList,
    } = useCameraSearchStore((state) => ({
        cameraList: state.cameraList,
        dateRangeList: state.dateRangeList,
        timeList: state.timeList,
        setCameraList: state.setCameraList,
        setDateRangeList: state.setDateRangeList,
        setTimeList: state.setTimeList,
    }));

    const handleRemoveDateRange = (alias: string) => {
        const newList = dateRangeList.filter(
            (date) => getStringDateRange(date.start, date.end) !== alias,
        );
        console.log(newList);
        setDateRangeList(newList);
    };

    const handleRemoveCamera = (alias: string) => {
        const tempList = [...cameraList];
        const index = tempList.findIndex((camera) => camera.alias === alias);
        tempList[index].selected = !tempList[index].selected;
        setCameraList(tempList);
    };

    const handleRemoveTime = (alias: string) => {
        const tempList = [...timeList];
        const index = tempList.findIndex((time) => time.alias === alias);
        tempList[index].selected = !tempList[index].selected;
        setTimeList(tempList);
    };

    const handleReset = (type: "camera" | "date" | "time") => {
        switch (type) {
            case "camera":
                setCameraList(
                    cameraList.map((camera) => {
                        return {
                            ...camera,
                            selected: false,
                        };
                    }),
                );
                break;
            case "date":
                setDateRangeList([]);
                break;
            case "time":
                setTimeList(
                    timeList.map((time) => {
                        return {
                            ...time,
                            selected: false,
                        };
                    }),
                );
                break;
        }
    };
    const cameraSelected = cameraList.some((camera) => camera.selected);
    const dateSelected = dateRangeList.length > 0;
    const timeSelected = timeList.some((time) => time.selected);

    const filteredCameraList = cameraList.filter((camera) => camera.selected);
    const filteredTimeList = timeList.filter((time) => time.selected);

    return (
        <div className="h(100%) w(833) justify-end">
            <CameraSettingScrollBox
                name="선택한 카메라"
                className={`h(164) ${cameraSelected ? "grid(repeat(5,128px))" : ""}`}
            >
                {cameraSelected ? (
                    <>
                        {filteredCameraList.map((camera) => {
                            return (
                                <SelectedItem
                                    key={camera.id}
                                    content={camera.alias}
                                    onClick={handleRemoveCamera}
                                />
                            );
                        })}
                        <ResetButton onClick={() => handleReset("camera")} />
                    </>
                ) : (
                    <div className="w(100%) h(100%) text(pack)">
                        <P>카메라를 선택해 주세요.</P>
                    </div>
                )}
            </CameraSettingScrollBox>
            <CameraSettingScrollBox
                name="선택한 날짜"
                className={`h(164) ${dateSelected ? "grid(repeat(2,283px))" : ""}`}
            >
                {dateSelected ? (
                    <>
                        {dateRangeList.map((date, index) => {
                            const content = getStringDateRange(
                                date.start,
                                date.end,
                            );
                            return (
                                <SelectedItem
                                    key={
                                        date.start.toString() +
                                        date.end.toString() +
                                        index
                                    }
                                    content={content}
                                    onClick={handleRemoveDateRange}
                                />
                            );
                        })}
                        <ResetButton onClick={() => handleReset("date")} />
                    </>
                ) : (
                    <div className="w(100%) h(100%) text(pack)">
                        <P>날짜를 선택해 주세요.</P>
                    </div>
                )}
            </CameraSettingScrollBox>
            <CameraSettingScrollBox
                name="선택한 시간"
                className={`h(164) ${timeSelected ? "grid(repeat(5,136px))" : ""}`}
            >
                {timeSelected ? (
                    <>
                        {filteredTimeList.map((time) => {
                            return (
                                <SelectedItem
                                    key={time.id}
                                    content={time.alias}
                                    onClick={handleRemoveTime}
                                />
                            );
                        })}
                        <ResetButton onClick={() => handleReset("time")} />
                    </>
                ) : (
                    <div className="w(100%) h(100%) text(pack)">
                        <P>시간을 선택해 주세요.</P>
                    </div>
                )}
            </CameraSettingScrollBox>
        </div>
    );
};

export default SelectedOptions;
