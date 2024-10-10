import { create, StateCreator } from "zustand";

interface useShowSectorStoreProps {
  list: {
    id: number;
    show: boolean;
  }[];
  setList: (list: { id: number; show: boolean }[]) => void;
}

const useShowSectorCreator: StateCreator<useShowSectorStoreProps> = (set) => ({
  list: [],
  setList: (list: { id: number; show: boolean }[]) => set({ list }),
});

const useShowSectorStore = create(useShowSectorCreator);

export default useShowSectorStore;
