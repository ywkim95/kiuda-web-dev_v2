import { BorderRadius } from "../../../../../../constant/border.ts";
import SettingHeader from "../SettingHeader.tsx";
import Span from "../../../../../../components/Span.tsx";
import { fontSize } from "../../../../../../constant/font.ts";
import P from "../../../../../../components/P.tsx";
import { useCallback, useEffect, useState } from "react";
import useFarmData from "../../../../../../hooks/useFarmData.tsx";
import FarmModel from "../../../../../../models/Farm/FarmModel.ts";
import { useMutation } from "@tanstack/react-query";
import {
  patchSensorAlarmSetting,
  queryClient,
} from "../../../../../../http/http.ts";
import { sensorSettingType } from "../../../../../../http/httpType.ts";
import { cloneDeep } from "lodash";
import {
  EachSectorSettingType,
  EachSettingType,
} from "../../../../../../constant/type.ts";
import EachSector from "./EachSector.tsx";
import SectorModel from "../../../../../../models/Sector/SectorModel.ts";

const EachSetting = () => {
  // 농장 데이터
  const farm = useFarmData();

  // 전체 저장, 되돌리기 버튼 표기 유무 상태 값
  const [isShow, setIsShow] = useState<boolean>(false);

  // 인덱스 별 컴포넌트의 접힌 상태 값
  // 인덱스 별 컴포넌트 값이 변경되었는지 여부
  const [itemsState, setItemsState] = useState<EachSectorSettingType[]>([]);

  // 실제 데이터 매핑
  const [items, setItems] = useState<SectorModel[]>([]);

  useEffect(() => {
    if (farm) {
      const initialItemsState: EachSettingType[] = farm.sectors.map(
        (sector) => ({
          id: sector.id,
          modified: false,
          fold: false,
        }),
      );
      setItemsState(itemsState.length === 0 ? initialItemsState : itemsState);
      setItems(items.length === 0 ? farm.sectors : items);
    }
  }, [farm, items, itemsState]);

  useEffect(() => {
    if (farm) {
      const show =
        itemsState.some((item) => item.modified) &&
        farm.sectors.some((sector, sectorIndex) => {
          return sector.sensors.some((sensor, sensorIndex) => {
            const correspondingSensor =
              items[sectorIndex]?.sensors[sensorIndex];
            if (!correspondingSensor) {
              return false;
            }
            // if (correspondingSensor.id === 2) {
            //   console.log(sensor);
            //   console.log(correspondingSensor);
            // }
            return (
              sensor.alarmSetting.min !==
                correspondingSensor.alarmSetting.min ||
              sensor.alarmSetting.max !==
                correspondingSensor.alarmSetting.max ||
              sensor.alarmSetting.revision !==
                correspondingSensor.alarmSetting.revision
            );
          });
        });

      setIsShow(show);
    }
  }, [farm, items, itemsState]);

  // 전체 저장 API
  const { mutate: AllSave } = useMutation({
    mutationFn: (sensorAlarmSettings: sensorSettingType[]) =>
      patchSensorAlarmSetting({
        sensorSettings: sensorAlarmSettings,
        _id: farm!.id,
      }),
    onSuccess: (_, variables) => {
      if (!farm) {
        window.alert("데이터 에러 발생 AllSave");
        return;
      }
      updateSectorDataAll(farm.id, variables);
      const newFarm = queryClient.getQueryData([
        "farm",
        farm.id,
      ]) as FarmModel;

      setItemsState(
        newFarm.sectors.map((sector) => ({
          id: sector.id,
          modified: false,
          fold: false,
        })),
      );
      setItems(newFarm.sectors);
    },
  });

  // 개별저장 API
  const { mutate: Save } = useMutation({
    mutationFn: ({
      newSensorSetting,
    }: {
      newSensorSetting: sensorSettingType[];
    }) =>
      patchSensorAlarmSetting({
        sensorSettings: [...newSensorSetting],
        _id: farm!.id,
      }),
    onSuccess: (_, variables) => {
      if (!farm) {
        window.alert("데이터 에러 발생 Save");
        return;
      }
      updateSectorData(farm.id, variables.newSensorSetting);

      setItemsState((prevState) => {
        // 먼저 farm.farm_sectorList를 기준으로 variable의 newSensorSetting에서 아이디가 일치하는 섹터의 값을 먼저 가져온다. 하나라도 일치하면 가져오도록한다.
        // 그리고 그 섹터를 기준으로 새로운 itemsState를 만들어서 리턴한다.

        const sector = farm.sectors.find((sector) => {
          return sector.sensors.some((sensor) => {
            return variables.newSensorSetting.some((setting) => {
              return setting.id === sensor.id;
            });
          });
        });

        if (sector) {
          const newItemsState: EachSectorSettingType = {
            id: sector.id,
            modified: false,
            fold: false,
          };

          return prevState.map((item) => {
            if (item.id === sector.id) {
              return newItemsState;
            }

            return item;
          });
        } else {
          return prevState;
        }
      });
    },
  });

  const handleSaveAll = useCallback(() => {
    const sensorAlarmSettings = items
      .filter((item, index) => {
        const sector = farm?.sectors[index];
        if (!sector) {
          return false;
        }

        return item.sensors.some((sensor, sensorIndex) => {
          const originalSensor = sector.sensors[sensorIndex].alarmSetting;

          return (
            sensor.alarmSetting.min !== originalSensor.min ||
            sensor.alarmSetting.max !== originalSensor.max ||
            sensor.alarmSetting.revision !== originalSensor.revision
          );
        });
      })
      .map((item) => {
        return item.sensors.map((sensor) => {
          return {
            id: sensor.id,
            min: sensor.alarmSetting.min,
            max: sensor.alarmSetting.max,
            revision: sensor.alarmSetting.revision,
          };
        });
      })
      .flat();

    AllSave(sensorAlarmSettings);
  }, [AllSave, farm?.sectors, items]);

  const handleRollbackAll = useCallback(() => {
    if (!farm) {
      window.alert("데이터 에러 발생 handleRollbackAll");
      return;
    }
    const newFarm = queryClient.getQueryData([
      "farm",
      farm.id,
    ]) as FarmModel;
    setIsShow(false);
    setItemsState((prevState) =>
      prevState.map((itemState) => ({
        ...itemState,
        modified: false,
        fold: false,
      })),
    );
    setItems(newFarm.sectors);
  }, [farm]);

  const handleCheckedAll = useCallback(() => {
    const isAllChecked = itemsState.every((value) => value.modified);
    setItemsState((prevState) =>
      prevState.map((item) => ({ ...item, modified: !isAllChecked })),
    );
  }, [itemsState]);

  const handleSave = useCallback(
    (sectorId: number) => {
      const sector = items.find((item) => item.id === sectorId);
      if (!sector) {
        return;
      }

      const newSensorSetting = sector.sensors.map((sensor) => {
        return {
          id: sensor.id,
          min: sensor.alarmSetting.min,
          max: sensor.alarmSetting.max,
          revision: sensor.alarmSetting.revision,
        };
      });

      Save({ newSensorSetting });
    },
    [Save, items],
  );

  const handleRollback = useCallback(
    (sectorId: number) => {
      if (!farm) {
        window.alert("데이터 에러 발생 handleRollback");
        return;
      }

      const newFarm = queryClient.getQueryData([
        "farm",
        farm.id,
      ]) as FarmModel;

      const sector = newFarm.sectors.find(
        (item) => item.id === sectorId,
      );

      if (!sector) {
        window.alert("찾을 수 없는 sector 입니다.");
        return;
      }

      setItems((prevState) => {
        return prevState.map((item) => {
          if (item.id === sectorId) {
            return cloneDeep(sector);
          }
          return item;
        });
      });

      setItemsState((prevState) =>
        prevState.map((stateItem) => {
          if (stateItem.id === sectorId) {
            return cloneDeep({
              ...stateItem,
              modified: false,
            });
          } else {
            return { ...stateItem };
          }
        }),
      );
    },
    [farm],
  );

  const handleFold = useCallback((sectorId: number, value?: boolean) => {
    setItemsState((prevState) =>
      prevState.map((item) => {
        if (item.id === sectorId) {
          return {
            ...item,
            fold: value ?? !item.fold,
          };
        } else {
          return item;
        }
      }),
    );
  }, []);

  const handleChecked = useCallback((sectorId: number, value?: boolean) => {
    setItemsState((prevState) =>
      prevState.map((item) => {
        if (item.id === sectorId) {
          return {
            ...item,
            modified: value ?? !item.modified,
          };
        } else {
          return item;
        }
      }),
    );
  }, []);

  const updateSensorSetting = useCallback(
    (sensorId: number, userMin: number, userMax: number, revision: number) => {

      setItems((prevSettings) => {
        const newSettings = prevSettings.map((setting) => {
          const newSensorList = setting.sensors.map((sensor) => {
            if (sensor.id === sensorId) {
              return {
                ...sensor,
                alarmSetting: {
                  ...sensor.alarmSetting,
                  min: userMin,
                  max: userMax,
                  revision: revision,
                },
              };
            } else {
              return sensor;
            }
          });

          return {
            ...setting,
            sensors: newSensorList,
          };
        });

        // Update itemsState based on newSettings
        setItemsState((prevState) =>
          prevState.map((item, index) => {
            const setting = newSettings[index];
            const sensorModified = setting.sensors.some((sensor, i) => {
              const originalSensor =
                farm!.sectors[index].sensors[i];

              return (
                sensor.id === originalSensor.id &&
                (sensor.alarmSetting.min !== originalSensor.alarmSetting.min ||
                  sensor.alarmSetting.max !== originalSensor.alarmSetting.max ||
                  sensor.alarmSetting.revision !== originalSensor.alarmSetting.revision)
              );
            });
            // console.log(sensorModified);

            return {
              ...item,
              modified: sensorModified,
            };
          }),
        );

        return newSettings;
      });
    },
    [farm],
  );
  return (
    <div
      className={`r(${BorderRadius.MAIN}) box-shadow(4/12/30/0/#00000017) w(100%) h(734) overflow(hidden) relative`}
    >
      <SettingHeader
        title="센서 알람 범위"
        onSave={handleSaveAll}
        onRollback={handleRollbackAll}
        isShow={isShow}
      >
        <div className="hbox gap(14) pointer" onClick={handleCheckedAll}>
          <div
            className={`w(26) h(26) r(${BorderRadius.INPUT}) bg(white) b(--color-border) bw(2) text(pack)`}
          >
            {itemsState.every((item) => item.modified) && (
              <Span fontSize={fontSize.BIG}>✓</Span>
            )}
          </div>
          <P>전체 선택</P>
        </div>
      </SettingHeader>
      <div className="custom-scroll w(100%) h(615) vbox gap(8) p(15/0/15/30) overflow-y(scroll) -webkit-scrollbar::w(30)+bg(transparent) -webkit-scrollbar-thumb::b(10/white)+r(20)+pointer">
        {items.map((sector, index) => {
          return (
            <EachSector
              key={sector.id}
              sector={sector}
              index={index}
              itemState={itemsState[index]}
              handleChecked={handleChecked}
              handleRollback={handleRollback}
              handleSave={handleSave}
              handleFold={handleFold}
              updateSensorSetting={updateSensorSetting}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EachSetting;

const updateSectorDataAll = (
  farmId: number,
  sensorAlarmSettings: sensorSettingType[],
) => {
  queryClient.setQueryData(["farm", farmId], (prev: FarmModel) => {
    const newFarm = cloneDeep(prev) as FarmModel;
    newFarm.sectors.forEach((sector) => {
      sector.sensors.forEach((sensor) => {
        const setting = sensorAlarmSettings.find(
          (setting) => setting.id === sensor.id,
        );
        if (setting) {
          sensor.alarmSetting.min = setting.min;
          sensor.alarmSetting.max = setting.max;
          sensor.alarmSetting.revision = setting.revision;
        }
      });
    });
    return newFarm;
  });
};

const updateSectorData = (
  farmId: number,
  newSensorSetting: sensorSettingType[],
) => {
  queryClient.setQueryData(["farm", farmId], (prevFarm: FarmModel) => {
    if (!prevFarm) {
      return prevFarm;
    }

    return {
      ...prevFarm,
      farmInfo: {
        ...prevFarm,
        sectors: prevFarm.sectors.map((sector) => {
          return {
            ...sector,
            sensors: sector.sensors.map((sensor) => {
              const matchingSetting = newSensorSetting.find(
                (setting) => setting.id === sensor.id,
              );
              if (matchingSetting) {
                return {
                  ...sensor,
                  alarmSetting: {
                    sensorId: sensor.id,
                    min: matchingSetting.min,
                    max: matchingSetting.max,
                    revision: matchingSetting.revision,
                  },
                };
              } else {
                return sensor;
              }
            }),
          };
        }),
      },
    };
  });
};
