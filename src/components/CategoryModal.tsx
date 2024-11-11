import { FC, useEffect } from 'react'
import { Form } from 'react-router-dom'

interface CategoryModalProps {
	type: 'post' | 'patch'
	id?: number
	setVisibleModal: (visible: boolean) => void
    
}

const CategoryModal: FC<CategoryModalProps> = ({
	type,
	id,
	setVisibleModal,
}) => {
	
	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 flex h-full items-center justify-center bg-black/50">
			<Form
				action="/categories"
				method={type}
				onSubmit={() => setVisibleModal(false)} 
				className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
			>
				<label htmlFor="title" className="flex flex-col gap-1">
					<small>Título de la categoría</small>
					<input
						type="text"
						className="input w-full"
						autoFocus
						name="title"
						placeholder="Titulo..."
					/>
					<input type="hidden" name="id" value={id} />
				</label>

				<div className="flex items-center gap-2">
					<button className="btn btn-green" type="submit">
						{type === 'patch' ? 'Actualizar' : 'Agregar'}
					</button>
					<button
						onClick={() => setVisibleModal(false)}
						className="btn btn-red"
					>
						Cerrar
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
