import GreenXIcon from "../../../../../components/svg/GreenXIcon";
import { BorderRadius } from "../../../../../constant/border.ts";
import P from "../../../../../components/P.tsx";
import { FC } from "react";

interface SelectedItemProps {
    content: string;
    onClick: (alias: string) => void;
}

const SelectedItem: FC<SelectedItemProps> = ({ content, onClick }) => {
    const handleClick = () => {
        onClick(content);
    };
    return (
        <div
            className={`hbox b(1/--color-primary) r(${BorderRadius.INPUT}) pack bg(--color-selected-box)`}
        >
            <P
                color="--color-primary"
                className="mr(14) text(pack) user-select-none"
            >
                {content}
            </P>
            <button className="pack" onClick={handleClick}>
                <GreenXIcon />
            </button>
        </div>
    );
};

export default SelectedItem;
