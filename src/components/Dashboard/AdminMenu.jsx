import {
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowBigUpDash,
  ArrowLeftRight,
  BadgeDollarSign,
  Blinds,
  BookCheck,
  BrainCircuit,
  BrickWall,
  ChartBar,
  ChartNoAxesCombined,
  ChartNoAxesGantt,
  ChevronDown,
  ChevronUp,
  CircleDashed,
  Container,
  Cross,
  Crown,
  DatabaseBackup,
  Dessert,
  Dna,
  Headset,
  House,
  Layers2,
  Layers3,
  LayoutTemplate,
  List,
  LockKeyhole,
  Logs,
  Megaphone,
  MessageCircle,
  Monitor,
  RotateCcw,
  ScanEye,
  Search,
  ServerOff,
  Settings,
  Shell,
  ShieldAlert,
  ShieldCheck,
  SquareDashedKanban,
  StarHalf,
  Store,
  Tickets,
  User,
  Users,
} from "lucide-react";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import {
  MdAddModerator,
  MdDashboard,
  MdPayment,
  MdPayments,
  MdPermIdentity,
  MdUpdate,
} from "react-icons/md";
import { useState } from "react";
import { setOptions } from "leaflet";

const AdminMenu = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showRolesAndPermission, setShowRolesAndPermission] = useState(false);
  const [showListingManagement, setShowListingManagement] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div>
      {/* <DashboardSidebarMenu
        icon={MdDashboard}
        label="Dashboard"
        href="/dashboard/dashboard-overview"
      /> */}
      {/* project */}
      <button
        onClick={() => setShowProjects((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Users className="h-4 w-4" />
          </span>
          <span>User Management</span>
        </span>
        {showProjects ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {/* project list */}
      {showProjects && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={Store}
            label="Agents List"
            href="/dashboard/manage-agents"
          />
          <DashboardSidebarMenu
            icon={Dessert}
            label="Buyers List"
            href="/dashboard/manage-buyers"
          />
          {/* <DashboardSidebarMenu
            icon={Crown}
            label="Owners List"
            href="/dashboard/manage-buyers"
          /> */}
          <DashboardSidebarMenu
            icon={BrickWall}
            label="Developers List"
            href="/dashboard/manage-developers"
          />
          <DashboardSidebarMenu
            icon={MdAddModerator}
            label="Moderators List"
            href="/dashboard/manage-moderators"
          />
          <DashboardSidebarMenu
            icon={Layers2}
            label="Manage Agency"
            href="/dashboard/manage-agencies"
          />
        </div>
      )}

      {/* project */}
      {/* <button
        onClick={() => setShowRolesAndPermission((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Shell className="h-4 w-4" />
          </span>
          <span>Roles and permissions</span>
        </span>
        {showRolesAndPermission ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button> */}
      {/* project list */}
      {/* {showRolesAndPermission && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={Cross}
            label="Create new roles"
            href="/dashboard/create-roles"
          />
          <DashboardSidebarMenu
            icon={ChartNoAxesGantt}
            label="Permissions based on roles"
            href="/dashboard/roles-permission"
          />
        </div>
      )} */}

      {/* project */}
      <button
        onClick={() => setShowListingManagement((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <House className="h-4 w-4" />
          </span>
          <span>Listing Management</span>
        </span>
        {showListingManagement ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {/* project list */}
      {showListingManagement && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={CircleDashed}
            label="Moderate listings"
            href="/dashboard/moderate-lists"
          />
          <DashboardSidebarMenu
            icon={SquareDashedKanban}
            label="Manage listings"
            href="/dashboard/manage-lists"
          />
          <DashboardSidebarMenu
            icon={Dna}
            label="Categorization"
            href="/dashboard/categorization-lists"
          />
        </div>
      )}

      {/* project */}
      {/* <button
        onClick={() => setShowPayment((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <BadgeDollarSign className="h-4 w-4" />
          </span>
          <span>Payments Management</span>
        </span>
        {showPayment ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button> */}
      {/* project list */}
      {/* {showPayment && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={ArrowLeftRight}
            label="Monitor transactions"
            href="/dashboard/manage-orders"
          />
          <DashboardSidebarMenu
            icon={MdPayment}
            label="Integrate payment systems"
            href="/dashboard/integration-payment-system"
          />
        </div>
      )} */}

      {/* project */}
      <button
        onClick={() => setShowReviews((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <ScanEye className="h-4 w-4" />
          </span>
          <span>Review and Comment</span>
        </span>
        {showReviews ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {/* project list */}
      {showReviews && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={StarHalf}
            label="Manage reviews"
            href="/dashboard/manage-reviews"
          />
          <DashboardSidebarMenu
            icon={BrainCircuit}
            label="Handle complaints"
            href="/dashboard/manage-complains"
          />
        </div>
      )}

      {/* project */}
      {/* <button
        onClick={() => setShowPlan((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <ArrowBigUpDash className="h-4 w-4" />
          </span>
          <span>Manage promotions</span>
        </span>
        {showReviews ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button> */}
      {/* project list */}
      {/* {showPlan && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={Megaphone}
            label="Manage promotion"
            href="/dashboard/plan"
          />
          <DashboardSidebarMenu
            icon={Monitor}
            label="Integrated advertising"
            href="/dashboard/advertising"
          />
        </div>
      )} */}
      {/* project */}
      <button
        onClick={() => setShowDeveloper((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Container className="h-4 w-4" />
          </span>
          <span>Developer Project</span>
        </span>
        {showDeveloper ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {/* project list */}
      {showDeveloper && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={ShieldCheck}
            label="Project verification"
            href="/dashboard/project-management"
          />
          {/* <DashboardSidebarMenu
            icon={ChartBar}
            label="Project statistics"
            href="/dashboard/plan"
          /> */}
        </div>
      )}

      {/* <DashboardSidebarMenu icon={Search} label="SEO Management" href="/dashboard/seo" /> */}
      {/* <DashboardSidebarMenu icon={Blinds} label="Blog" href="/dashboard/Blog" /> */}
      {/* project */}
      {/* <button
        onClick={() => setShowSettings((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Settings className="h-4 w-4" />
          </span>
          <span>Settings</span>
        </span>
        {showSettings ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button> */}
      {/* project list */}
      {showSettings && (
        <div className="ps-2">
          {/* <DashboardSidebarMenu
            icon={LayoutTemplate}
            label="Platform configuration"
            href="/dashboard/platform-configuration"
          /> */}
          {/* <DashboardSidebarMenu
            icon={ShieldAlert}
            label="Security"
            href="/dashboard/security"
          /> */}
          {/* <DashboardSidebarMenu
            icon={DatabaseBackup}
            label="Backup and restore"
            href="/dashboard/plan"
          /> */}
        </div>
      )}
      {/* project */}
      {/* <button
        onClick={() => setShowLogs((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Logs className="h-4 w-4" />
          </span>
          <span>Logs and Auditing</span>
        </span>
        {showLogs ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button> */}
      {/* project list */}
      {/* {showLogs && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={Activity}
            label="User activity"
            href="/dashboard/plan"
          />
          <DashboardSidebarMenu
            icon={LockKeyhole}
            label="Security logs"
            href="/dashboard/plan"
          />
        </div>
      )} */}
      {/* project */}
      {/* <button
        onClick={() => setShowSupport((prev) => !prev)}
        className="flex w-full items-center justify-between px-8 py-3 text-[#333537]"
      >
        <span className="flex gap-2 items-center">
          <span>
            <Headset className="h-4 w-4" />
          </span>
          <span>User Support</span>
        </span>
        {showSupport ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button> */}
      {/* project list */}
      {/* {showSupport && (
        <div className="ps-2">
          <DashboardSidebarMenu
            icon={Tickets}
            label="Support ticket management"
            href="/dashboard/plan"
          />
          <DashboardSidebarMenu
            icon={MessageCircle}
            label="Live chat"
            href="/dashboard/plan"
          />
        </div>
      )} */}
    </div>
  );
};

export default AdminMenu;
