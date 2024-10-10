import Dropdown from "./Dropdown/Dropdown.tsx";
import { FC } from "react";

interface DropdownComponentProps {
  title: string;
  list: string[];
  onSelectItem: (i: number) => void;
}

const DropdownComponent: FC<DropdownComponentProps> = ({
  title,
  list,
  onSelectItem,
}) => {
  return <Dropdown title={title} list={list} onSelectItem={onSelectItem} />;
};
export default DropdownComponent;
