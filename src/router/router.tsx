import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Transactions from '../pages/Transactions'
import Categories from '../pages/Categories'
import { categoriesActions, categoriesLoader } from '../helpers/category.helper'
import Auth from '../pages/Auth'
import ProtectedRoute from '../components/ProtectedRoute'
import { transactionAction, transactionLoader } from '../helpers/transaction.helper'

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
				loader: transactionLoader,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',	
				action: categoriesActions,
				loader: categoriesLoader,
				element: (
					<ProtectedRoute>
						<Categories />
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
