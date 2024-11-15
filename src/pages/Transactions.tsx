import { FC, useState } from 'react'
import TransactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import { formatToCol } from '../helpers/currency.helper'
import ChartTransaction from '../components/ChartTransaction'
import { FaPlus } from 'react-icons/fa'
import TransactionForm from '../components/TransactionForm'

const Transactions: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader

	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader

	const [visibleModal, setVisibleModal] = useState(false)
	return (
		<>
			<div className="mt-4 flex flex-row items-start gap-6">
				{/* Panel de acciones rápidas */}
				<div className="flex-1 rounded-md h-[280px] bg-slate-800 p-3">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold">Acciones Rápidas</h2>
						<button
							onClick={() => setVisibleModal(!visibleModal)}
							className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
						>
							<FaPlus /> Nueva Transacción
						</button>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-10 gap-4">
						{/* Tarjetas de acciones rápidas */}
						<div className="bg-slate-700 p-4 rounded-md hover:bg-slate-600 cursor-pointer transition-colors">
							<h3 className="font-semibold mb-2">
								Últimos 7 días
							</h3>
							<div className="flex flex-col gap-2">
								<p className="text-sm text-gray-300">
									Gastos: -$450.000
								</p>
								<p className="text-sm text-green-400">
									Ingresos: +$1.200.000
								</p>
								<div className="h-1 w-full bg-gray-600 rounded-full">
									<div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
								</div>
							</div>
						</div>
						<div className="bg-slate-700 p-4 rounded-md hover:bg-slate-600 cursor-pointer transition-colors">
							<h3 className="font-semibold mb-2">Este mes</h3>
							<p className="text-sm text-gray-300">
								Mayor gasto: Mercado
							</p>
							<p className="text-xs text-gray-400 mt-1">
								Ahorro: 35% del ingreso
							</p>
							<div className="mt-2 text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full inline-block">
								+12% vs mes anterior
							</div>
						</div>
						<div className="bg-slate-700 p-4 rounded-md hover:bg-slate-600 cursor-pointer transition-colors">
							<h3 className="font-semibold mb-2">Exportar</h3>
							<p className="text-sm text-gray-300">
								PDF • Excel • CSV
							</p>
							<p className="text-xs text-gray-400 mt-1">
								Último reporte: hace 5 días
							</p>
						</div>
						<div className="bg-slate-700 p-4 rounded-md  transition-colors">
							<h3 className="font-semibold mb-2">Filtros</h3>
							<div className="flex flex-wrap gap-1">
								<span className="text-xs hover:bg-blue-600/40 cursor-pointer bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
									Comida
								</span>
								<span className="text-xs hover:bg-purple-600/40 cursor-pointer bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full">
									Transporte
								</span>
								<span className="text-xs hover:bg-red-600/40 cursor-pointer bg-red-600/20 text-red-400 px-2 py-1 rounded-full">
									Domicilios
								</span>
								<span className="text-xs hover:bg-green-600/40 cursor-pointer bg-green-600/20 text-green-400 px-2 py-1 rounded-full">
									Salud
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Statistics blocks */}
				<div className="rounded-md bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="text-md text-center font-bold uppercase">
								Ingreso total:
							</p>
							<p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
								{formatToCol.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className="text-md text-center font-bold uppercase">
								Gasto total:
							</p>
							<p className="mt-2 rounded-sm bg-red-600 p-1 text-center">
								{formatToCol.format(totalExpense)}
							</p>
						</div>
					</div>

					<ChartTransaction
						totalIncome={totalIncome}
						totalExpense={totalExpense}
					/>
				</div>
			</div>

			{/* Transactions table */}
			<div className="w-full mt-6">
				<TransactionTable limit={5} />
			</div>

			{/* Add category*/}
			{visibleModal && (
				<TransactionForm
					type="post"
					setVisibleModal={setVisibleModal}
				/>
			)}
		</>
	)
}

export default Transactions
