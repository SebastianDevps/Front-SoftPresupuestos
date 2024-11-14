import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 text-white font-roboto">
			<Header />
			<div className="w-full">
				<Outlet />
			</div>
			{/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 FinanzApp. Todos los derechos reservados.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<a
						className="text-xs hover:underline underline-offset-4"
						href="#"
					>
						Términos de servicio
					</a>
					<a
						className="text-xs hover:underline underline-offset-4"
						href="#"
					>
						Privacidad
					</a>
				</nav>
			</footer> */}
		</div>
	)
}

export default Layout
