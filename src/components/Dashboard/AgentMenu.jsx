import {
  BookOpenCheck,
  Layers2,
  List,
  ListPlus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import { MdPayment } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const AgentMenu = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <DashboardSidebarMenu
        icon={User}
        label="Portfolio"
        href="/dashboard/portfolio"
      />
      {user.myAgency[0] && (
        <DashboardSidebarMenu
          icon={ListPlus}
          label="Add List"
          href="/dashboard/create-list"
        />
      )}
      <DashboardSidebarMenu
        icon={List}
        label="My Lists"
        href="/dashboard/my-lists"
      />
      <DashboardSidebarMenu
        icon={BookOpenCheck}
        label="Enquiries"
        href="/dashboard/enquiries"
      />
      <DashboardSidebarMenu
        icon={Layers2}
        label="Agency"
        href="/dashboard/agency"
      />
    </div>
  );
};

export default AgentMenu;
