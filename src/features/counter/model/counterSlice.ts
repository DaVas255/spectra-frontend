import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/core/store/store'

export type CounterState = {
	value: number
}

const initialState: CounterState = {
	value: 0
}

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment(state) {
			state.value += 1
		},
		decrement(state) {
			state.value -= 1
		},
		add(state, action: PayloadAction<number>) {
			state.value += action.payload
		}
	}
})

export const { increment, decrement, add } = counterSlice.actions
export const counterReducer = counterSlice.reducer

export const selectCounterValue = (state: RootState) => state.counter.value
