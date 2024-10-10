import {create, StateCreator} from "zustand";

export interface State {
    queryKey: string | undefined;
}

export interface Action {
    setQueryKey: (queryKey: string | undefined) => void;
}

export type useQueryKeyStoreProps = State & Action;

const useQueryKeyCreator: StateCreator<useQueryKeyStoreProps> = (set) => ({
    queryKey: undefined,
    setQueryKey: (queryKey: string | undefined) => set({queryKey}),
});


const useQueryKeyStore = create<useQueryKeyStoreProps>(useQueryKeyCreator);

export default useQueryKeyStore;
