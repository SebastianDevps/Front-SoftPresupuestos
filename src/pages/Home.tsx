import { FC } from 'react'
import { 
    FaWallet, 
    FaChartLine, 
    FaArrowUp, 
    FaArrowDown, 
    FaBell,
    FaCalendarAlt
} from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const mockChartData = [
    { date: '1 Mar', balance: 2500000 },
    { date: '5 Mar', balance: 2800000 },
    { date: '10 Mar', balance: 2600000 },
    { date: '15 Mar', balance: 3100000 },
    { date: '20 Mar', balance: 3400000 }
]

const mockTransactions = [
    {
        id: 1,
        type: 'expense',
        description: 'Mercado Éxito',
        amount: -250000,
        category: 'Mercado',
        date: '20 Mar, 2024'
    },
    {
        id: 2,
        type: 'income',
        description: 'Salario',
        amount: 3500000,
        category: 'Ingresos',
        date: '15 Mar, 2024'
    }
]

const mockNotifications = [
    {
        id: 1,
        message: 'Pago programado para mañana: Netflix',
        type: 'warning',
        time: 'Hace 2 horas'
    },
    {
        id: 2,
        message: 'Has alcanzado tu meta de ahorro mensual',
        type: 'success',
        time: 'Hace 5 horas'
    }
]

const Home: FC = () => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-custom p-4">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">¡Buen día, Usuario!</h1>
                            <p className="text-blue-100 mt-1">
                                Aquí está el resumen de tus finanzas
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors relative">
                                <FaBell />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </button>
                            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <FaCalendarAlt />
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/10 rounded-lg">
                                    <FaWallet />
                                </div>
                                <div>
                                    <p className="text-blue-100">Balance Total</p>
                                    <p className="text-2xl font-bold">$3.400.000</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-500/20 rounded-lg">
                                    <FaArrowUp className="text-green-400" />
                                </div>
                                <div>
                                    <p className="text-blue-100">Ingresos (Mar)</p>
                                    <p className="text-2xl font-bold">$4.500.000</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-red-500/20 rounded-lg">
                                    <FaArrowDown className="text-red-400" />
                                </div>
                                <div>
                                    <p className="text-blue-100">Gastos (Mar)</p>
                                    <p className="text-2xl font-bold">$1.100.000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {/* Chart Section */}
                    <div className="lg:col-span-2 bg-slate-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Balance General</h2>
                            <select className="bg-slate-700 rounded-md px-3 py-1">
                                <option>Últimos 7 días</option>
                                <option>Último mes</option>
                                <option>Último año</option>
                            </select>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockChartData}>
                                    <XAxis dataKey="date" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: '#1e293b',
                                            border: 'none',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="balance" 
                                        stroke="#3b82f6" 
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-slate-800 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Notificaciones</h2>
                        <div className="space-y-3">
                            {mockNotifications.map(notification => (
                                <div 
                                    key={notification.id}
                                    className="p-3 bg-slate-700 rounded-lg"
                                >
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {notification.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="mt-4 bg-slate-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Transacciones Recientes</h2>
                        <button className="text-blue-400 hover:text-blue-500 text-sm">
                            Ver todas
                        </button>
                    </div>
                    <div className="space-y-3">
                        {mockTransactions.map(transaction => (
                            <div 
                                key={transaction.id}
                                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        transaction.type === 'expense' 
                                            ? 'bg-red-500/20' 
                                            : 'bg-green-500/20'
                                    }`}>
                                        {transaction.type === 'expense' 
                                            ? <FaArrowDown className="text-red-400" />
                                            : <FaArrowUp className="text-green-400" />
                                        }
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {transaction.description}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {transaction.category}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-medium ${
                                        transaction.type === 'expense'
                                            ? 'text-red-400'
                                            : 'text-green-400'
                                    }`}>
                                        {transaction.type === 'expense' ? '-' : '+'}
                                        {new Intl.NumberFormat('es-CO', {
                                            style: 'currency',
                                            currency: 'COP'
                                        }).format(Math.abs(transaction.amount))}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {transaction.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Goals */}
                <div className="mt-4 bg-slate-800 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Metas Financieras</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-700 p-4 rounded-lg">
                            <h3 className="font-medium">Fondo de Emergencia</h3>
                            <div className="mt-2">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Progreso</span>
                                    <span>75%</span>
                                </div>
                                <div className="h-2 bg-slate-600 rounded-full">
                                    <div 
                                        className="h-full w-3/4 bg-green-500 rounded-full"
                                        style={{ width: '75%' }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                $7.500.000 de $10.000.000
                            </p>
                        </div>
                        <div className="bg-slate-700 p-4 rounded-lg">
                            <h3 className="font-medium">Vacaciones</h3>
                            <div className="mt-2">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Progreso</span>
                                    <span>45%</span>
                                </div>
                                <div className="h-2 bg-slate-600 rounded-full">
                                    <div 
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: '45%' }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                $2.250.000 de $5.000.000
                            </p>
                        </div>
                        <div className="bg-slate-700 p-4 rounded-lg">
                            <h3 className="font-medium">Nuevo Carro</h3>
                            <div className="mt-2">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Progreso</span>
                                    <span>20%</span>
                                </div>
                                <div className="h-2 bg-slate-600 rounded-full">
                                    <div 
                                        className="h-full bg-purple-500 rounded-full"
                                        style={{ width: '20%' }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                $10.000.000 de $50.000.000
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home