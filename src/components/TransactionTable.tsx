import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatToCol } from '../helpers/currency.helper'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface ITransactionTable {
	limit: number
}

const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader

	// pagination
	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(
			`/transactions/pagination?page=${page}&limit=${limit}`,
		)
		setData(response.data)
		setTotalPages(Math.ceil(transactions.length / limit))
	}

	const handleChangePage = (selectedPage: { selected: number }) => {
		setCurrentPage(selectedPage.selected + 1)
	}

	useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, transactions])

	return (
		<>
			<div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold"> N° </td>
							<td className="font-bold">
								Título de la transacción
							</td>
							<td className="font-bold">Cantidad ($)</td>
							<td className="font-bold">Categoria</td>
							<td className="font-bold">
								Fecha y hora de creación
							</td>
							<td className="font-bold">Accion</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((transaction, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{transaction.title}</td>
								<td
									className={
										transaction.type === 'income'
											? 'text-green-500'
											: 'text-red-500'
									}
								>
									{transaction.type === 'income'
										? '+ '
										: '- '}
									{formatToCol.format(transaction.amount)}
								</td>
								<td
									className={
										transaction.category?.title
											? 'text-white'
											: 'text-white/50'
									}
								>
									{transaction.category?.title ||
										'Sin categoria'}
								</td>
								<td>{formatDate(transaction.createdAt)}</td>
								<td>
									<Form
										method="delete"
										action="/transactions"
									>
										<input
											type="hidden"
											name="id"
											value={transaction.id}
										/>
										<button className="btn hover:btn-red hover:text-red-400">
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			
            
            <ReactPaginate
				className="mt-4 flex items-center justify-end gap-3"
				activeClassName="bg-blue-600 rounded-sm p-1"
				pageLinkClassName="text-white p-1 px-2 rounded-sm text-xs"
				previousClassName="text-white p-1 px-2 bg-slate-800 rounded-sm text-xs"
				nextClassName="text-white p-1 px-2 bg-slate-800 rounded-sm text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="text-slate-600 cursor-not-allowed"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handleChangePage}
				previousLabel="Anterior"
				nextLabel="Siguiente"
			/>

		</>
	)
}

export default TransactionTable
