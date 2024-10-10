import { create, StateCreator } from "zustand";

export interface useIndexStoreProps {
  valueIndex: number;
  graphIndex: number;
  setValueIndex: (valueIndex: number) => void;
  setGraphIndex: (graphIndex: number) => void;
}

export const useIndexCreator: StateCreator<useIndexStoreProps> = (set) => ({
  valueIndex: 0,
  graphIndex: 0,
  setValueIndex: (valueIndex: number) => set({ valueIndex }),
  setGraphIndex: (graphIndex: number) => set({ graphIndex }),
});

const useIndexStore = create(useIndexCreator);

export default useIndexStore;
