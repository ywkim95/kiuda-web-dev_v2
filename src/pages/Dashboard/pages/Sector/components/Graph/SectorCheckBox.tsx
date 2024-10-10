import { BorderRadius } from "../../../../../../constant/border.ts";
import Span from "../../../../../../components/Span.tsx";
import P from "../../../../../../components/P.tsx";
import { fontSize } from "../../../../../../constant/font.ts";
import { FC } from "react";
import SectorModel from "../../../../../../models/Sector/SectorModel.ts";

interface SectorCheckboxProps {
  item: SectorModel;
  model: { id: number; show: boolean } | undefined;
  handleSectorShow: (model?: { id: number; show: boolean }) => void;
}

const SectorCheckbox: FC<SectorCheckboxProps> = ({
  item,
  model,
  handleSectorShow,
}) => (
  <div className="hbox gap(14)" onClick={() => handleSectorShow(model)}>
    <div
      className={`w(26) h(26) bw(2) r(${BorderRadius.INPUT}) bg(white) b(${
        model && model.show ? "--color-primary" : "--color-border"
      }) pointer text(pack)`}
    >
      {model && model.show && <Span fontSize={fontSize.BIG}>✓</Span>}
    </div>
    <P>
      {item.row+1}-{item.col+1}
    </P>
  </div>
);

export default SectorCheckbox;
