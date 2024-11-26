import { createStore } from './store.tsx'
import { User, Vehicle } from '../types/types.ts'

interface AppState {
  token?: string
  alerts: Record<string, string>
  user?: User
  vehicle?: Vehicle
}

const initialState: AppState = {
  alerts: {},
  user: undefined,
  vehicle: undefined,
}

const appStore = createStore(initialState)

export { appStore }
