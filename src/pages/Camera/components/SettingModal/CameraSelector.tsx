import Dropdown from "../../../../components/Dropdown/Dropdown.tsx";
import SelectItem from "../CameraSearch/components/SelectItem.tsx";
import ChannelInput from "./ChannelInput.tsx";
import CameraSettingModel from "../../../../models/Image/CameraSettingModel.ts";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { cloneDeep } from "lodash";
import useCameraSettingStore from "../../../../store/useCameraSettingStore.ts";

interface CameraListProps {
  cameraSettings: CameraSettingModel[];
  isAll: boolean;
  setIsAll: Dispatch<SetStateAction<boolean>>;
  onSetting: (setting: CameraSettingModel[]) => void;
}

const CameraSelector: FC<CameraListProps> = ({
  cameraSettings,
  isAll,
  setIsAll,
  onSetting,
}) => {
  const { cameraIndex, setCameraIndex } = useCameraSettingStore();
  const [cameraList, setCameraList] = useState<CameraSettingModel[]>(
    cloneDeep(cameraSettings),
  );

  const selectedCameraSetting = cameraList[cameraIndex];

  const handleSelectItem = (index: number) => {
    setCameraIndex(index);
  };

  const handleClickBox = () => {
    setIsAll((prev) => !prev);
  };

  useEffect(() => {
    setCameraList(
      isAll
        ? cameraSettings.map((s) => {
            return {
              ...s, 
              fps: 0,
              exposureTimes: [0, 0, 0],
            };
          })
        : cloneDeep(cameraSettings),
    );
  }, [cameraSettings, isAll]);

  useEffect(() => {
    if (isAll) {
      if (
        !cameraList.every((camera) => {
          return (
            camera.exposureTimes[0] === 0 &&
            camera.exposureTimes[1] === 0 &&
            camera.exposureTimes[2] === 0 &&
            camera.fps === 0
          );
        })
      ) {
        onSetting(cameraList);
      }
    } else {
      const filteredCameraList = cameraList.filter((camera) => {
        const cs = cameraSettings.find((cs) => cs.id === camera.id);
        if (!cs) {
          return false;
        }
        if (camera.exposureTimes[0] !== cs.exposureTimes[0]) {
          return true;
        } else if (camera.exposureTimes[1] !== cs.exposureTimes[1]) {
          return true;
        } else if (camera.exposureTimes[2] !== cs.exposureTimes[2]) {
          return true;
        } else return camera.fps !== cs.fps;
      });
      onSetting(cloneDeep(filteredCameraList));
    }
  }, [cameraList, cameraSettings, isAll]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "rgb" | "nir1" | "nir2" | "fps",
    isAll: boolean,
  ) => {
      console.log(e.target.value);
    const value = parseFloat(e.target.value);
    console.log(value);
    if (isAll) {
      setCameraList((prev) => {
        return prev.map((camera) => {
          switch (type) {
            case "fps":
              camera.fps = value;
              break;
            case "rgb":
              camera.exposureTimes[0] = value;
              break;
            case "nir1":
              camera.exposureTimes[1] = value;
              break;
            case "nir2":
              camera.exposureTimes[2] = value;
              break;
          }
          return camera;
        });
      });
    } else {
      setCameraList((prev) => {
        return prev.map((camera, index) => {
          if (index === cameraIndex) {
            switch (type) {
              case "fps":
                camera.fps = value;
                break;
              case "rgb":
                camera.exposureTimes[0] = value;
                break;
              case "nir1":
                camera.exposureTimes[1] = value;
                break;
              case "nir2":
                camera.exposureTimes[2] = value;
                break;
            }
          }
          return camera;
        });
      });
    }
  };

  return (
    <>
      <div className="hbox gap(19)">
        <Dropdown
          title={selectedCameraSetting.alias}
          list={cameraList.map((camera) => camera.alias)}
          onSelectItem={handleSelectItem}
          className="w(265)"
          disabled={isAll}
        />
        <SelectItem isSelected={isAll} onClick={handleClickBox}>
          전체 선택
        </SelectItem>
      </div>
      <div className="hbox justify-between">
        <ChannelInput
          name="RGB"
          description="(Red Green Blue)"
          id="RGB"
          maxLength={5}
          value={selectedCameraSetting.exposureTimes[0]}
          onChange={(e) => handleChange(e, "rgb", isAll)}
        />
        <ChannelInput
          name="NIR1"
          description="(Near InfraRed 1)"
          id="NIR1"
          maxLength={5}
          value={selectedCameraSetting.exposureTimes[1]}
          onChange={(e) => handleChange(e, "nir1", isAll)}
        />
        <ChannelInput
          name="NIR2"
          description="(Near InfraRed 2)"
          id="NIR2"
          maxLength={5}
          value={selectedCameraSetting.exposureTimes[2]}
          onChange={(e) => handleChange(e, "nir2", isAll)}
        />
        <ChannelInput
          name="FPS"
          description="(Frames Per Second)"
          id="FPS"
          maxLength={3}
          value={selectedCameraSetting.fps}
          onChange={(e) => handleChange(e, "fps", isAll)}
        />
      </div>
    </>
  );
};

export default CameraSelector;
