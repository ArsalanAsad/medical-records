import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  `block rounded-lg px-4 py-3 text-sm font-medium transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-700 hover:bg-slate-100"
  }`;

const Sidebar = ({ onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="h-full bg-white border-r border-slate-200 p-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">MediVault</h1>
          <p className="text-sm text-slate-500 mt-1">Medical Records App</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-slate-600 text-xl"
          >
            ✕
          </button>
        )}
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass} onClick={handleNavigate}>
          Dashboard
        </NavLink>

        <NavLink to="/reports" className={navLinkClass} onClick={handleNavigate}>
          Reports
        </NavLink>

        <NavLink to="/upload" className={navLinkClass} onClick={handleNavigate}>
          Upload Record
        </NavLink>

        <NavLink to="/profile" className={navLinkClass} onClick={handleNavigate}>
          Profile
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 w-full rounded-lg bg-red-500 text-white py-3 text-sm font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;