import { FC, useState } from 'react'
import { FaTrashRestoreAlt, FaSearch, FaFilter, FaUserAlt, FaTag, FaMoneyBillWave } from 'react-icons/fa'

interface IDeletedItem {
    id: number
    type: 'user' | 'category' | 'transaction'
    name: string
    deletedAt: string
    deletedBy: string
    details: string
    amount?: number
}

const mockDeletedItems: IDeletedItem[] = [
    {
        id: 1,
        type: 'user',
        name: 'Carlos Rodríguez',
        deletedAt: '2024-03-20 15:30',
        deletedBy: 'Admin',
        details: 'carlos@ejemplo.com'
    },
    {
        id: 2,
        type: 'category',
        name: 'Entretenimiento',
        deletedAt: '2024-03-19 12:45',
        deletedBy: 'Juan Pérez',
        details: '15 transacciones afectadas'
    },
    {
        id: 3,
        type: 'transaction',
        name: 'Pago Netflix',
        deletedAt: '2024-03-18 09:15',
        deletedBy: 'María García',
        details: 'Categoría: Entretenimiento',
        amount: -45000
    }
]

const Historial: FC = () => {
    const [filter, setFilter] = useState<'all' | 'user' | 'category' | 'transaction'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="h-screen overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-custom p-4">
                {/* Header */}
                <div className="bg-slate-800 p-4 rounded-md">
                    <h1 className="text-xl font-bold">Historial de Eliminaciones</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Registro de elementos eliminados en los últimos 30 días
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-800 p-4 rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-500/20 rounded-lg">
                                <FaUserAlt className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Usuarios Eliminados</h3>
                                <p className="text-2xl font-bold mt-1">12</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-yellow-500/20 rounded-lg">
                                <FaTag className="text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Categorías Eliminadas</h3>
                                <p className="text-2xl font-bold mt-1">8</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-md">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <FaMoneyBillWave className="text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Transacciones Eliminadas</h3>
                                <p className="text-2xl font-bold mt-1">45</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800 p-4 rounded-md mt-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar en el historial..."
                                className="w-full bg-slate-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    filter === 'all' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                            >
                                Todos
                            </button>
                            <button
                                onClick={() => setFilter('user')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    filter === 'user' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                            >
                                Usuarios
                            </button>
                            <button
                                onClick={() => setFilter('category')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    filter === 'category' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                            >
                                Categorías
                            </button>
                            <button
                                onClick={() => setFilter('transaction')}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    filter === 'transaction' ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                            >
                                Transacciones
                            </button>
                        </div>
                    </div>
                </div>

                {/* Deleted Items List */}
                <div className="mt-4 space-y-3">
                    {mockDeletedItems.map((item) => (
                        <div key={item.id} className="bg-slate-800 p-4 rounded-md hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        item.type === 'user' ? 'bg-red-500/20' :
                                        item.type === 'category' ? 'bg-yellow-500/20' :
                                        'bg-purple-500/20'
                                    }`}>
                                        {item.type === 'user' && <FaUserAlt className="text-red-400" />}
                                        {item.type === 'category' && <FaTag className="text-yellow-400" />}
                                        {item.type === 'transaction' && <FaMoneyBillWave className="text-purple-400" />}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-400">{item.details}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {item.amount && (
                                        <span className="text-red-400">
                                            {new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP'
                                            }).format(item.amount)}
                                        </span>
                                    )}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Eliminado por: {item.deletedBy}</p>
                                        <p className="text-sm text-gray-400">{item.deletedAt}</p>
                                    </div>
                                    <button 
                                        className="p-2 hover:bg-blue-500/20 rounded-lg group transition-colors"
                                        title="Restaurar"
                                    >
                                        <FaTrashRestoreAlt className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-4 bg-slate-800 p-4 rounded-md flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                        Mostrando 1-10 de 65 elementos eliminados
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                            Anterior
                        </button>
                        <button className="px-3 py-1 rounded bg-blue-600">1</button>
                        <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                            3
                        </button>
                        <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Historial