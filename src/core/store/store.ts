import { configureStore } from '@reduxjs/toolkit'

import { counterReducer } from '@/features/counter/model/counterSlice'

export const makeStore = () => {
	return configureStore({
		reducer: {
			counter: counterReducer
		}
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
