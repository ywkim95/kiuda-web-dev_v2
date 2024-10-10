import AlignLeftIcon from "../../../../../components/svg/AlignLeftIcon";
import P from "../../../../../components/P.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import { useEffect, useState } from "react";
import CustomDateComponent from "../../../../../components/CustomDateComponent.tsx";
import useCameraSearchStore from "../../../../../store/useCameraSearchStore.ts";
import { getFormattedDate } from "../../../../../constant/date.ts";

const DateTab = () => {
    const { dateRangeList, setDateRangeList } = useCameraSearchStore();

    const [isShowDateComponent, setIsShowDateComponent] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleDate = () => {
        setIsShowDateComponent(!isShowDateComponent);
    };

    useEffect(() => {
        if (startDate && endDate) {
            const sDate = getFormattedDate(startDate);
            const eDate = getFormattedDate(endDate);
            // 중복 체크 및 상태 변경
            const isExisting = dateRangeList.some(
                (item) => item.start === sDate && item.end === eDate,
            );
            if (!isExisting) {
                setDateRangeList([
                    ...dateRangeList,
                    { start: sDate, end: eDate },
                ]);
                setStartDate(null);
                setEndDate(null);
            }
        }
    }, [startDate, endDate, setDateRangeList, dateRangeList]);

    return (
        <div className="w(100%) h(100%) vbox(center) py(15)">
            <button
                className={`w(187) h(50) b(1/--color-border) bg(--color-box) r(${BorderRadius.INPUT}) hbox space-between px(17)`}
                onClick={handleDate}
            >
                <P className="user-select-none">조회 기간</P>
                <AlignLeftIcon />
            </button>
            {isShowDateComponent && (
                <div className={`absolute top(305) left(100) bg(white) r(7)`}>
                    <CustomDateComponent
                        isOpen={isShowDateComponent}
                        setIsOpen={setIsShowDateComponent}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
            )}
        </div>
    );
};

export default DateTab;
