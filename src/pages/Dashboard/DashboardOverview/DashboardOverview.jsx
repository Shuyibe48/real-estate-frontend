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
} from "recharts";
import { format, parseISO } from "date-fns";
import Container from "../../../components/Shared/Container";

const DashboardOverview = () => {
  // Helper function to format dates and group by month-year
  const getMonthlyData = (data, key) => {
    const result = {};
    data.forEach((item) => {
      const date = parseISO(item[key]);
      const monthYear = format(date, "MMM-yyyy");

      if (!result[monthYear]) {
        result[monthYear] = { totalAmount: 0, count: 0 };
      }

      result[monthYear].totalAmount += item.totalAmount || 0;
      result[monthYear].count += 1;
    });

    // Convert result into an array sorted by month-year
    return Object.entries(result).map(([key, value]) => ({
      month: key,
      ...value,
    }));
  };

  // Demo data for buyers, agents, properties, and ad plans
  const buyers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  const agents = [
    { id: 1, name: "Agent A" },
    { id: 2, name: "Agent B" },
    { id: 3, name: "Agent C" },
  ];

  const properties = [
    { id: 1, status: "sold", soldAt: "2024-10-15" },
    { id: 2, status: "sold", soldAt: "2024-11-10" },
    { id: 3, status: "available" },
    { id: 4, status: "sold", soldAt: "2024-12-01" },
  ];

  const adPlans = [
    { id: 1, createdAt: "2024-10-01", totalAmount: 200 },
    { id: 2, createdAt: "2024-11-01", totalAmount: 300 },
    { id: 3, createdAt: "2024-12-01", totalAmount: 250 },
  ];

  const totalBuyers = buyers.length;
  const totalAgents = agents.length;
  const totalProperties = properties.length;
  const soldProperties = properties.filter(
    (prop) => prop.status === "sold"
  ).length;
  const remainingProperties = totalProperties - soldProperties;

  const adRevenueByMonth = getMonthlyData(adPlans, "createdAt");
  const soldPropertiesByMonth = getMonthlyData(
    properties.filter((p) => p.status === "sold"),
    "soldAt"
  );

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
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Total Buyers</p>
              <h3 className="text-4xl font-bold mt-2">{totalBuyers}+</h3>
              <p className="text-sm">Active buyers on the platform</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Total Agents</p>
              <h3 className="text-4xl font-bold mt-2">{totalAgents}+</h3>
              <p className="text-sm">Agents managing properties</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Sold Properties</p>
              <h3 className="text-4xl font-bold mt-2">{soldProperties}</h3>
              <p className="text-sm">Properties successfully sold</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
              <p className="font-medium">Remaining Properties</p>
              <h3 className="text-4xl font-bold mt-2">{remainingProperties}</h3>
              <p className="text-sm">Properties available for sale</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Ad Revenue Area chart */}
            <div className="bg-[#FDF8F4] shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Ad Revenue</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={adRevenueByMonth}>
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

            {/* Sold Properties Bar Chart */}
            <div className="bg-[#FDF8F4] shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Sold Properties</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={soldPropertiesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardOverview;