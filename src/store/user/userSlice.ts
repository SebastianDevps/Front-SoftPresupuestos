import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../types/types'
// Definir un tipo para el estado de corte
interface IUserState {
	user: IUser | null
	isAuth: boolean
}

// Defina el estado inicial usando ese tipo
const initialState: IUserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	// `CreateSlice` inferirá el tipo de estado del argumento 'InitialState'
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: (state) => {
			state.user = null
			state.isAuth = false
		},
	},
})

export const {login, logout} = userSlice.actions

// Otro código, como los selectores, puede usar el tipo 'Rootstate` importado
export const selectCount = (state: RootState) => state.users

export default userSlice.reducer
