import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers3,
  LockIcon,
  LogOut,
  ShieldAlert,
  X,
} from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import Logo from "../Landing/Shared/Navbar/Logo";
import BuyerMenu from "./BuyerMenu";
import AgentMenu from "./AgentMenu";
import AdminMenu from "./AdminMenu";
import SuperAdminMenu from "./SuperAdminMenu";
import DeveloperMenu from "./DeveloperMenu";

const Sidebar = () => {
  const {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    showProjects,
    setShowProjects,
    showPriority,
    setShowPriority,
    user,
    logoutUser,
  } = useContext(AuthContext);

  const role = user?.userId?.role;

  const handleLogout = () => {
    logoutUser();
  };

  const sidebarClassNames = `custom-scrollbar fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-screen z-40 bg-white overflow-y-auto ${
    isSidebarCollapsed ? "block w-64" : "hidden w-0"
  }`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between px-6 pt-3">
          <Logo />
          <button
            className="py-3"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <X className="h-5 w-5 text-black transition duration-500 hover:text-gray-500" />
          </button>
        </div>

        <div className="flex items-center gap-5 px-8 py-4">
          <div>
            <h3 className="text-md font-semibold">
              {(() => {
                switch (role) {
                  case "1":
                    return "BUYER";
                  case "2":
                    return "AGENT";
                  case "3":
                    return "ADMIN";
                  case "4":
                    return "SUPER ADMIN";
                  case "5":
                    return "DEVELOPER";
                  default:
                    return "UNKNOWN ROLE";
                }
              })()}
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500">{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Navbar links */}
        <nav className="z-10 w-full">{role === "1" && <BuyerMenu />}</nav>
        <nav className="z-10 w-full">{role === "2" && <AgentMenu />}</nav>
        <nav className="z-10 w-full">{role === "3" && <AdminMenu />}</nav>
        <nav className="z-10 w-full">{role === "4" && <SuperAdminMenu />}</nav>
        <nav className="z-10 w-full">{role === "5" && <DeveloperMenu />}</nav>
      </div>

      {/* Logout button placed at the bottom */}
      <div className="mt-auto border-t">
        <span onClick={handleLogout}>
          <DashboardSidebarMenu icon={LogOut} label="Logout" href="/login" />
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
