import { FC, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaKey, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const Header: FC = () => {
	const { isAuth, user } = useSelector((state: RootState) => state.users)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const name = user?.name
	const ref = useRef(null)

	useClickAway(ref, () => {
		setIsOpen(false)
	})

	const logoutHandler = () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('Sesión cerrada')
		navigate('/auth')
	}

	return (
		<header className="flex items-center bg-slate-800/95 px-6 py-4 shadow-lg backdrop-blur-sm sticky top-0 z-50">
			<Link to="/">
				<div className="flex items-center gap-2 hover:opacity-75 transition-opacity">
					<FaBtc size={28} className="text-yellow-500" />
					<h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
						FinanzApp
					</h1>
				</div>
			</Link>

			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-8">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									`transition-colors duration-200 hover:text-white ${
										isActive
											? 'text-white font-medium'
											: 'text-white/60'
									}`
								}
							>
								Inicio
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/users"
								className={({ isActive }) =>
									`transition-colors duration-200 hover:text-white ${
										isActive
											? 'text-white font-medium'
											: 'text-white/60'
									}`
								}
							>
								Usuarios
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/transactions"
								className={({ isActive }) =>
									`transition-colors duration-200 hover:text-white ${
										isActive
											? 'text-white font-medium'
											: 'text-white/60'
									}`
								}
							>
								Transacciones
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/categories"
								className={({ isActive }) =>
									`transition-colors duration-200 hover:text-white ${
										isActive
											? 'text-white font-medium'
											: 'text-white/60'
									}`
								}
							>
								Categorías
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/history"
								className={({ isActive }) =>
									`transition-colors duration-200 hover:text-white ${
										isActive
											? 'text-white font-medium'
											: 'text-white/60'
									}`
								}
							>
								Historial
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<div className="flex items-center pr-4 text-white/90 hover:text-white cursor-pointer transition-colors">
					<div
						onClick={() => setIsOpen(!isOpen)}
						className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                            flex items-center justify-center text-white font-semibold shadow-lg
                            border-2 border-white/10 hover:border-white/20 transition-all duration-200
                            hover:shadow-indigo-500/20"
					>
						{name?.charAt(0)}
					</div>
				</div>
			) : (
				<Link
					to={'auth'}
					className="px-5 py-2.5 bg-white/10 rounded-lg text-white font-medium
                        hover:bg-white/20 transition-all duration-200 ml-auto
                        active:transform active:translate-y-0.5"
				>
					Iniciar sesión
				</Link>
			)}

			{isOpen && (
				<div className="absolute top-14 right-[40px] w-[250px] bg-slate-800/95 rounded-lg shadow-lg border border-slate-700/50">
					<div className="p-3 border-b flex flex-col gap-2 border-slate-700/50">
						<h3 className="text-sm font-medium text-left text-gray-400">
							Cuenta de Usuario
						</h3>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-3">
								<div
									onClick={() => setIsOpen(!isOpen)}
									className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                            flex items-center justify-center text-white font-semibold shadow-lg
                            border-2 border-white/10 hover:border-white/20 transition-all duration-200
                            hover:shadow-indigo-500/20"
								>
									{name?.charAt(0)}
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-medium text-gray-300">
										Bienvenido,{' '}
									</span>
									<span className="font-semibold">
										{name
											? name.charAt(0).toUpperCase() +
												name.slice(1)
											: ''}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div ref={ref} className="py-2">
						<button className="w-full flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-slate-700/50 transition-colors">
							<FaUser size={14} />
							<span>Ver Perfil</span>
						</button>

						<button className="w-full flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-slate-700/50 transition-colors">
							<FaKey size={14} />
							<span>Cambiar Contraseña</span>
						</button>

						<button className="w-full flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-slate-700/50 transition-colors">
							<FaCog size={14} />
							<span>Ajustes</span>
						</button>
						<div className="px-4 py-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="relative">
										<div
											className={`w-2.5 h-2.5 rounded-full ${
												user?.isActive === true
													? 'bg-green-500'
													: 'bg-gray-400'
											}`}
										>
											<div
												className={`absolute w-full h-full rounded-full animate-ping ${
													user?.isActive === true
														? 'bg-green-500/40'
														: 'bg-gray-400/40'
												}`}
											/>
										</div>
									</div>
									<span className="text-sm font-medium text-gray-400">
										Estado
									</span>
								</div>
								<span
									className={`text-sm font-medium ${
										user?.isActive === true
											? 'text-green-400'
											: 'text-gray-400'
									}`}
								>
									{user?.isActive === true ? 'Activo' : 'Inactivo'}
								</span>
							</div>

						</div>
						<div className="my-2 border-t border-slate-700/50"></div>

						<button
							onClick={() => {
								logoutHandler()
								setIsOpen(false)
							}}
							className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
						>
							<FaSignOutAlt size={14} />
							<span>Cerrar Sesión</span>
						</button>
					</div>
				</div>
			)}
		</header>
	)
}

export default Header
