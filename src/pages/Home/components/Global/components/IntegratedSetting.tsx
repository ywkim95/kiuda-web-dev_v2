import Slider from "./Slider.tsx";
import useScrollBar from "../../../../../hooks/useScrollBar.tsx";
import { FC, useCallback, useEffect, useState } from "react";
import ValueModel from "../../../../../models/Sensor/ValueModel.ts";
import SensorModel from "../../../../../models/Sensor/SensorModel.ts";
import { sensorSettingType } from "../../../../../http/httpType.ts";
import { useMutation } from "@tanstack/react-query";
import {
  patchGlobalAlarmSetting,
  queryClient,
} from "../../../../../http/http.ts";
import {
  initSetting,
  setAllSettingData,
} from "../../../../../util/DashboardUtils.ts";
import { useGetFarmId } from "../../../../../hooks/useFarmLoader.tsx";
import { BorderRadius } from "../../../../../constant/border.ts";
import { fontSize, fontWeight } from "../../../../../constant/font.ts";
import AlarmSettingModel from "../../../../../models/Alarm/AlarmSettingModel.ts";
import alarmSettingModel from "../../../../../models/Alarm/AlarmSettingModel.ts";

interface IntegratedSettingProps {
  values: ValueModel[];
  sensors: SensorModel[];
  height: number;
  isSoil: boolean;
}

const IntegratedSetting: FC<IntegratedSettingProps> = ({
  values,
  sensors,
  height,
  isSoil,
}) => {
  const farmId = useGetFarmId();
  const { containerRef, contentRef, scrollbarRef, handleScrollbarDrag } =
    useScrollBar();

  const [resetKey, setResetKey] = useState(0);
  const [sensorAlarmSettings, setSensorAlarmSettings] = useState<
    sensorSettingType[]
  >([]);
  const [isShow, setIsShow] = useState(false);

  const { mutate } = useMutation({
    mutationFn: ({sensorSettings}:{sensorSettings: alarmSettingModel[]}) =>
      patchGlobalAlarmSetting({
        sensorSettings,
        _id: farmId,
      }),
    onSuccess: async () => {
      setAllSettingData(farmId, sensorAlarmSettings);
      setIsShow(false);
      await queryClient.invalidateQueries({ queryKey: ["farm", farmId] });
    },
  });

  const updateSensorSetting = useCallback(
    (id: number, min: number, max: number, revision: number) => {
      setSensorAlarmSettings((prevSettings) => {
        const newSettings = prevSettings.map((setting) => {
          if (setting.id === id) {
            return {
              ...setting,
              min,
              max,
              revision,
            };
          }
          return setting;
        });

        const isChanged = newSettings.some(
          (setting, index) =>
            setting.min !== prevSettings[index].min ||
            setting.max !== prevSettings[index].max ||
            setting.revision !== prevSettings[index].revision,
        );

        setIsShow(isChanged);
        return newSettings;
      });
    },
    [],
  );

  useEffect(() => {
    setSensorAlarmSettings(initSetting(sensors));
  }, [sensors]);

  const handleSave = () => {
      const sensorSettings = sensorAlarmSettings.filter((setting) => {
          const sensor = sensors.find((sensor) => sensor.id === setting.id);
        if (!sensor) {
          return false;
        }
        return (
          setting.min !== sensor.alarmSetting.min ||
          setting.max !== sensor.alarmSetting.max ||
          setting.revision !== sensor.alarmSetting.revision
        )
      });
      const newSensorSettings = sensorSettings.map((setting) => {
          const sensor = sensors.find((sensor) => sensor.id === setting.id);
          if (!sensor) {
              return;
          }
          return {
              ...setting,
              dangerThreshold: sensor.alarmSetting.dangerThreshold,
              highThreshold: sensor.alarmSetting.highThreshold,
              lowThreshold: sensor.alarmSetting.lowThreshold,
          };
      }).filter((setting) => setting !== undefined) as {} as AlarmSettingModel[];
      mutate({sensorSettings: newSensorSettings});
  };

  const handleRollback = () => {
    const initialSettings = initSetting(sensors);
    setSensorAlarmSettings(initialSettings);
    setResetKey((prevKey) => prevKey + 1);
    setIsShow(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="w(100%) h(244) overflow(hidden) relative"
      >
        <div
          ref={contentRef}
          className="scrollNone grid(2) gap(24) c(--color-text) w(708) h(244) scroll-y content-box "
        >
          {values.map((value) => {
            const sensor = sensors.find((spec) => spec.id === value.id);
            if (!sensor) {
              return null;
            }
            const key = `${value.id}-${resetKey}`;
            return (
              <Slider
                key={key}
                name={sensor.sensorSpec.target}
                unit={sensor.sensorSpec.unit}
                min={sensor.sensorSpec.min}
                max={sensor.sensorSpec.max}
                revision={sensor.alarmSetting.revision}
                userMin={sensor.alarmSetting.min}
                userMax={sensor.alarmSetting.max}
                width="338"
                onUpdate={(minValue, maxValue, revisionValue) => {
                  updateSensorSetting(
                    value.id,
                    minValue,
                    maxValue,
                    revisionValue,
                  );
                }}
              />
            );
          })}
        </div>
        {isSoil && (
          <div
            ref={scrollbarRef}
            className={`absolute top(0) right(0) w(8) h(${height}) bg(--color-nonActive) r(4) pointer hover:bg(--color-primary) active:bg(--color-primary)`}
            onMouseDown={handleScrollbarDrag}
          />
        )}
      </div>
      <div className="absolute(~200,~290) hbox h(40)">
        {isShow && (
          <>
            <button
              onClick={handleSave}
              className={`w(48) h(100%) bg(--color-primary) rl(${BorderRadius.INPUT}) b(none) c(white) font(${fontSize.MEDIUM}) ${fontWeight.NORMAL}`}
            >
              저장
            </button>
            <button
              onClick={handleRollback}
              className={`w(72) h(100%) bg(--color-box) rr(${BorderRadius.INPUT}) b(--color-second-background) c(--color-text) font(${fontSize.MEDIUM}) ${fontWeight.NORMAL}`}
            >
              되돌리기
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default IntegratedSetting;
