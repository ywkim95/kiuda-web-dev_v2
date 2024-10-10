import RightRotateArrow from "../../../../../components/svg/RightRotateArrow.tsx";
import { FC } from "react";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <div className="text-left ml(9) py(15)">
      <button onClick={onClick}>
        <RightRotateArrow />
      </button>
    </div>
  );
};

export default ResetButton;
