import { FC, useState } from 'react'
import { FaUserPlus, FaSearch, FaEllipsisV, FaUserEdit, FaTrash, FaKey } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

interface IUser {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
    status: 'active' | 'inactive'
    lastLogin: string
    joinDate: string
    avatar: string
}

const mockUsers: IUser[] = [
    {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-03-20 15:30',
        joinDate: '2023-01-15',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan'
    },
    {
        id: 2,
        name: 'María García',
        email: 'maria@ejemplo.com',
        role: 'user',
        status: 'active',
        lastLogin: '2024-03-19 10:15',
        joinDate: '2023-02-20',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    // ... puedes agregar más usuarios simulados
]

const Users: FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [showUserModal, setShowUserModal] = useState(false)

    return (
        <div className="h-screen overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-custom p-4">
                {/* Header Section */}
                <div className="flex items-center justify-between bg-slate-800 p-4 rounded-md">
                    <h1 className="text-xl font-bold">Gestión de Usuarios</h1>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">
                        <FaUserPlus />
                        <span>Nuevo Usuario</span>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-slate-800 p-4 rounded-md">
                        <h3 className="text-gray-400 text-sm">Total Usuarios</h3>
                        <p className="text-2xl font-bold mt-2">256</p>
                        <div className="text-xs text-green-400 mt-2">↑ 12% vs mes anterior</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-md">
                        <h3 className="text-gray-400 text-sm">Usuarios Activos</h3>
                        <p className="text-2xl font-bold mt-2">180</p>
                        <div className="text-xs text-green-400 mt-2">70% del total</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-md">
                        <h3 className="text-gray-400 text-sm">Nuevos (Este Mes)</h3>
                        <p className="text-2xl font-bold mt-2">24</p>
                        <div className="text-xs text-blue-400 mt-2">8 más que el mes pasado</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-md">
                        <h3 className="text-gray-400 text-sm">Premium</h3>
                        <p className="text-2xl font-bold mt-2">45</p>
                        <div className="text-xs text-purple-400 mt-2">18% del total</div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-slate-800 p-4 rounded-md mt-4">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar usuarios..."
                                className="w-full bg-slate-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select className="bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Todos los roles</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                        <select className="bg-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Todos los estados</option>
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-slate-800 rounded-md mt-4 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-4 py-3 text-left">Usuario</th>
                                <th className="px-4 py-3 text-left">Rol</th>
                                <th className="px-4 py-3 text-left">Estado</th>
                                <th className="px-4 py-3 text-left">Último Acceso</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div>
                                                <div className="font-medium flex items-center gap-1">
                                                    {user.name}
                                                    {user.role === 'admin' && (
                                                        <MdVerified className="text-blue-400" />
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            user.role === 'admin' 
                                                ? 'bg-blue-500/20 text-blue-400'
                                                : 'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            user.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                        }`}>
                                            {user.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-400">
                                        {user.lastLogin}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1 hover:text-blue-400 transition-colors">
                                                <FaUserEdit />
                                            </button>
                                            <button className="p-1 hover:text-yellow-400 transition-colors">
                                                <FaKey />
                                            </button>
                                            <button className="p-1 hover:text-red-400 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="p-4 border-t border-slate-700 flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Mostrando 1-10 de 256 usuarios
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                                Anterior
                            </button>
                            <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
                                1
                            </button>
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
        </div>
    )
}

export default Users