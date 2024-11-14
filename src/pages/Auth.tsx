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
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setIsLoading(true)
			await AuthService.login({ email, password }, dispatch)
			toast.success('Bienvenido!')
			navigate('/')
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
		<div className="container mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center  bg-slate-900 text-white font-roboto">
			<div className="max-w-[400px] mx-auto p-6  border border-white/20 flex flex-col items-center justify-center rounded-md">
				<h1 className="text-3xl font-bold">Bienvenido</h1>
				<h1 className="mb-10 text-center text-[14px] pt-2 text-white/50">
					Inicia sesión o registrate para continuar
				</h1>

				<div className="bg-slate-800 flex flex-row w-[310px] p-1 -mt-6 mb-4 rounded-md">
					<div
						onClick={() => setIsLogin(!isLogin)}
						className={`w-full ${
							isLogin ? 'bg-slate-900' : 'bg-slate-800'
						} cursor-pointer p-2 text-center rounded-sm`}
					>
						<h1>Acceso</h1>
					</div>
					<div
						onClick={() => setIsLogin(!isLogin)}
						className={`w-full ${
							isLogin ? 'bg-slate-800' : 'bg-slate-900'
						} cursor-pointer p-2 text-center rounded-sm`}
					>
						<h1>Registro</h1>
					</div>
				</div>
				{isLogin ? (
					<form
						onSubmit={loginHandler}
						className="flex flex-col gap-4"
						action=""
					>
						<input
							type="email"
							placeholder="Email"
							className="input"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="relative w-full">
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
								onClick={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
							>
								{isPasswordVisible ? (
									<FaRegEye />
								) : (
									<FaRegEyeSlash />
								)}
							</button>
						</div>
						<button className="btn btn-green flex justify-center">
							{isLoading ? (
								<FaSpinner className="animate-spin" />
							) : (
								'Iniciar sesión'
							)}
						</button>
					</form>
				) : (
					<form
						onSubmit={registrationHandler}
						className="flex flex-col gap-4"
						action=""
					>
						<input
							type="text"
							placeholder="Nombre"
							className="input"
						/>
						<input
							type="text"
							placeholder="Apellido"
							className="input"
						/>
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
								onClick={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
							>
								{isPasswordVisible ? (
									<FaRegEye />
								) : (
									<FaRegEyeSlash />
								)}
							</button>
						</div>
						<button className="btn btn-green justify-center">
							{isLoading ? (
								<FaSpinner className="animate-spin" />
							) : (
								'Registrarse'
							)}
						</button>
					</form>
				)}

				<div className="flex flex-col space-y-2 text-center items-center justify-center mt-5">
					<p className="text-xs text-white/50">
						FinanzApp 2024. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Auth
