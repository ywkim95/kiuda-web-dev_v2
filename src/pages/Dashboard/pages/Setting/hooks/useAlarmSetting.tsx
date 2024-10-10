import { patchSensorAlarmSetting } from "../../../../../http/http.ts";
import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  initSetting,
  setAllSettingData,
} from "../../../../../util/DashboardUtils.ts";
import { SliderDataType } from "../../../../../constant/type.ts";
import { sensorSettingType } from "../../../../../http/httpType.ts";

interface useAlarmSettingProps {
  farm: FarmModel;
}

const useAlarmSetting = ({ farm }: useAlarmSettingProps) => {
  const [resetKey, setResetKey] = useState(0);
  // settingAll에서는 specId를 받아야함
  const [sensorAlarmSettings, setSensorAlarmSettings] = useState<
    sensorSettingType[]
  >([]);
  const [isShow, setIsShow] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () =>
      patchSensorAlarmSetting({
        sensorSettings: sensorAlarmSettings,
        _id: farm.id,
      }),
    onSuccess: async () => {
      setAllSettingData(farm.id, sensorAlarmSettings);
      setIsShow(false);
    },
  });

  useEffect(() => {
    if (farm) {
      setSensorAlarmSettings(
        initSetting(farm.sectors.flatMap((sector) => sector.sensors)),
      );
    }
  }, [farm]);

  const handleSave = () => {
    mutate();
  };

  const newSetData: SliderDataType[] = useMemo(() => {
    if (!farm) {
      return [];
    }

    const sliderData: SliderDataType[] = farm.sectors.flatMap(
      (sector) =>
        sector.sensors.map((sensor) => ({
          id: sensor.sensorSpec.id,
          name: sensor.sensorSpec.name,
          unit: sensor.sensorSpec.unit,
          min: sensor.sensorSpec.min,
          max: sensor.sensorSpec.max,
          revision: sensor.alarmSetting.revision,
          userMin: sensor.alarmSetting.min,
          userMax: sensor.alarmSetting.max,
        })),
    );

    const uniqueSliderDataSet = new Set<string>();

    return sliderData.filter((sensor) => {
      const key = `${sensor.id}`;
      if (uniqueSliderDataSet.has(key)) {
        return false;
      } else {
        uniqueSliderDataSet.add(key);
        return true;
      }
    });
  }, [farm]);

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

  const handleRollback = () => {
    if (!farm) {
      return null;
    }
    const initialSettings = initSetting(
      farm.sectors.flatMap((sector) => sector.sensors),
    );
    setSensorAlarmSettings(initialSettings);
    setResetKey((prevKey) => prevKey + 1);
    setIsShow(false);
  };

  return {
    handleSave,
    handleRollback,
    newSetData,
    resetKey,
    isShow,
    updateSensorSetting,
  };
};

export default useAlarmSetting;
