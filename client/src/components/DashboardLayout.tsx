import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Library, Settings, LogOut, Menu } from "lucide-react";

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if a link is active
  const isActive = (path: string) => location.pathname.includes(path);

  const handleLogout = () => {
    // In the future, clear tokens/auth state here
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Hidden checkbox to toggle the drawer on mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* --- MAIN CONTENT AREA (Right Side) --- */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-200">
        
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-100 shadow-sm px-4 lg:px-8">
          <div className="flex-none lg:hidden">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <Menu size={24} />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <span className="text-xl font-heading font-bold text-primary lg:hidden">TalkTaktika</span>
          </div>
          <div className="flex-none hidden lg:block">
            <span className="text-sm font-medium mr-4">Welcome, Superadmin</span>
          </div>
          <div className="flex-none">
            <button onClick={handleLogout} className="btn btn-ghost btn-circle text-error">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Page Content loads here via React Router */}
        <div className="p-4 lg:p-8 flex-1">
          <Outlet /> 
        </div>
      </div> 

      {/* --- SIDEBAR AREA (Left Side) --- */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content space-y-2">
          
          {/* Sidebar Header */}
          <div className="mb-8 px-4 mt-2">
            <h2 className="text-3xl font-heading font-black text-primary">TalkTaktika</h2>
            <span className="badge badge-accent badge-sm mt-1">Admin Panel</span>
          </div>

          {/* Navigation Links */}
          <li>
            <Link to="/dashboard" className={isActive("/dashboard") && location.pathname === "/dashboard" ? "active bg-primary text-primary-content font-medium" : ""}>
              <LayoutDashboard size={20} /> Dashboard Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/cards" className={isActive("/dashboard/cards") ? "active bg-primary text-primary-content font-medium" : ""}>
              <Library size={20} /> Word Cards DB
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className={isActive("/dashboard/settings") ? "active bg-primary text-primary-content font-medium" : ""}>
              <Settings size={20} /> Game Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}