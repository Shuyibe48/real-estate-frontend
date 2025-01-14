import {
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Bar,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { format, parseISO } from "date-fns";
import Container from "../../../components/Shared/Container";
import { useEffect, useState } from "react";
import baseUrl from "../../../api/baseUrl";

const DashboardOverview = () => {
  // Demo data for users, listings, and revenue
  const [users, setUsers] = useState({
    owners: 0,
    agents: 0,
    buyers: 0,
  });
  const [listings, setListings] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  // Helper function to format dates and group by month-year
  const getMonthlyData = (data, key) => {
    const result = {};
    data.forEach((item) => {
      const date = parseISO(item[key]);
      const monthYear = format(date, "MMM-yyyy");

      if (!result[monthYear]) {
        result[monthYear] = { totalAmount: 0, count: 0 };
      }

      result[monthYear].totalAmount += Number(item?.plan?.price) || 0;
      result[monthYear].count += 1;
    });

    // Convert result into an array sorted by month-year
    return Object.entries(result)?.map(([key, value]) => ({
      month: key,
      ...value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const agents = await baseUrl.get("/agents/get-agents");
      const buyers = await baseUrl.get("/buyers/get-buyers");
      const properties = await baseUrl.get("/properties/get-properties");
      const payments = await baseUrl.get("/payments/get-payments");
      const totalCompletePayments = payments?.data?.data?.filter(
        (payment) => payment?.paymentStatus === "completed" || payment?.paymentStatus === "pending"
      )
      setListings(properties?.data?.data);
      setRevenueData(totalCompletePayments);
      setUsers({
        owners: agents?.data?.data?.length,
        agents: buyers?.data?.data?.length,
        buyers: properties?.data?.data?.length,
      });
    };

    fetchData();
  }, []);

  const viewData = [
    {
      date: "2024-10-01",
      dailyViews: 200,
      weeklyViews: 1400,
      monthlyViews: 6000,
    },
    {
      date: "2024-11-01",
      dailyViews: 250,
      weeklyViews: 1750,
      monthlyViews: 7500,
    },
    {
      date: "2024-12-01",
      dailyViews: 220,
      weeklyViews: 1540,
      monthlyViews: 6800,
    },
  ];

  const totalActiveListings = listings?.filter(
    (listing) => listing?.approved === true && listing?.blocked === false
  ).length;

  const totalInactiveListings = listings.filter(
    (listing) =>
      listing?.approved === false ||
      listing?.blocked === true ||
      listing?.reject === true
  ).length;

  console.log(revenueData);

  const revenueByMonth = getMonthlyData(revenueData, "createdAt");

  return (
    <div className="mt-6">
      <Container>
        <div className="p-4">
          <div className="mb-4">
            <h5 className="text-[1.5rem] font-bold">Dashboard Overview</h5>
            <p className="text-[#9bbcd1] text-[1rem]">
              Welcome to the Real Estate Admin Dashboard!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Total Owners</p>
              <h3 className="text-4xl font-bold mt-2">{users.owners}</h3>
              <p className="text-sm">Registered property owners</p>
            </div> */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Total Agents</p>
              <h3 className="text-4xl font-bold mt-2">{users.agents}</h3>
              <p className="text-sm">Agents managing properties</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Total Buyers</p>
              <h3 className="text-4xl font-bold mt-2">{users.buyers}</h3>
              <p className="text-sm">Active buyers on the platform</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Active Listings</p>
              <h3 className="text-4xl font-bold mt-2">{totalActiveListings}</h3>
              <p className="text-sm">Currently active listings</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Inactive Listings</p>
              <h3 className="text-4xl font-bold mt-2">
                {totalInactiveListings}
              </h3>
              <p className="text-sm">Listings not currently active</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue Card */}
            <div className="bg-[#FDF8F4] shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Popular Listings Card */}
            {/* <div className="bg-[#FDF8F4] shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Daily/Weekly/Monthly Views
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={viewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="dailyViews" stroke="#8884d8" />
                  <Line
                    type="monotone"
                    dataKey="weeklyViews"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="monthlyViews"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardOverview;
