import Span from "../../../../../components/Span.tsx";
import { ChangeEvent, FC } from "react";
import SettingInputField from "./SettingInputField.tsx";

interface RevisionProps {
  revisionValue: number;
  handleRevisionChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Revision: FC<RevisionProps> = ({
  revisionValue,
  handleRevisionChange,
}) => {
  return (
    <div className="vbox text(pack)">
      <Span className="mb(5)">보정</Span>
      <SettingInputField
        type="number"
        value={revisionValue}
        onChange={handleRevisionChange}
        height="54"
        width="74"
      />
    </div>
  );
};

export default Revision;
