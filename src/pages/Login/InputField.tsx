import P from "../../components/P.tsx";
import { fontSize, fontWeight } from "../../constant/font.ts";
import { InputHTMLAttributes } from "react";

const InputField = ({
  testId,
  label,
  name,
  id,
  type = "text",
}: {
  testId: string | undefined;
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="vbox gap(12)">
      <label htmlFor="id">
        <P fontWeight={fontWeight.BOLD} fontSize={fontSize.BIG}>
          {label}
        </P>
      </label>
      <input
        data-testid={testId}
        className="w(100%) h(30) outline(none) b(--color-text) r(4) p(8) focus:b(--color-primary)"
        id={id}
        name={name}
        type={type}
        required
      />
    </div>
  );
};

export default InputField;
