import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../types/types'
// Definir un tipo para el estado de corte
interface UserState {
	isAuth: boolean;
	token: string | null;
	user: {
	  id?: number;
	  email?: string;
	  name?: string;
	  isActive?: boolean;
	  // ... otros campos del usuario
	} | null;
  }
  
  const initialState: UserState = {
	isAuth: false,
	token: null,
	user: null
  }
  
  const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
	  login: (state, action) => {
		state.isAuth = true;
		state.token = action.payload.token;
		state.user = action.payload.user;
	  },
	  logout: (state) => {
		state.isAuth = false;
		state.token = null;
		state.user = null;
	  },
	  updateUserProfile: (state, action) => {
		state.user = { ...state.user, ...action.payload };
	  }
	}
  });

export const { login, logout, updateUserProfile } = userSlice.actions

// Otro código, como los selectores, puede usar el tipo 'Rootstate` importado
export const selectCount = (state: RootState) => state.users

export default userSlice.reducer
