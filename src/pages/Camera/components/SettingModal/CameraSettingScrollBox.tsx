import P from "../../../../components/P.tsx";
import { fontWeight } from "../../../../constant/font.ts";
import { BorderRadius } from "../../../../constant/border.ts";
import { FC, HTMLAttributes } from "react";
import ScrollDiv from "../../../../components/ScrollDiv/ScrollDiv.tsx";

interface CameraSettingScrollBoxProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  enableScrollPadding?: boolean;
}

const CameraSettingScrollBox: FC<CameraSettingScrollBoxProps> = ({
  name,
  enableScrollPadding,
  children,
  className,
  ...props
}) => {
  return (
    <div className="vbox gap(8)">
      <P
        color="--color-nonActive"
        fontWeight={fontWeight.BOLD}
        className="user-select-none"
      >
        {name}
      </P>
      <div
        className={`w(100%) h(100%) overflow(hidden) b(1/--color-border) r(${BorderRadius.INPUT}) bg(white)`}
      >
        <ScrollDiv
          {...props}
          enableScrollPadding={enableScrollPadding}
          className={`${className} grid-auto-rows(50px) gap(12/24) p(24) w(100%)`}
        >
          {children}
        </ScrollDiv>
      </div>
    </div>
  );
};

export default CameraSettingScrollBox;
