import P from "../../../../components/P.tsx";
import { fontWeight } from "../../../../constant/font.ts";
import Span from "../../../../components/Span.tsx";
import { BorderRadius } from "../../../../constant/border.ts";
import { FC, InputHTMLAttributes } from "react";

interface ChannelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  description: string;
}

const ChannelInput: FC<ChannelInputProps> = ({
  name,
  description,
  id,
  className,
  ...props
}) => {
  return (
    <div className="vbox gap(8)">
      <label htmlFor={id}>
        <P
          fontWeight={fontWeight.BOLD}
          color="--color-nonActive"
          className="user-select-none"
        >
          {name}
          <Span
            fontSize={10}
            fontWeight={fontWeight.BOLD}
            color="--color-nonActive"
            className="user-select-none"
          >
            {description}
          </Span>
        </P>
      </label>
      <input
        id={id}
        type="number"
        className={`w(123) h(54) b(1/--color-border) r(${BorderRadius.INPUT}) bg(white) 400 font(14) c(#4D5256) pl(24) focus:outline(none) ${className}`}
        placeholder="0"
        {...props}
      />
    </div>
  );
};

export default ChannelInput;
