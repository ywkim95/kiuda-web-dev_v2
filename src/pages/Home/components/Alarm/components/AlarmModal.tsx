import Modal from "../../../../../components/Modal/Modal.tsx";
import useModalStore from "../../../../../store/useModalStore.ts";
import ModalType from "../../../../../components/Modal/ModalType.ts";
import { BorderRadius } from "../../../../../constant/border.ts";
import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import Span from "../../../../../components/Span.tsx";
import { getFormattedDate, TenMinutes } from "../../../../../constant/date.ts";
import MultiDropdown from "../../../../../components/Dropdown/MultiDropdown.tsx";
import "../../../../../constant/table.css";
import AlarmTable from "./AlarmTable.tsx";
import CloseButtonIcon from "../../../../../components/svg/CloseButtonIcon.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAlarms, getGlobalAlarms } from "../../../../../http/http.ts";
import useDateHook from "../../../../../hooks/useDateHook.tsx";
import useAlarmModal from "../hooks/useAlarmModal.tsx";
import PageButtonList from "./PageButtonList.tsx";
import {
    alarmCount,
    alarmSearchType,
    globalAlarmSearchType,
} from "../../../../../http/httpType.ts";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import ErrorComponent from "../../../../Error/ErrorComponent.tsx";
import { ChangeEvent, useState } from "react";
import AlarmTypeButton from "./AlarmTypeButton.tsx";

const AlarmModal = () => {
    const [alarmType, setAlarmType] = useState<"sector" | "global">("sector");
    const _id = useGetFarmId();
    const {
        showCustomDate,
        start,
        end,
        CustomDateComponent,
        selectedOption,
        isSearch,
        DropdownComponent,
    } = useDateHook();

    const {
        alarmTypeList,
        sensorTypeList,
        sectorList,
        globalSensorList,
        handleItem,
        handleGlobalItem,
        page,
        setPage,
        handleCloseModal,
        getParams,
    } = useAlarmModal({ selectedOption, alarmType });

    const { modal } = useModalStore();

    const queryKey =
        alarmType === "sector"
            ? ["alarms", getParams() as alarmSearchType]
            : ["globalAlarms", getParams() as globalAlarmSearchType];
    const queryFn = ({ signal }: { signal: AbortSignal }) =>
        alarmType === "sector"
            ? getAlarms({
                  signal,
                  searchTerm: getParams() as alarmSearchType,
                  _id,
              })
            : getGlobalAlarms({
                  signal,
                  searchTerm: getParams() as globalAlarmSearchType,
                  _id,
              });

    const { data, isError, error } = useQuery({
        queryKey,
        queryFn,
        enabled: modal === ModalType.Alarm && isSearch && !showCustomDate,
        retry: 1,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        staleTime: TenMinutes,
    });

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setAlarmType(e.target.value as "sector" | "global");
    };

    let content;

    if (isError) {
        content = (
            <ErrorComponent
                className="h(100%) w(1240) pack bg(--color-background)"
                error={error}
            />
        );
    }

    if (data) {
        const pageLength = Math.ceil(data.count / alarmCount);

        content = (
            <>
                <P fontSize={fontSize.ExtraBIG} fontWeight={fontWeight.BOLD}>
                    알람 정보 현황
                </P>
                <Span>
                    키우다 플랫폼에서 각 구역의 알람 정보 현황을 확인합니다.
                </Span>
                <div className="hbox space-between w(100%) m(26/0/4)">
                    <div className="hbox gap(24)">
                        <DropdownComponent />
                        {start && end && (
                            <Span>
                                {getFormattedDate(start) ===
                                getFormattedDate(end)
                                    ? `${getFormattedDate(start)}`
                                    : `${getFormattedDate(start)}
                ~ ${getFormattedDate(end)}`}
                            </Span>
                        )}
                    </div>
                    {showCustomDate && (
                        <div className="absolute(48,208) bg(white)">
                            <CustomDateComponent />
                        </div>
                    )}
                    <div className="hbox gap(24)">
                        <MultiDropdown
                            title="알람 유형"
                            list={alarmTypeList}
                            onOptionSelect={(item) => handleItem("alarm", item)}
                        />
                        {alarmType === "sector" ? (
                            <>
                                <MultiDropdown
                                    title="센서 유형"
                                    list={sensorTypeList}
                                    onOptionSelect={(item) =>
                                        handleItem("sensor", item)
                                    }
                                />
                                <MultiDropdown
                                    title="구역명"
                                    list={sectorList}
                                    onOptionSelect={(item) =>
                                        handleItem("sector", item)
                                    }
                                />
                            </>
                        ) : (
                            <MultiDropdown
                                title="센서 유형"
                                list={globalSensorList}
                                onOptionSelect={(item) =>
                                    handleGlobalItem(item)
                                }
                            />
                        )}
                        <div className={`w(160) h(50) hbox text(pack)`}>
                            <AlarmTypeButton
                                alarmType="sector"
                                onChange={handleOptionChange}
                                checked={alarmType === "sector"}
                                content="구역"
                                className={`rl(${BorderRadius.INPUT})`}
                            />
                            <AlarmTypeButton
                                alarmType="global"
                                onChange={handleOptionChange}
                                checked={alarmType === "global"}
                                content="전역"
                                className={`rr(${BorderRadius.INPUT})`}
                            />
                        </div>
                    </div>
                </div>
                <AlarmTable alarm={data} alarmType={alarmType} />
                <PageButtonList
                    page={page}
                    setPage={setPage}
                    pageLength={pageLength}
                    className="mt(20)"
                />
            </>
        );
    }

    return (
        <Modal
            open={modal === ModalType.Alarm}
            onClose={handleCloseModal}
            className={`w(1400) h(810) bg(transparent) b(none) m(auto) pack focus:b(none)+outline(none)`}
        >
            <div
                className={`w(1240) h(100%) p(60/60/36/60) bg(white) r(${BorderRadius.MAIN})`}
            >
                <div className="vbox(center) gap(16)">{content}</div>
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

export default AlarmModal;
