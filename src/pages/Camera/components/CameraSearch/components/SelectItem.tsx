import Span from "../../../../../components/Span.tsx";
import { fontSize } from "../../../../../constant/font.ts";
import P from "../../../../../components/P.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import { FC, HTMLAttributes } from "react";

interface SelectItemProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

const SelectItem: FC<SelectItemProps> = ({
  children,
  isSelected,
  ...props
}) => {
  return (
    <button {...props}>
      <div className="hbox gap(14)">
        <div
          className={`user-select-none w(26) h(26) b(2) r(${BorderRadius.INPUT}) text(pack) ${isSelected ? "bc(--color-primary)" : "bc(--color-border)"}`}
        >
          {isSelected && (
            <Span className="user-select-none" fontSize={fontSize.BIG}>
              ✓
            </Span>
          )}
        </div>
        <P className="user-select-none">{children}</P>
      </div>
    </button>
  );
};

export default SelectItem;
