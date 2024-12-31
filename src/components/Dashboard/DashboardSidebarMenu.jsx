import { NavLink } from "react-router-dom";

const DashboardSidebarMenu = ({ href, icon: Icon, label }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center gap-2 px-8 py-3 font-semibold transition duration-500 hover:bg-rose-50 rounded-md ${
          isActive
            ? "bg-rose-50 rounded-md"
            : ""
        }`
      }
    >
      <Icon className="h-4 w-4" />
      <span className={`font-medium`}>{label}</span>
    </NavLink>
  );
};

export default DashboardSidebarMenu;
