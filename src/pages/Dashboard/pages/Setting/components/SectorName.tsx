import P from "../../../../../components/P.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import { fontWeight } from "../../../../../constant/font.ts";
import { FC } from "react";

interface SectorNameProps {
  value: string;
}

const SectorName: FC<SectorNameProps> = ({ value }) => {
  return (
    <P
      fontWeight={fontWeight.BOLD}
      color="--color-text"
      className={`w(100%) h(100%) r(${BorderRadius.MAIN}) bg(transparent) b(none) text(pack)`}
    >
      {value}
    </P>
  );
};

export default SectorName;
