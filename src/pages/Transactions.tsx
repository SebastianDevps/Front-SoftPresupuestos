import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import { formatToCol } from '../helpers/currency.helper'
import ChartTransaction from '../components/ChartTransaction'

const Transactions: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader
	return (
		<>
			<div className="mt-4 grid grid-cols-3 items-start gap-4">
				{/* Add transaction form */}
				<div className="col-span-2 grid">
					<TransactionForm />
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

					<ChartTransaction totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
			</div>

			{/* Transactions table */}
			<h1 className="my-5">
				<TransactionTable limit={5} />
			</h1>
		</>
	)
}

export default Transactions
