import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { FaSpinner, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { login } from '../store/user/userSlice'
import { useAppDispatch } from '../store/hooks'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setIsLoading(true)
			const data = await AuthService.login({ email, password })

			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('Bienvenido!')
				navigate('/')
			}
			// toast.info('Ups! Estamos en mantenimiento')
		} catch (err: any) {
			const error =
				err?.response?.data?.message ||
				'Error desconocido, por favor intente nuevamente.'
			toast.error(error.toString())
			setPassword('')
		} finally {
			setIsLoading(false)
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setIsLoading(true)
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Usuario registrado exitosamente')
				setIsLogin(!isLogin)
			}
		} catch (err: any) {
			const error =
				err?.response?.data?.message ||
				'Error desconocido, por favor intente nuevamente.'
			toast.error(error.toString())
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="mt-40 flex flex-col items-center justify-center  bg-slate-900 text-white font-roboto">
			<h1 className="mb-10 text-center text-xl">
				{isLogin ? 'Acceso' : 'Registro'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="mx-auto flex w-1/3 flex-col gap-5"
				action=""
			>
				<input
					type="email"
					placeholder="Email"
					className="input"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="relative">
					<input
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder="Password"
						className="input w-[310px]"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="button"
						className="absolute right-4 top-1/2 -translate-y-1/2"
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				</div>
				<button className="btn btn-green mx-auto">
					{isLoading ? (
						<FaSpinner className="animate-spin" />
					) : isLogin ? (
						'Acceso'
					) : (
						'Registro'
					)}
				</button>
			</form>

			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						¿No tienes una cuenta?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						¿Ya tienes una cuenta?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
