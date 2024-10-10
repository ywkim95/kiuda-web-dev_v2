import useShowSectorStore from "../useShowSectorStore.ts";

const showSectorStore = () => {
  const { setList } = useShowSectorStore.getState();
  setList([]);
};

describe("useShowSectorStore", () => {
  beforeEach(() => {
    showSectorStore();
  });

  test("show initialize with empty array", () => {
    const { list } = useShowSectorStore.getState();
    expect(list).toEqual([]);
  });

  test("set list to [{id: 1, show: true}]", () => {
    const { setList } = useShowSectorStore.getState();
    setList([{ id: 1, show: true }]);

    const { list } = useShowSectorStore.getState();
    expect(list).toEqual([{ id: 1, show: true }]);
  });
});
