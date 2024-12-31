import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers2,
  Layers3,
  List,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import { MdDashboard, MdPayment, MdPayments, MdUpdate } from "react-icons/md";
import { useState } from "react";

const AdminMenu = () => {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div>
      <DashboardSidebarMenu
        icon={MdDashboard}
        label="Dashboard"
        href="/dashboard/dashboard-overview"
      />
      {/* project */}
      <button
        onClick={() => setShowProjects((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Users className="h-4 w-4" />
          </span>
          <span>Manage Users</span>
        </span>
        {showProjects ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {/* project list */}
      {showProjects && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={Users}
            label="Manage Buyers"
            href="/dashboard/manage-buyers"
          />
          <DashboardSidebarMenu
            icon={Users}
            label="Manage Agents"
            href="/dashboard/manage-agents"
          />
        </div>
      )}
      <DashboardSidebarMenu
        icon={Layers2}
        label="Manage Agency"
        href="/dashboard/manage-agencies"
      />
      <DashboardSidebarMenu
        icon={List}
        label="Manage Lists"
        href="/dashboard/manage-lists"
      />
      <DashboardSidebarMenu
        icon={MdUpdate}
        label="Plan"
        href="/dashboard/plan"
      />
      <DashboardSidebarMenu
        icon={MdPayment}
        label="Payment"
        href="/dashboard/manage-orders"
      />
    </div>
  );
};

export default AdminMenu;
