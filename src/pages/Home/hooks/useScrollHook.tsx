import { useCallback, useRef, useState } from "react";

interface UseScrollHookProps {
  length: number;
  scrollValue: number;
  isInfinite: boolean;
}

const useScrollHook = ({
  length,
  scrollValue,
  isInfinite = false,
}: UseScrollHookProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [index, setIndex] = useState(0);

  const handleScroll = useCallback(
    (isLeft: boolean) => {
      if (scrollRef.current && !isScrolling) {
        setIsScrolling(true);
        const current = scrollRef.current;
        const scrollAmount = isLeft ? -scrollValue : scrollValue;
        current.scrollTo({
          left: current.scrollLeft + scrollAmount,
          behavior: "smooth",
        });

        let prevScrollLeft: number;
        const checkScrollEnd = setInterval(() => {
          if (
            prevScrollLeft !== undefined &&
            prevScrollLeft === current.scrollLeft
          ) {
            setIsScrolling(false);
            clearInterval(checkScrollEnd);

            const newIndex = Math.round(
              current.scrollLeft / Math.abs(scrollAmount),
            );
            setIndex(newIndex);
          }
          prevScrollLeft = current.scrollLeft;
        }, 100);

        if (isInfinite) {
          if (
            !isLeft &&
            current.scrollLeft + current.offsetWidth >= current.scrollWidth
          ) {
            current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
            setIndex(0);
          } else if (isLeft && current.scrollLeft <= 0) {
            current.scrollTo({
              left: current.scrollWidth,
              behavior: "smooth",
            });
            setIndex(length - 1);
          }
        }
      }
    },
    [isScrolling, scrollValue, isInfinite, length],
  );

  return {
    scrollRef,
    index,
    handleScroll,
  };
};

export default useScrollHook;
