import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import EntranceModel from "../../../../../models/Farm/EntranceModel.ts";
import {Direction} from "../../../../../constant/enum.ts";

interface EntranceLineProps {
  className?: string;
  length: number;
  direction: Direction;
  EntranceList: EntranceModel[];
  setEntranceList?: Dispatch<SetStateAction<EntranceModel[]>>;
  children: (color: string | undefined) => ReactNode;
  isSetting?: boolean;
  testId?: string;
}

const EntranceLine: FC<EntranceLineProps> = ({
  className,
  length,
  direction,
  EntranceList,
  setEntranceList,
  children,
  isSetting,
  testId,
}) => {
  const [filteredEntranceList, setFilteredEntranceList] =
    useState(EntranceList);

  useEffect(() => {
    setFilteredEntranceList(EntranceList);
  }, [EntranceList]);

  const handleEntrance = useCallback(
    (index: number) => {
      return filteredEntranceList.find(
        (item) => item.positionNumber === index,
      );
    },
    [filteredEntranceList],
  );

  const handleList = useCallback(
    (index: number) => {
      if (isSetting && setEntranceList) {
        const entrance = handleEntrance(index);
        let newEntranceList;
        // 있으면 빼고 없으면 넣어라가되는건가?
        if (entrance) {
          newEntranceList = filteredEntranceList.filter(
            (item) =>
              item.directionId !== entrance.directionId &&
              item.positionNumber !== entrance.positionNumber,
          );
        } else {
          newEntranceList = [
            ...filteredEntranceList,
            {
              directionId: direction,
              positionNumber: index,
            },
          ];
        }
        setFilteredEntranceList(newEntranceList);
        setEntranceList((prevEntrances: EntranceModel[]) => [
          ...prevEntrances.filter((e) => e.directionId !== direction),
          ...newEntranceList,
        ]);
      }
    },
    [
      direction,
      filteredEntranceList,
      handleEntrance,
      isSetting,
      setEntranceList,
    ],
  );

  return (
    <div data-testid={testId} className={`absolute ${className ?? ""}`}>
      {Array.from({ length }, (_, index) => {
        const entrance = handleEntrance(index);
        const calcSize =
          direction === 1 || direction === 2
            ? `h(100%/${length}) w(100%)`
            : `w(100%/${length}) h(100%)`;

        const color =
          isSetting && entrance ? "#149F48" : entrance ? "#878D91" : undefined;
        return (
          <div
            data-testid={`arrow-div-${index}`}
            key={index}
            className={`pack ${calcSize} relative${isSetting ? " pointer" : ""}`}
            onClick={() => handleList(index)}
          >
            {entrance && children(color)}
          </div>
        );
      })}
    </div>
  );
};

export default EntranceLine;
