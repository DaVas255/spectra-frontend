import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from './types'

interface UserState {
	user: User | null
}

const initialState: UserState = {
	user: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload
		},
		clearUser: state => {
			state.user = null
		}
	}
})

export const { setUser, clearUser } = userSlice.actions
export const userReducer = userSlice.reducer
