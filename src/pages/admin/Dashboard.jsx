import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">ENTNT Admin</h1>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="overview"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="patients"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="appointments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="calendar"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-blue-700"
              }`
            }
          >
            Calendar
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
