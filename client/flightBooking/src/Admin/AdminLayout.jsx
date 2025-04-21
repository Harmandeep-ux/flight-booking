// AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white shadow-xl">
        <h1 className="text-3xl font-bold p-6 border-b border-gray-700">Admin Panel</h1>
        <nav className="flex flex-col p-4 gap-4">
          <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/admin/users" className="hover:text-blue-400">Users</Link>
          <Link to="/admin/flights" className="hover:text-blue-400">Flights</Link>
          <Link to="/admin/bookings" className="hover:text-blue-400">Bookings</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;