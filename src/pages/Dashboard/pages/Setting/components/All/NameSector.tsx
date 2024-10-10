import { BorderRadius } from "../../../../../../constant/border.ts";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
import SectorInput from "../SectorInput.tsx";
import SectorName from "../SectorName.tsx";
import { Size, sizeList } from "../../../../../../util/DashboardUtils.ts";
import SectorModel from "../../../../../../models/Sector/SectorModel.ts";

interface NameSectorProps extends HTMLAttributes<HTMLDivElement> {
  setSectorList?: Dispatch<SetStateAction<SectorModel[]>>;
  farmSector: SectorModel;
  disabled?: boolean;
}

const NameSector: FC<NameSectorProps> = ({
  setSectorList,
  farmSector,
  disabled = false,
  ...props
}) => {
  const defaultValue =
    farmSector.alias ?? `${farmSector.row}-${farmSector.col}`;
  const { x, y } = sizeList[Size.small];

  return (
    <div className={`w(${x}) h(${y}) p(4) r(${BorderRadius.MAIN})`}>
      <div
        {...props}
        className={`relative r(${BorderRadius.MAIN}) bg(--color-background) box-shadow(1/1/1/0/#00000012) w(112) h(49.33)`}
      >
        {!disabled && setSectorList && (
          <SectorInput
            key={farmSector.id}
            farmSector={farmSector}
            defaultValue={defaultValue}
            setSectorList={setSectorList}
          />
        )}
        {disabled && <SectorName value={defaultValue} />}
      </div>
    </div>
  );
};

export default NameSector;
