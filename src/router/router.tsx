import { createBrowserRouter, redirect } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transactions from '../pages/Transactions'
import Categories from '../pages/Categories'
import { categoriesActions, categoriesLoader } from '../helpers/category.helper'
import Auth from '../pages/Auth'
import ProtectedRoute from '../components/ProtectedRoute'
import { transactionAction, transactionLoader } from '../helpers/transaction.helper'
import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'
import Users from '../pages/Users'
import Historial from '../pages/Historial'

const authLoader = async () => {
	const isAuth = getTokenFromLocalStorage()
	if (!isAuth) {
		toast.error('Debes estar autenticado para acceder')
	}
	return null
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				action: transactionAction,
				loader: async () => {
					await authLoader()
					return transactionLoader()
				},
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',	
				action: categoriesActions,
				loader: async () => {
					await authLoader()
					return categoriesLoader()
				},
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: 'users',
				element: (
					<ProtectedRoute>
						<Users />
					</ProtectedRoute>
				),
			},
			{
				path: 'history',
				element: (
					<ProtectedRoute>
						<Historial />
					</ProtectedRoute>
				),
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
])
