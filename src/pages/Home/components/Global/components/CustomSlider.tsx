import { BorderRadius } from "../../../../../constant/border.ts";
import {ChangeEvent, FC, useCallback, useEffect, useRef} from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  step: number;
}

const CustomSlider: FC<CustomSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  step,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMinChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value <= maxValue - step) {
          setMinValue(value);
      }
  },[minValue, step, setMaxValue]);

  const handleMaxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value >= minValue + step) {
          setMaxValue(value);
      }
  },[maxValue, step, setMinValue]);
  
  const updateProgress = useCallback(() => {
      if (progressRef.current) {
          const adjustedMinValue = Math.max(minValue, min);
          const adjustedMaxValue = Math.min(maxValue, max);
          
          const minValuePercentage = ((adjustedMinValue - min) / (max - min)) * 100;
          const maxValuePercentage = ((adjustedMaxValue - min) / (max - min)) * 100;
          progressRef.current.style.left = `${minValuePercentage}%`;
          progressRef.current.style.right = `${100 - maxValuePercentage}%`;
      }
  },[minValue, maxValue, max, min]);

  useEffect(() => {
      updateProgress();
  }, [minValue, maxValue, updateProgress]);

  return (
    <div className="relative rangeSlider">
      <div
        className={`w(100%) h(8) r(${BorderRadius.INPUT}) absolute left(0) bg(--color-seperated) z(1)`}
      >
        <div
          ref={progressRef}
          className={`h(8) r(${BorderRadius.INPUT}) absolute left(0) bg(--color-primary) z(2)`}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className="pointer-events-none absolute h(0) w(100%) outline(none) pointer z(3)"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
        className="pointer-events-none absolute h(0) w(100%) outline(none) pointer z(4)"
      />
    </div>
  );
};

export default CustomSlider;
