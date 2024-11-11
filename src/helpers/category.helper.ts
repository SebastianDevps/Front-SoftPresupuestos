import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

export const categoriesActions = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const title = {
				title: formData.get('title'),
			}
			if (title.title.length < 3) {
				return toast.error('El titulo debe tener al menos 3 caracteres')
			}
			try {
				await instance.post('/categories', title)
				return toast.success('Categoría creada correctamente')
			} catch (err: any) {
				const error =
					err?.response?.data?.message ||
					'Error desconocido, por favor intente nuevamente.'
				return toast.error(error.toString())
			}
		}
		case 'PATCH': {
			const formData = await request.formData()
			const id = formData.get('id')
			const title = formData.get('title')
			if (title.length < 3) {
				toast.info('El titulo debe tener al menos 3 caracteres')
				return null
			}
			try {
				await instance.patch(`/categories/category/${id}`, { title })
				return toast.success('Categoría actualizada correctamente')
			} catch (err: any) {
				const error =
					err?.response?.data?.message ||
					'Error desconocido, por favor intente nuevamente.'
				console.log(err)
				return toast.error(error.toString())
			}
		}
		case 'DELETE': {
			const formData = await request.formData()
			const categoryId = formData.get('id')
			await instance.delete(`/categories/category/${categoryId}`)
			return toast.success('Categoría eliminada correctamente')
		}
	}
}

export const categoriesLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}
