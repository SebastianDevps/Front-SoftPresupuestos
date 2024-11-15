import { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModal'
import { ICategory } from '../types/types'

const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [categoryId, setCategoryId] = useState<number>(0)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [visibleModal, setVisibleModal] = useState(false)

	return (
		<div className="h-screen overflow-hidden">
			<div className="h-full overflow-y-auto scrollbar-custom p-4">
				<div className="flex items-center justify-between bg-slate-800 p-4 rounded-md">
					<h1 className="text-xl font-bold">Gestión de Categorías</h1>
					<button
						onClick={() => {
							setVisibleModal(true)
							setIsEdit(false)
						}}
						className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
					>
						<FaPlus />
						<span>Nueva Categoría</span>
					</button>
				</div>

				<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* Estadísticas de categorías */}
					<div className="bg-slate-800 p-4 rounded-md">
						<h2 className="font-semibold mb-4">Resumen</h2>
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-gray-400">Total categorías:</span>
								<span className="font-semibold">{categories.length}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-400">Más utilizada:</span>
								<span className="font-semibold">Mercado</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-400">Menos utilizada:</span>
								<span className="font-semibold">Otros</span>
							</div>
						</div>
					</div>

					{/* Lista de categorías */}
					<div className="bg-slate-800 p-4 rounded-md md:col-span-2">
						<h2 className="font-semibold mb-4">Categorías Activas</h2>
						<div className="flex flex-wrap items-center gap-3">
							{categories.map((category, index) => (
								<div
									key={index}
									className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
								>
									{category.title}
									<div className="absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex backdrop-blur-sm transition-all duration-300">
										<button
											onClick={() => {
												setCategoryId(category.id)
												setVisibleModal(true)
												setIsEdit(true)
											}}
											className="hover:text-blue-400 transition-colors"
										>
											<AiFillEdit size={18} />
										</button>

										<Form
											className="flex"
											method="delete"
											action="/categories"
										>
											<input
												type="hidden"
												name="id"
												value={category.id}
											/>
											<button 
												type="submit"
												className="hover:text-red-400 transition-colors"
											>
												<AiFillCloseCircle size={18} />
											</button>
										</Form>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Modals */}
			{visibleModal && !isEdit && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}

			{visibleModal && isEdit && (
				<CategoryModal type="patch" id={categoryId} setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default Categories
