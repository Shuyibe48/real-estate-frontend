import {
  BookOpenCheck,
  Briefcase,
  Heart,
  Home,
  Kanban,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const DeveloperMenu = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <DashboardSidebarMenu
        icon={User}
        label="Profile"
        href={`/dashboard/developer-profile/${user?._id}`}
      />
      <DashboardSidebarMenu
        icon={Plus}
        label="Create Project"
        href="/dashboard/create-project"
      />
      <DashboardSidebarMenu
        icon={Kanban}
        label="Projects"
        href={`/dashboard/projects/${user?._id}`}
      />
      {/* <DashboardSidebarMenu
        icon={BookOpenCheck}
        label="Enquiries"
        href="/dashboard/enquiries"
      /> */}
      {/* <DashboardSidebarMenu
          icon={Search}
          label="Searches & Alerts"
          href="/dashboard/searches-alerts"
        />
        <DashboardSidebarMenu icon={Settings} label="Settings" href="/settings" /> */}
    </div>
  );
};

export default DeveloperMenu;
