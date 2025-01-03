import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "../layout/LandingLayout";
import Home from "../pages/Home/Home";
import Listings from "../pages/Main/Listings/Listings";
import MainLayout from "../layout/MainLayout";
import SingleListing from "../pages/Main/Listings/SingleListing";
import Chat from "../components/Chat/Chat";
import Profile from "../pages/Dashboard/Profile/Profile";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import CreateLists from "../pages/Dashboard/CreateLists/CreateLists";
import MyLists from "../pages/Dashboard/CreateLists/MyLists";
import Portfolio from "../pages/Dashboard/Agent/Portfolio/Portfolio";
import Agency from "../pages/Dashboard/Agent/Agency/Agency";
import Team from "../pages/Dashboard/Agent/Agency/Team/Team";
import SinglePortfolio from "../pages/Dashboard/Agent/Portfolio/SinglePortfolio";
import { getAgent, getSingleAgency, getSingleAgent, getSingleList } from "../api/utils";
import AgentListings from "../pages/Main/AgentListings/AgentListings";
import AgenciesListings from "../pages/Main/AgenciesListings/AgenciesListings";
import FavoriteProperties from "../pages/Dashboard/Buyer/FavoriteProperties";
import Enquires from "../pages/Dashboard/Buyer/Enquires";
import SingleAgent from "../pages/Main/AgentListings/SingleAgent";
import SingleAgency from "../pages/Main/AgenciesListings/SingleAgency";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageLists from "../pages/Dashboard/Admin/ManageLists";
import ManageOrders from "../pages/Dashboard/Admin/ManageOrders";
import ManageAgencies from "../pages/Dashboard/Admin/ManageAgencies";
import ManageBuyers from "../pages/Dashboard/Admin/ManageBuyers";
import ManageAgents from "../pages/Dashboard/Admin/ManageAgents";
import Payment from "../pages/Dashboard/Agency/Payment";
import DashboardOverview from "../pages/Dashboard/DashboardOverview/DashboardOverview";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import GetPlan from "../pages/Dashboard/Agency/GetPlan";
import Plan from "../pages/Dashboard/Admin/Plan";
import Promotion from "../pages/Dashboard/Agency/Promotion";
import AgencyLists from "../pages/Dashboard/Agent/Agency/AgencyLists";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listings",
        element: <Listings />,
      },
      {
        path: "/agentListings",
        element: <AgentListings />,
      },
      {
        path: "/agenciesListings",
        element: <AgenciesListings />,
      },
      {
        path: "/list/:id",
        element: <SingleListing />,
        loader: ({ params }) => getSingleList(params.id),
      },
      {
        path: "/agent/:id",
        element: <SingleAgent />,
        loader: ({ params }) => getSingleAgent(params.id),
      },
      {
        path: "/agency/:id",
        element: <SingleAgency />,
        loader: ({ params }) => getSingleAgency(params.id),
      },
      {
        path: "/inbox",
        element: <Chat />,
      },
      {
        path: "/multi-step-form/:id",
        element: <AppointmentForm />,
      },
      {
        path: "/plan",
        element: <GetPlan />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/dashboard/portfolio/:id",
        element: <SinglePortfolio />,
        loader: ({ params }) => getAgent(params.id),
      },
      {
        path: "/dashboard/create-list",
        element: <CreateLists />,
      },
      {
        path: "/dashboard/my-lists",
        element: <MyLists />,
      },
      {
        path: "/dashboard/agency-lists/:id",
        element: <AgencyLists />,
      },
      {
        path: "/dashboard/agency",
        element: <Agency />,
      },
      {
        path: "/dashboard/team",
        element: <Team />,
      },
      {
        path: "/dashboard/enquiries",
        element: <Enquires />,
      },
      {
        path: "/dashboard/favorite-properties",
        element: <FavoriteProperties />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manage-buyers",
        element: <ManageBuyers />,
      },
      {
        path: "/dashboard/manage-agents",
        element: <ManageAgents />,
      },
      {
        path: "/dashboard/manage-agencies",
        element: <ManageAgencies />,
      },
      {
        path: "/dashboard/manage-lists",
        element: <ManageLists />,
      },
      {
        path: "/dashboard/manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/promotion/:id",
        element: <Promotion />,
      },
      {
        path: "/dashboard/dashboard-overview",
        element: <DashboardOverview />,
      },
      {
        path: "/dashboard/plan",
        element: <Plan />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
