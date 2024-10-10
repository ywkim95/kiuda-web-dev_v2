import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import { FC, HTMLAttributes } from "react";
import { BorderRadius } from "../../../../../constant/border.ts";
import SectorModel from "../../../../../models/Sector/SectorModel.ts";

interface FarmSectorProps extends HTMLAttributes<HTMLDivElement> {
  farmSector: SectorModel;
}

const FarmSector: FC<FarmSectorProps> = ({ farmSector, ...props }) => {
  return (
    <div
      {...props}
      // className={`relative hbox r(${BorderRadius.MAIN}) pointer ${farmSector.isError ? "bg(--color-sub-error)" : "bg(--color-background)"} box-shadow(1/1/1/0/#00000012) pack`}
      className={`relative hbox r(${BorderRadius.MAIN}) ${props.onClick && "pointer"} bg(--color-background) box-shadow(1/1/1/0/#00000012) pack`}
    >
      {/*{farmSector.isError && (*/}
      {/*  <img*/}
      {/*    src="/assets/icons/level_3.png"*/}
      {/*    alt="error"*/}
      {/*    className="absolute w(24) h(24) mr(75)"*/}
      {/*  />*/}
      {/*)}*/}
      <P
        fontWeight={fontWeight.BOLD}
        fontSize={fontSize.BIG}
        // color={farmSector.isError ? "white" : "--color-primary"}
        color="--color-primary"
      >
        {farmSector.row+1}-{farmSector.col+1}
      </P>
    </div>
  );
};

export default FarmSector;
