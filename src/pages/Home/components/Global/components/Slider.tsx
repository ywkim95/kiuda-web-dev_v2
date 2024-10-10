import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import Span from "../../../../../components/Span.tsx";
import CustomSlider from "./CustomSlider.tsx";
import Revision from "./Revision.tsx";
import SettingInputField from "./SettingInputField.tsx";
import {calculateStep} from "../../../../../util/Util.ts";

interface SliderProps {
  name: string;
  unit: string;
  min: number;
  max: number;
  revision: number;
  userMin: number;
  userMax: number;
  width: string;
  onUpdate: (minValue: number, maxValue: number, revisionValue: number) => void;
}

const Slider: FC<SliderProps> = ({
  name,
  unit,
  min,
  max,
  revision,
  userMin,
  userMax,
  width,
  onUpdate,
}) => {
  const [minValue, setMinValue] = useState(userMin);
  const [maxValue, setMaxValue] = useState(userMax);
  const [revisionValue, setRevisionValue] = useState(revision);

  useEffect(() => {
    if (userMin !== minValue) setMinValue(userMin);
    if (userMax !== maxValue) setMaxValue(userMax);
    if (revision !== revisionValue) setRevisionValue(revision);
  }, [userMin, userMax, revision]);

  const settingValue = calculateStep(min, max);
    // Math.round((max - min) * 0.1) > 0 ? Math.round((max - min) * 0.1) : 1;

  const handleRevisionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRevisionValue(Number(e.target.value)),
    [],
  );

  const handleMinChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if(value < min) {
        setMinValue(min);
      } else {
        setMinValue(value);
      }
    }
  }, []);

  const handleMinBlur = useCallback(() => {
    if (minValue >= maxValue) {
      setMinValue(maxValue - settingValue);
    }
  }, [maxValue, minValue, settingValue]);

  const handleMaxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      if(value > max) {
        setMaxValue(max);
      } else {
        setMaxValue(value);
      }
    }
  }, []);

  const handleMaxBlur = useCallback(() => {
    if (maxValue <= minValue) {
      setMaxValue(minValue + settingValue);
    }
  }, [maxValue, minValue, settingValue]);

  useEffect(() => {
    onUpdate(minValue, maxValue, revisionValue);
  }, [minValue, maxValue, revisionValue]);

  return (
    <div className={`hbox w(${width}) h(110)`}>
      <div className="vbox w(52) text(pack) mr(12)">
        <Span>{name}</Span>
        <Span>({unit})</Span>
      </div>
      <div className="vbox w(fill) mr(16)">
        <div className="w(100%) space-between hbox px(15) mb(8) mt(2)">
          <Span>최소</Span>
          <Span>최대</Span>
        </div>
        <CustomSlider
          step={settingValue}
          min={min}
          max={max}
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
        />
        <div className="hbox space-between w(fill) mt(20)">
          <SettingInputField
            type="number"
            value={minValue}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            height="30"
            width="54"
          />
          <SettingInputField
            type="number"
            value={maxValue}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            height="30"
            width="54"
          />
        </div>
      </div>
      <Revision
        revisionValue={revisionValue}
        handleRevisionChange={handleRevisionChange}
      />
    </div>
  );
};

export default Slider;
