import { ChangeEvent, FC } from "react";

interface AlarmTypeButtonProps {
    alarmType: "global" | "sector";
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    content: string;
    className: string;
}

const AlarmTypeButton: FC<AlarmTypeButtonProps> = ({
    alarmType,
    onChange,
    checked,
    content,
    className,
}) => {
    const style = checked
        ? "b(1/--color-primary) bg(--color-primary) c(white)"
        : "b(1/--color-border) bg(--color-box) c(--color-text)";
    return (
        <>
            <input
                type="radio"
                className="none"
                name="alarm"
                value={alarmType}
                id={alarmType}
                checked={checked}
                onChange={(e) => onChange(e)}
            />
            <label
                className={`w(80) h(fill) text(pack) pointer user-select-none ${style} ${className}`}
                htmlFor={alarmType}
            >
                {content}
            </label>
        </>
    );
};

export default AlarmTypeButton;
