import { FC } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'

interface TransactionFormProps {
    type: 'post' | 'patch'
    id?: number
	setVisibleModal: (visible: boolean) => void
}

const TransactionForm: FC<TransactionFormProps> = ({ type, id, setVisibleModal }) => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center bg-black/50">

			<Form method={type} className="grid gap-2 w-[300px]  bg-slate-800 p-4 rounded-md" onSubmit={() => setVisibleModal(false)}>
				<h1 className="text-xl font-bold text-center">
					{type === 'post' ? 'Nueva transacción' : 'Editar transacción'}
				</h1>
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

				<div className="flex items-center gap-2">
				<button type="submit" className="btn btn-green mt-4 max-w-fit">
					Agregar transacción
					</button>
					<button type="button" className="btn btn-red mt-4 max-w-fit" onClick={() => setVisibleModal(false)}>
						Cerrar
					</button>
				</div>
			</Form>

		</div>
	)
}

export default TransactionForm
