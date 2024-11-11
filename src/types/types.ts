export interface IUser {
	id: string
	email: string
    token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser {
	email: string
	id: string
	createdAt: string
	updatedAt: string
	password: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface ICategory {
	id: number
	title: string
	createdAt: string
	updatedAt: string	
	transactions?: []
}

export interface ITransaction {
	id: number
	title: string
	amount: number
	type: string
	category: ICategory
	createdAt: string
	updatedAt: string
}

export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
}