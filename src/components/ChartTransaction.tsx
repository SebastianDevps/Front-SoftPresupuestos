import { FC } from 'react'
import { Cell, Legend, Tooltip } from 'recharts'
import { Pie } from 'recharts'
import { PieChart } from 'recharts'

const COLORS = ['#00C49F', '#FF8042']

interface IChartTransaction {
	totalIncome: number
	totalExpense: number
}

interface IChartData {
	name: string
	value: number
}

const ChartTransaction: FC<IChartTransaction> = ({
	totalIncome,
	totalExpense,
}) => {
	const data = new Array<IChartData>(
		{ name: 'Ingreso', value: totalIncome },
		{ name: 'Gasto', value: totalExpense },
	)

	return (
		<PieChart width={240} height={200}>
			<Pie
				data={data}
				cx={'50%'}
				cy={'50%'}
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				paddingAngle={2}
				dataKey="value"
			>
				{data.map((_, index) => (
					<Cell
						key={`cell-${index}`}
						fill={COLORS[index % COLORS.length]}
					/>
				))}
			</Pie>
			<Legend />
			<Tooltip />
		</PieChart>
	)
}

export default ChartTransaction
