import {Dispatch, FC, ReactNode, SetStateAction, useEffect, useState,} from "react";
import EntranceModel from "../../../../../../models/Farm/EntranceModel.ts";
import {Direction} from "../../../../../../constant/enum.ts";

interface NameEntranceProps {
  className?: string;
  length: number;
  direction: Direction;
  EntranceList: EntranceModel[];
  setEntranceList?: Dispatch<SetStateAction<EntranceModel[]>>;
  children: (color: string | undefined) => ReactNode;
  isSetting?: boolean;
  testId?: string;
}

const NameEntrance: FC<NameEntranceProps> = ({
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

  const handleEntrance = (index: number) => {
    return filteredEntranceList.find(
      (item) => item.positionNumber === index,
    );
  };

  const handleList = (index: number) => {
    if (isSetting && setEntranceList) {
      const entrance = handleEntrance(index);
      let newEntranceList;
      if (entrance) {
        newEntranceList = filteredEntranceList.filter(
          (item) => item.positionNumber !== entrance.positionNumber,
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
  };

  return (
    <>
      <div data-testid={testId} className={`absolute ${className ?? ""}`}>
        {Array(length)
          .fill(null)
          .map((_, index) => {
            const isHorizontal = direction === Direction.West || direction === Direction.East;
            const entrance = handleEntrance(index);
            const calcSize = isHorizontal
              ? `h(57.33px) w(100%)`
              : `w(120.5px) h(100%)`;

            const color =
              isSetting && entrance
                ? "#149F48"
                : entrance
                  ? "#878D91"
                  : undefined;

            return (
              <div
                data-testid={`arrow-div-${index}`}
                key={index}
                className={`pack ${calcSize} relative ${isSetting ? " pointer" : ""}`}
                onClick={() => handleList(index)}
              >
                {isSetting ? (
                  <>{children(color)}</>
                ) : (
                  entrance && <>{children(color)}</>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default NameEntrance;
