import SettingHeader from "../SettingHeader.tsx";
import Slider from "../../../../../Home/components/Global/components/Slider.tsx";
import Section from "../../../../../../components/Section.tsx";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import { useGetFarmId } from "../../../../../../hooks/useFarmLoader.tsx";
import {
    patchSensorAlarmSetting,
    queryClient,
} from "../../../../../../http/http.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sensorSettingType } from "../../../../../../http/httpType.ts";
import { useMutation } from "@tanstack/react-query";
import {
    initSetting,
    setAllSettingData,
} from "../../../../../../util/DashboardUtils.ts";
import { SliderDataType } from "../../../../../../constant/type.ts";

const AlarmSetting = () => {
    const farmId = useGetFarmId();
    const farm = queryClient.getQueryData<FarmModel>([
        "farm",
        farmId,
    ]) as FarmModel;
    const [resetKey, setResetKey] = useState(0);
    // settingAll에서는 specId를 받아야함
    const [sensorAlarmSettings, setSensorAlarmSettings] = useState<
        sensorSettingType[]
    >([]);
    const [isShow, setIsShow] = useState(false);
    
    const { mutate } = useMutation({
        mutationFn: ({sensorSettings}:{sensorSettings:sensorSettingType[]}) =>
            patchSensorAlarmSetting({
                sensorSettings,
                _id: farmId,
            }),
        onSuccess: async () => {
            setAllSettingData(farm.id, sensorAlarmSettings);
            setIsShow(false);
            await queryClient.invalidateQueries({ queryKey: ["farm", farmId] });
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
        const sensorSettings:sensorSettingType[] = farm.sectors.flatMap((sector) => {
            return sector.sensors.map((sensor) => {
                const setting = sensorAlarmSettings.find((setting) => {
                    return setting.id === sensor.sensorSpec.id;
                });
                
                if(!setting) {
                    return {
                        id: sensor.id,
                        min: sensor.alarmSetting.min,
                        max: sensor.alarmSetting.max,
                        revision: sensor.alarmSetting.revision,
                    };
                }
                
                return {
                    id: sensor.id,
                    min: setting.min,
                    max: setting.max,
                    revision: setting.revision,
                };
            })
        })

        mutate({sensorSettings});
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
    
    return (
        <Section className="w(100%) h(355)">
            <SettingHeader
                title="센서 알람 범위"
                onSave={handleSave}
                onRollback={handleRollback}
                isShow={isShow}
            />
            <div className="grid(2) gap(72) px(30)">
                {newSetData.map((sensorSpec) => {
                    const key = `${sensorSpec.id}-${resetKey}`;
                    return (
                        <Slider
                            key={key}
                            name={sensorSpec.name}
                            unit={sensorSpec.unit}
                            min={sensorSpec.min}
                            max={sensorSpec.max}
                            revision={sensorSpec.revision}
                            userMin={sensorSpec.userMin}
                            userMax={sensorSpec.userMax}
                            width="100%"
                            onUpdate={(minValue, maxValue, revisionValue) =>
                                updateSensorSetting(
                                    sensorSpec.id,
                                    minValue,
                                    maxValue,
                                    revisionValue,
                                )
                            }
                        />
                    );
                })}
            </div>
        </Section>
    );
};

export default AlarmSetting;
