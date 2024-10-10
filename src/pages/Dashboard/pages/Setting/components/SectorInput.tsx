import { BorderRadius } from "../../../../../constant/border.ts";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import {
  ChangeEvent,
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import SectorModel from "../../../../../models/Sector/SectorModel.ts";

interface SectorInputProps extends HTMLAttributes<HTMLInputElement> {
  setSectorList: Dispatch<SetStateAction<SectorModel[]>>;
  farmSector: SectorModel;
}

const SectorInput: FC<SectorInputProps> = ({
  setSectorList,
  farmSector,
  defaultValue,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(inputValue !== defaultValue); // inputValue와 defaultValue 비교하여 isChanged 업데이트
  }, [inputValue, defaultValue]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setSectorList((prev) => {
        return prev.map((item) => {
          if (item.id === farmSector.id) {
            return {
              ...item,
              alias: newValue,
            };
          }
          return item;
        });
      });
    },
    [farmSector.id, setSectorList],
  );

  return (
    <input
      type="text"
      className={`w(100%) h(100%) r(${BorderRadius.MAIN}) bg(transparent) b(none) text(pack) font(${fontSize.MEDIUM}) ${fontWeight.BOLD} c(${isChanged ? "--color-primary" : "--color-text"}) focus:outline(none)`}
      value={inputValue}
      onChange={handleInputChange}
      maxLength={6}
      {...props}
    />
  );
};

export default SectorInput;
