import useIndexStore from "../useIndexStore.ts";
import { beforeEach } from "vitest";

const indexStore = () => {
  const { setGraphIndex, setValueIndex } = useIndexStore.getState();
  setGraphIndex(0);
  setValueIndex(0);
};

describe("useIndexStore", () => {
  beforeEach(() => {
    indexStore();
  });

  test("show initialize with 0", () => {
    const { valueIndex, graphIndex } = useIndexStore.getState();
    expect(valueIndex).toBe(0);
    expect(graphIndex).toBe(0);
  });

  test("set valueIndex to 1", () => {
    const { setValueIndex } = useIndexStore.getState();
    setValueIndex(1);
    const { valueIndex } = useIndexStore.getState();
    expect(valueIndex).toBe(1);
  });

  test("set graphIndex to 1", () => {
    const { setGraphIndex } = useIndexStore.getState();
    setGraphIndex(1);
    const { graphIndex } = useIndexStore.getState();
    expect(graphIndex).toBe(1);
  });
});
