import {
  BookOpenCheck,
  Briefcase,
  Heart,
  Home,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";

const BuyerMenu = () => {
  return (
    <div>
      <DashboardSidebarMenu
        icon={User}
        label="Profile"
        href="/dashboard/profile"
      />
      <DashboardSidebarMenu
        icon={BookOpenCheck}
        label="Enquiries"
        href="/dashboard/enquiries"
      />
      <DashboardSidebarMenu
        icon={Heart}
        label="Favorites"
        href="/dashboard/favorite-properties"
      />
      {/* <DashboardSidebarMenu
        icon={Search}
        label="Searches & Alerts"
        href="/dashboard/searches-alerts"
      />
      <DashboardSidebarMenu icon={Settings} label="Settings" href="/settings" /> */}
    </div>
  );
};

export default BuyerMenu;
