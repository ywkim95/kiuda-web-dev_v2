import {
    MouseEvent as ReactMouseEvent,
    useCallback,
    useEffect,
    useRef,
} from "react";

const useScrollBar = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const scrollbarRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = useCallback(() => {
        if (contentRef.current && scrollbarRef.current) {
            const content = contentRef.current;
            const scrollbar = scrollbarRef.current;

            const contentHeight = content.scrollHeight;
            const containerHeight = content.clientHeight;
            const scrollTop = content.scrollTop;
            // console.log("contentHeight", contentHeight);
            // console.log("containerHeight", containerHeight);
            // console.log("scrollTop", scrollTop);

            const scrollbarHeight =
                containerHeight === contentHeight
                    ? 0
                    : Math.round(
                          (containerHeight / contentHeight) * containerHeight,
                      );
            const scrollbarTop = (scrollTop / contentHeight) * containerHeight;

            scrollbar.style.height = `${scrollbarHeight}px`;
            scrollbar.style.transform = `translateY(${scrollbarTop}px)`;
        }
    }, []);

    const handleScrollbarDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (contentRef.current && scrollbarRef.current) {
            const content = contentRef.current;
            const containerHeight = content.clientHeight;

            const startY = e.clientY;
            const startScrollTop = content.scrollTop;

            const onMouseMove = (e: MouseEvent) => {
                const deltaY = e.clientY - startY;

                content.scrollTop =
                    startScrollTop +
                    (deltaY / containerHeight) * content.scrollHeight;
            };

            const onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        const resizeObserver = new ResizeObserver(() => {
            handleScroll();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (contentRef.current) {
                contentRef.current.removeEventListener("scroll", handleScroll);
            }

            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [handleScroll]);

    return {
        containerRef,
        contentRef,
        scrollbarRef,
        handleScrollbarDrag,
    };
};

export default useScrollBar;
