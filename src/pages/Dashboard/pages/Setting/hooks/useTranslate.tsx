import { useState } from "react";
import { Size, sizeList } from "../../../../../util/DashboardUtils.ts";
import { Direction } from "../../../../../constant/enum.ts";

interface useTranslateProps {
    row: number;
    col: number;
    size: Size;
}

const useTranslate = ({ row, col, size }: useTranslateProps) => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const handleMove = (direction: Direction) => {
        const { x, y } = sizeList[size];
        const scrollAmount =
            direction === Direction.West || direction === Direction.East
                ? x
                : y;
        setTranslate((prev) => {
            let newX = parseFloat(prev.x.to2Fixed());
            let newY = parseFloat(prev.y.to2Fixed());
            let defaultY = 3;
            if (size === Size.medium) {
                defaultY = 7;
            }

            switch (direction) {
                case Direction.West: // Left
                    newX = Math.min(
                        parseFloat((prev.x + scrollAmount).to2Fixed()),
                        0,
                    );
                    break;
                case Direction.North: // Up
                    newY = Math.min(
                        parseFloat((prev.y + scrollAmount).to2Fixed()),
                        0,
                    );
                    console.log(newY);
                    break;
                case Direction.East: // Right
                    newX = Math.max(
                        prev.x - scrollAmount,
                        -(row - 4) * scrollAmount,
                    );
                    break;
                case Direction.South: // Down
                    newY = Math.max(
                        prev.y - scrollAmount,
                        -(col - defaultY) * scrollAmount,
                    );
                    break;
            }

            return { x: newX, y: newY };
        });
    };
    return {
        translate,
        handleMove,
    };
};

export default useTranslate;
