import useModalStore from "../useModalStore.ts";
import { beforeEach } from "vitest";
import ModalType from "../../components/Modal/ModalType.ts";

const modalStore = () => {
  const { setModal } = useModalStore.getState();
  setModal(undefined);
};

describe("useModalStore", () => {
  beforeEach(() => {
    modalStore();
  });

  test("show initialize with undefined", () => {
    const { modal } = useModalStore.getState();
    expect(modal).toBe(undefined);
  });

  test("set modal to ModalType.Alarm", () => {
    const { setModal } = useModalStore.getState();
    setModal(ModalType.Alarm);

    const { modal } = useModalStore.getState();
    expect(modal).toBe(ModalType.Alarm);
  });
});
