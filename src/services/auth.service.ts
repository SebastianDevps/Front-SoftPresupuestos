import { instance } from '../api/axios.api'
import {
	IUserData,
	IResponseUserData,
	IUser,
	IAuthResponse,
} from '../types/types'
import { login as loginAction } from '../store/user/userSlice'
import { AppDispatch } from '../store/store'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'

export const AuthService = {
	async registration(
		userData: IUserData,
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<IResponseUserData>(
			'user',
			userData,
		)
		return data
	},
	async login(userData: IUserData, dispatch: AppDispatch): Promise<void> {
        try {
            const { data } = await instance.post<IAuthResponse>('auth/login', userData)

            if (!data || !data.token) {
                throw new Error('No recibió el token')
            }

			setTokenToLocalStorage('token', data.token)	

            const profileResponse = await instance.get<IUser>('auth/profile')

            if (typeof dispatch !== 'function') {
				throw new Error('Función de despacho no válida proporcionada')
			}

            dispatch(loginAction({
                user: profileResponse.data,
                token: data.token
            }))
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    },
	async getProfile(): Promise<IUser | undefined> {
		try {
			const { data } = await instance.get<IUser>('auth/profile')
			return data
		} catch (error) {
			console.error('Get profile error:', error)
			return undefined
		}
	},
}
