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
		<>
			<div className="mt-10 rounded-md bg-slate-800 p-4">
				<h1>Su lista de categorías: </h1>
				<div className="mt-2 flex flex-wrap items-center gap-2">
					{categories.map((category, index) => (
						<div
							key={index}
							className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2"
						>
							{category.title}
							{/* Category List */}
							<div className="absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
								<button
									onClick={() => {
										setCategoryId(category.id) 
										setVisibleModal(true)
										setIsEdit(true)
									}}
								>
									<AiFillEdit />
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
									<button type="submit">
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>
				{/* Add Category */}
				<button
					onClick={() => {
						setVisibleModal(true)
						setIsEdit(false)
					}}
					className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Crear una nueva categoría</span>
				</button>
			</div>

			{/* Add category modal */}
			{visibleModal && !isEdit && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}

			{/* Edit category modal */}
			{visibleModal && isEdit && (
				<CategoryModal type="patch" id={categoryId} setVisibleModal={setVisibleModal}  />
			)}
		</>
	)
}

export default Categories
