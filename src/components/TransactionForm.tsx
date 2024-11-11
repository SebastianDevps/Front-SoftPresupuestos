import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState(false)
	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form method="post" className="grid gap-2">
				<label className="grid" htmlFor="title">
					<span>Título</span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Titulo..."
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Cantidad</span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Cantidad..."
						name="amount"
						required
					/>
				</label>

				{/* Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Categoría</span>
						<select
							name="category"
							className="input bg-slate-800 border-slate-700"
							required
						>
							<option className="text-slate-400" value="">
								Seleccione una categoría...
							</option>
							{categories.map((category, index) => (
								<option key={index} value={category.id}>
									{category.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-2 text-red-400">
						Para continuar crea una categoría primero
					</h1>
				)}

				{/* Add category */}
				<button
					onClick={() => setVisibleModal(true)}
					className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Gestionar categorías</span>
				</button>

				{/* Radio buttons */}
				<div className="flex items-center gap-4">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'income'}
							className="form-radio text-blue-600"
						/>
						<span>Ingreso</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'expense'}
							className="form-radio text-blue-600"
						/>
						<span>Gasto</span>
					</label>
				</div>

				<button type="submit" className="btn btn-green mt-4 max-w-fit">
					Agregar transacción
				</button>
			</Form>

			{/* Add category*/}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
