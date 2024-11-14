import { createStore } from "./store.tsx";

interface AppState {
  token?: string;
  alerts: Record<string, string>;
}

const initialState: AppState = {
  alerts: {},
};

const appStore = createStore(initialState);

export { appStore };
