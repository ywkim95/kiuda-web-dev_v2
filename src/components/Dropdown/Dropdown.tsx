import {
  HTMLAttributes,
  useState,
  MouseEvent as ReactMouseEvent,
  FC,
} from "react";
import BaseDropdown from "./BaseDropdown.tsx";
import P from "../P.tsx";

interface DropdownProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  list: string[];
  onSelectItem: (i: number) => void;
  disabled?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  title,
  list,
  onSelectItem,
  disabled,
  ...props
}) => {
  const [expand, setExpand] = useState(false);

  const handleClickItem = (
    e: ReactMouseEvent<HTMLParagraphElement>,
    item: string,
  ) => {
    e.stopPropagation();
    const index = list.indexOf(item);
    onSelectItem(index);
    setExpand(false);
  };

  return (
    <BaseDropdown
      title={title}
      expand={expand}
      setExpand={setExpand}
      disabled={disabled}
      {...props}
    >
      {list.map((item) => {
        const isSame = title === item;
        return (
          <P
            role="listitem"
            className={`h(32) w(100%) text(middle+left) pl(24) bg(${isSame ? "--color-background" : "white"}) pointer hover:bg(--color-background) user-select-none`}
            key={item}
            onClick={(e) => handleClickItem(e, item)}
          >
            {item}
          </P>
        );
      })}
    </BaseDropdown>
  );
};

export default Dropdown;
