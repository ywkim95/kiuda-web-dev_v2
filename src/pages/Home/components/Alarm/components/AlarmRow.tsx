import P from "../../../../../components/P.tsx";
import { fontWeight } from "../../../../../constant/font.ts";
import { AlarmRowType } from "../../../../../constant/type.ts";

const AlarmRow = ({
    isHeader,
    data,
    index,
}: {
    isHeader?: boolean;
    data: AlarmRowType;
    index?: number;
}) => {
    const br = index && index % 2 === 0 ? "br(--color-box)" : "br(white)";
    const fw = isHeader ? fontWeight.BOLD : undefined;
    const c = isHeader ? "white" : undefined;
    return (
        <div
            className={`w(100%) h(30) ${isHeader ? "bg(--color-primary)" : "nth-child(even):bg(--color-box)"} hbox`}
        >
            <div className={`h(30) w(110) ${br} bw(2) px(28) text(pack)`}>
                <P fontWeight={fw} color={c}>
                    {data.alarmType}
                </P>
            </div>
            <div
                className={`h(30) w(129) ${br} bw(2) ${isHeader ? "text(middle+center)" : "pl(26) text(middle+left)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.date}
                </P>
            </div>
            <div
                className={`h(30) w(90) ${br} bw(2) ${isHeader ? "text(middle+center)" : "pl(26) text(middle+left)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.time}
                </P>
            </div>
            <div
                className={`h(30) w(171) ${br} bw(2) ${isHeader ? "text(middle+center)" : "pl(30) text(middle+left)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.sectorName}
                </P>
            </div>
            <div
                className={`h(30) w(189) ${br} bw(2)  ${isHeader ? "text(middle+center)" : "px(38) text(middle)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.sensorType}
                </P>
            </div>
            <div
                className={`h(30) w(110) ${br} bw(2) ${isHeader ? "text(middle+center)" : "pr(30) text(middle+right)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.alarmStandard}
                </P>
            </div>
            <div
                className={`h(30) w(171) ${br} bw(2) ${isHeader ? "text(middle+center)" : "pr(30) text(middle+right)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.sensorValue}
                </P>
            </div>
            <div
                className={`h(30) w(134) ${isHeader ? "text(middle+center)" : "pr(30) text(middle+right)"}`}
            >
                <P fontWeight={fw} color={c}>
                    {data.overValue}
                </P>
            </div>
        </div>
    );
};

export default AlarmRow;
