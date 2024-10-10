import { create, StateCreator } from "zustand";

interface State {
  captureId: number | undefined;
}

interface Action {
  setCaptureId: (captureId: number | undefined) => void;
}

type useCameraDetailStoreProps = State & Action;

const useCameraDetailCreator: StateCreator<useCameraDetailStoreProps> = (
  set,
) => ({
  captureId: undefined,
  setCaptureId: (captureId: number | undefined) => set({ captureId }),
});

const useCameraDetailStore = create<useCameraDetailStoreProps>(
  useCameraDetailCreator,
);

export default useCameraDetailStore;
