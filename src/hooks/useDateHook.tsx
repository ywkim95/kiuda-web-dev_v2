import { useCallback, useEffect, useState } from "react";
import { getFormattedDate } from "../constant/date.ts";
import useDateOptions from "./useDateOptions.tsx";
import DateButtonList from "../components/DateButtons/DateButtonList.tsx";
import useIndexStore from "../store/useIndexStore.ts";
import CustomDateComponent from "../components/CustomDateComponent.tsx";
import DropdownComponent from "../components/DropdownComponent.tsx";
import { DateType } from "../constant/type.ts";

const useDateHook = () => {
  const { setGraphIndex } = useIndexStore();
  const { dateOptions, setCustomDateFunc } = useDateOptions();
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [start, setStartDate] = useState<Date | null>(null);
  const [end, setEndDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState(dateOptions[2]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState<DateType>({
    start: "",
    end: "",
  });

  const handleSelectItem = useCallback(
    (i: number) => {
      const selected = dateOptions[i];
      if (selected === undefined) {
        return;
      }

      setShowCustomDate(selected.text === "사용자 설정");
      setStartDate(null);
      setEndDate(null);
      setSelectedOption(selected);
      setGraphIndex(0);
    },
    [dateOptions, setGraphIndex],
  );

  useEffect(() => {
    const updateSearchTerm = (start: string, end: string) => {
      if (searchTerm.start !== start || searchTerm.end !== end) {
        setSearchTerm({ start: start, end: end });
        setIsSearch(true);
      }
    };

    const prevDate = selectedOption.func();
    const today = getFormattedDate(new Date());

    if (typeof prevDate === "string") {
      updateSearchTerm(prevDate, today);
    } else {
      updateSearchTerm(prevDate.start, prevDate.end);
    }
  }, [selectedOption, searchTerm.start, searchTerm.end]);

  useEffect(() => {
    if (start && end) {
      const formattedStartDate = getFormattedDate(start);
      const formattedEndDate = getFormattedDate(end);
      if (
        searchTerm.start !== formattedStartDate ||
        searchTerm.end !== formattedEndDate
      ) {
        setCustomDateFunc(() => ({
          start: formattedStartDate,
          end: formattedEndDate,
        }));
        setSelectedOption(
          dateOptions.find((option) => option.text === "사용자 설정")!,
        );
        setIsSearch(true);
      }
    }
  }, [
    dateOptions,
    end,
    setCustomDateFunc,
    setIsSearch,
    setSelectedOption,
    start,
    searchTerm.start,
    searchTerm.end,
  ]);

  return {
    selectedOption,
    setSelectedOption,
    handleSelectItem,
    isSearch,
    searchTerm,
    start,
    setStartDate,
    end,
    setEndDate,
    showCustomDate,
    setShowCustomDate,
    CustomDateComponent: () => (
        <CustomDateComponent isOpen={showCustomDate} setIsOpen={setShowCustomDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
    ),
    DropdownComponent: () => (
      <DropdownComponent
        title={selectedOption.text}
        list={dateOptions.map((option) => option.text)}
        onSelectItem={handleSelectItem}
      />
    ),
    ButtonsComponent: ({ className = "pt(100) w(fill)" }) => (
      <DateButtonList
        index={dateOptions.findIndex(
          (option) => option.text === selectedOption.text,
        )}
        handleClick={handleSelectItem}
        className={className}
      />
    ),
  };
};

export default useDateHook;
