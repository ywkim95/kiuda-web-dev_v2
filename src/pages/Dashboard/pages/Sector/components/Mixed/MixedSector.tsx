import { FC, HTMLAttributes } from "react";
import { BorderRadius } from "../../../../../../constant/border.ts";
import P from "../../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../../constant/font.ts";

interface MixedSectorProps extends HTMLAttributes<HTMLDivElement> {
  alias: string;
  value: number;
  unit: string;
}

const MixedSector: FC<MixedSectorProps> = ({
  alias,
  value,
  unit,
  ...props
}) => {
  return (
    <div className={`w(108) h(79) pack p(4) r(${BorderRadius.MAIN})`}>
      <div
        {...props}
        // className={`relative hbox r(${BorderRadius.MAIN}) pointer ${farmSector.isError ? "bg(--color-sub-error)" : "bg(--color-background)"} box-shadow(1/1/1/0/#00000012) pack`}
        className={`relative r(${BorderRadius.MAIN}) bg(white) box-shadow(1/1/1/0/#00000012) w(100) h(71) vbox p(16/8/0) gap(16)`}
      >
        <P
          fontWeight={fontWeight.BOLD}
          fontSize={fontSize.BIG}
          className="w(90) text-center nowrap..."
        >
          {alias}
        </P>
        <div className="">
          <P
            fontWeight={fontWeight.BOLD}
            color="--color-primary"
            className="text(pack)"
          >
            {value.to2Fixed()}
            {unit}
          </P>
        </div>
      </div>
    </div>
  );
};

export default MixedSector;
