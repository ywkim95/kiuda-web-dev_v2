import { create, StateCreator } from "zustand";

interface State {
  cameraIndex: number;
}

interface Action {
  setCameraIndex: (index: number) => void;
}

type useCameraSettingStoreProps = State & Action;

const useCameraSettingCreator: StateCreator<useCameraSettingStoreProps> = (
  set,
) => ({
  cameraIndex: 0,
  setCameraIndex: (index: number) => set({ cameraIndex: index }),
});

const useCameraSettingStore = create<useCameraSettingStoreProps>(
  useCameraSettingCreator,
);

export default useCameraSettingStore;
