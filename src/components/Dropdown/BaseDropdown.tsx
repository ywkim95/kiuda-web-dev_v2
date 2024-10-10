import {
  HTMLAttributes,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  FC,
  useState,
} from "react";
import Span from "../Span.tsx";
import P from "../P.tsx";
import { BorderRadius } from "../../constant/border.ts";

interface BaseDropdownProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
  children: ReactNode;
  numberComponent?: ReactNode;
  disabled?: boolean;
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

const BaseDropdown: FC<BaseDropdownProps> = ({
  title,
  children,
  numberComponent,
  disabled,
  expand,
  setExpand,
  className = "w(166)",
  ...props
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScroll, setIsScroll] = useState(false);

  const handleShow = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setExpand(!expand);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setExpand(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setExpand]);

  useEffect(() => {
    const checkHeight = () => {
      if (scrollRef.current) {
        const height = scrollRef.current.scrollHeight;
        if (height > 130) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      }
    };

    checkHeight();

    document.addEventListener("resize", checkHeight);
    return () => {
      document.removeEventListener("resize", checkHeight);
    };
  }, [children]);

  const styles = disabled ? "opacity(0.5) not-allowed" : "";

  return (
    <button
      {...props}
      disabled={disabled || false}
      ref={dropdownRef}
      className={`h(50) bg(--color-box) b(--color-border) r(${BorderRadius.INPUT}) relative ${className} ${styles}`}
    >
      <div className={"hbox space-between px(24) h(100%)"} onClick={handleShow}>
        <P className="user-select-none">{title}</P>
        {numberComponent}
        <Span
          className={`user-select-none transition(0.3s) ${expand ? "rotate(180)" : "rotate(0)"}`}
        >
          ▼
        </Span>
      </div>
      {expand && (
        <div
          ref={scrollRef}
          className={`absolute(0,55) w(100%) b(--color-border) bg(white) r(4) clip max-h(128) ${isScroll ? "custom-scroll overflow-y(scroll) -webkit-scrollbar::w(20)+bg(transparent) -webkit-scrollbar-thumb::b(5/white)+r(20)+pointer" : ""}`}
        >
          {children}
        </div>
      )}
    </button>
  );
};

export default BaseDropdown;
