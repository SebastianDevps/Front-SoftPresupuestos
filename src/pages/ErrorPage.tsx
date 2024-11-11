import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PiProhibitBold } from 'react-icons/pi'

const ErrorPage: FC = () => {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-[#131E3A] font-roboto text-white gap-10">
			<div className="flex flex-row items-center gap-5">
				<span className="text-[200px] font-bold">4</span>
				<PiProhibitBold size={200} className="text-red-600" />
				<span className="text-[200px] font-bold">4</span>
			</div>
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-row items-center gap-2">
					<span className="text-2xl font-bold">ERROR: </span>
					<h1 className="text-2xl">Página no encontrada</h1>
				</div>
				<Link
					to={'/'}
					className="btn bg-red-600 text-xl hover:bg-red-700"
				>
					Volver al inicio
				</Link>
			</div>
		</div>
	)
}

export default ErrorPage
