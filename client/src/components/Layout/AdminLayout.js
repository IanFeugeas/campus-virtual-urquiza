import AdminSidebar from '../Admin/Sidebar';
import { useAuth } from '../../context/Auth/AuthContext';

const AdminLayout = ({ children }) => {
    const { logout } = useAuth();

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white shadow-md">
                    <h1 className="text-xl font-semibold text-gray-800">Campus Virtual - IES Urquiza</h1>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Cerrar Sesión (Admin)
                    </button>
                </header>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;