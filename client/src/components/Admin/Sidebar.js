import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminSidebar = () => {
    const router = useRouter();
    
    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: '🏠' },
        { name: 'Aprobar Usuarios', href: '/admin/aprobacion', icon: '✅' },
        { name: 'Gestión de Contenido', href: '/admin/posts', icon: '📚' },
        { name: 'Configuración', href: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-2">Admin Panel</h2>
            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <Link 
                                href={item.href} 
                                className={`flex items-center p-2 rounded-lg transition duration-150 ease-in-out ${
                                    router.pathname === item.href 
                                        ? 'bg-blue-600 font-bold' 
                                        : 'hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;