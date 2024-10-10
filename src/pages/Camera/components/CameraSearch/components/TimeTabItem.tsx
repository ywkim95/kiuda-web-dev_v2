import SelectItem from "./SelectItem.tsx";
import { FC, HTMLAttributes } from "react";

interface TimeTabItemProps extends HTMLAttributes<HTMLButtonElement> {
  alias: string;
  isSelected: boolean;
}

const TimeTabItem: FC<TimeTabItemProps> = ({ alias, isSelected, ...props }) => {
  return (
    <SelectItem isSelected={isSelected} {...props}>
      {alias}
    </SelectItem>
  );
};

export default TimeTabItem;
