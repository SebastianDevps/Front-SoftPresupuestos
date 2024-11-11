import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import img from '../assets/alert_2557108.png'

interface Props {
	children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth()
	return (
		<>
			{isAuth ? (
				children
			) : (
				<div className="w-[500px] h-[450px] mt-20 ml-auto mr-auto pt-20 flex flex-col items-center">
					<div className="w-full rounded-t-lg flex items-center justify-center h-[80px] bg-red-600">
						<h1 className="text-5xl font-bold">NO PUEDES ENTRAR</h1>
					</div>
					<div className="w-full rounded-b-lg h-[250px] flex flex-row items-center bg-white">
						<img className="w-50 h-[140px] pl-10 pr-10" src={img} alt="img" />
						<h1 className="w-20 text-4xl uppercase font-bold text-black text-wrap">
							Solo personal autorizado
						</h1>
					</div>
				</div>
			)}
		</>
	)
}

export default ProtectedRoute
