import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-slate-700"
        >
          ☰
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-800">MediVault</h2>
          <p className="text-sm text-slate-500 hidden sm:block">
            Manage your medical records securely
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-slate-700">{user?.name || "User"}</p>
        <p className="text-xs text-slate-500">{user?.email || "No email"}</p>
      </div>
    </header>
  );
};

export default Navbar;