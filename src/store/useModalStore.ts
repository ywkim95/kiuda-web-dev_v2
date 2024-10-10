import ModalType from "../components/Modal/ModalType.ts";
import { create, StateCreator } from "zustand";

interface ModalProps {
  modal: ModalType | undefined;
  setModal: (value: ModalType | undefined) => void;
}

const useModalCreator: StateCreator<ModalProps> = (set) => ({
  modal: undefined,
  setModal: (value) => set({ modal: value }),
});

const useModalStore = create(useModalCreator);

export default useModalStore;
