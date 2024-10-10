import P from "../../../../../components/P.tsx";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import { BorderRadius } from "../../../../../constant/border.ts";
import { FC, ReactNode } from "react";

interface SettingHeaderProps {
  title: string;
  children?: ReactNode;
  onSave: () => void;
  onRollback: () => void;
  isShow: boolean;
}

const SettingHeader: FC<SettingHeaderProps> = ({
  title,
  children,
  onSave,
  onRollback,
  isShow,
}) => {
  return (
    <div className="hbox space-between p(15/30) ">
      <div className="hbox gap(24)">
        <P fontWeight={fontWeight.BOLD} fontSize={fontSize.BIG}>
          {title}
        </P>
        {children}
      </div>

      <div className="hbox w(171) h(50)">
        {isShow && (
          <>
            <button
              onClick={onSave}
              className={`w(74) h(100%) bg(--color-primary) rl(${BorderRadius.INPUT}) b(none) c(white) font(${fontSize.MEDIUM}) ${fontWeight.NORMAL}`}
            >
              저장
            </button>
            <button
              onClick={onRollback}
              className={`w(98) h(100%) bg(--color-box) rr(${BorderRadius.INPUT}) b(--color-second-background) c(--color-text) font(${fontSize.MEDIUM}) ${fontWeight.NORMAL}`}
            >
              되돌리기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingHeader;
