import {
    HTMLAttributes,
    useState,
    MouseEvent as ReactMouseEvent,
    ChangeEvent,
    FC,
} from "react";
import BaseDropdown from "./BaseDropdown.tsx";
import { BorderRadius } from "../../constant/border.ts";
import Span from "../Span.tsx";
import { fontSize } from "../../constant/font.ts";
import P from "../P.tsx";
import { listType } from "../../constant/type.ts";

interface MultiDropdownProps extends HTMLAttributes<HTMLButtonElement> {
    title: string;
    list: listType[];
    onOptionSelect: (value: number) => void;
}

const MultiDropdown: FC<MultiDropdownProps> = ({
    title,
    list,
    onOptionSelect,
    ...props
}) => {
    const [expand, setExpand] = useState(false);

    const handleClickItem = (item: number) => {
        onOptionSelect(item);
    };

    const handleCheckItemGlobal = (
        e: ReactMouseEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>,
        item: listType,
    ) => {
        e.stopPropagation();
        handleClickItem(item.value);
    };

    const checkedItems = list.some((item) => item.checked);

    return (
        <BaseDropdown
            title={title}
            expand={expand}
            setExpand={setExpand}
            numberComponent={
                list.filter((value) => value.checked).length > 0 && (
                    <P
                        fontSize={fontSize.SMALL}
                        className="w(20) h(20) bg(--color-primary) c(white) box-shadow(1/1/1/0/#00000012) text(pack) r(50%)"
                    >
                        {list.filter((value) => value.checked).length}
                    </P>
                )
            }
            {...props}
            className={`w(166) h(50) bg(${checkedItems ? "--color-primary" : "--color-background"}) b(--color-border) r(${BorderRadius.INPUT}) relative `}
        >
            {list.map((item) => (
                <div
                    className={`h(32) w(100%) pl(24) bg(${item.checked ? "--color-background" : "white"}) pointer hover:bg(--color-background) hbox gap(14)`}
                    key={item.value + item.name}
                    onClick={(e) => handleCheckItemGlobal(e, item)}
                >
                    <div
                        className={`w(26) h(26) bw(2) r(${BorderRadius.INPUT}) bg(white) b(${item.checked ? "--color-primary" : "--color-border"}) pointer text(pack)`}
                    >
                        {item.checked && <Span fontSize={fontSize.BIG}>✓</Span>}
                    </div>
                    <P>{item.name}</P>
                </div>
            ))}
        </BaseDropdown>
    );
};

export default MultiDropdown;
