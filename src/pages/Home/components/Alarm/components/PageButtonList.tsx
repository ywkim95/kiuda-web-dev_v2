import ControlButton from "./ControlButton.tsx";
import Span from "../../../../../components/Span.tsx";
import PageButton from "./PageButton.tsx";
import { FC } from "react";

interface PageButtonListProps {
    page: number;
    setPage: (index: number) => void;
    pageLength: number;
    className?: string;
}

const PageButtonList: FC<PageButtonListProps> = ({
    page,
    setPage,
    pageLength,
    className = "",
}) => {
    const visiblePages = 10;

    const handlePage = (index: number) => setPage(index);

    const handlePrev = () => {
        if (page === 0) {
            return;
        }
        setPage(page - 1);
    };

    const handleNext = () => {
        if (page + 1 === pageLength) {
            return;
        }
        setPage(page + 1);
    };

    const getPages = () => {
        let startPage = 0;
        let endPage = visiblePages;

        if (page >= 5) {
            startPage = page - 4;
            endPage = page + 5;
        }

        if (endPage > pageLength) {
            endPage = pageLength;
            startPage = pageLength - visiblePages;
            if (startPage < 0) {
                startPage = 0;
            }
        }

        return Array.from(
            { length: endPage - startPage },
            (_, index) => startPage + index,
        );
    };

    const pages = getPages();

    return (
        <div className={`h(40) space-between ${className}`}>
            <div className="hbox(center)">
                {page > 5 && (
                    <ControlButton onClick={() => handlePage(0)}>
                        <Span>처음</Span>
                    </ControlButton>
                )}
                {pageLength > 1 && (
                    <ControlButton onClick={handlePrev} disabled={page === 0}>
                        <Span>이전</Span>
                    </ControlButton>
                )}
                <div className="hbox px(23) gap(1) max-w(539)">
                    {pageLength > visiblePages && page >= 5 && (
                        <div className="w(40) h(40) text(pack)">
                            <Span>...</Span>
                        </div>
                    )}
                    {pages.map((index) => (
                        <PageButton
                            key={index}
                            isSelected={index === page}
                            onClick={() => handlePage(index)}
                        >
                            <Span>{index + 1}</Span>
                        </PageButton>
                    ))}
                    {pageLength > visiblePages && page < pageLength - 5 && (
                        <div className="w(40) h(40) text(pack)">
                            <Span>...</Span>
                        </div>
                    )}
                </div>
                {pageLength > 1 && (
                    <ControlButton
                        onClick={handleNext}
                        disabled={page + 1 === pageLength}
                    >
                        <Span>다음</Span>
                    </ControlButton>
                )}
                {pageLength > 5 && (
                    <ControlButton onClick={() => handlePage(pageLength - 1)}>
                        <Span>마지막</Span>
                    </ControlButton>
                )}
            </div>
        </div>
    );
};

export default PageButtonList;
