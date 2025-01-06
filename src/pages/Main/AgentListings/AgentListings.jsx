import { useContext, useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import AgentCard from "./AgentCard";
import baseUrl from "../../../api/baseUrl";
import { AuthContext } from "../../../providers/AuthProvider";
import AgenciesCard from "../AgenciesListings/AgenciesCard";
import Loader from "../../../components/Shared/Loader";

const AgentAgencyListings = () => {
  const { searchContent, setSearchContent } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Agent"); // 'Agent' or 'Agencies'
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchInput, setSearchInput] = useState(""); // State for search input

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetch starts
      setData([]); // Clear the current data before fetching new data

      try {
        const endpoint =
          selectedTab === "Agent"
            ? "/agents/get-agents"
            : "/agencies/get-agencies";
        const res = await baseUrl.get(
          `${endpoint}?${
            searchContent.searchText
              ? `address=${searchContent.searchText}`
              : ""
          }`
        );

        const filteredData = res?.data?.data.filter(
          (item) => item.blocked === false
        );

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchData();
  }, [searchContent, selectedTab]);

  const handleSearch = () => {
    if (!searchInput) {
      return;
    }
    setSearchContent({ searchText: searchInput });
    localStorage.setItem("query", JSON.stringify({ searchText: searchInput }));
  };

  return (
    <div>
      <Container>
        <div className="mb-6">
          <ul className="border w-[282px] rounded-full flex justify-between items-center">
            <li
              className={`border py-3 px-10 rounded-full cursor-pointer ${
                selectedTab === "Agent" ? "border-rose-500" : ""
              }`}
              onClick={() => {
                setSelectedTab("Agent");
                setData([]);
              }}
            >
              Agent
            </li>
            <li
              className={`border py-3 px-10 rounded-full cursor-pointer ${
                selectedTab === "Agencies" ? "border-rose-500" : ""
              }`}
              onClick={() => {
                setSelectedTab("Agencies");
                setData([]);
              }}
            >
              Agencies
            </li>
          </ul>
        </div>

        {/* Search Field */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            className="border rounded-full outline-none px-4 py-2 w-full"
            placeholder="Search suburb, postcode or state"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="bg-rose-500 text-white font-semibold rounded-full px-6 py-2 hover:bg-rose-600 transition duration-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {loading ? (
            <Loader /> // Show loading message while data is being fetched
          ) : (
            data?.map((item) =>
              selectedTab === "Agent" ? (
                <AgentCard key={item?._id} agent={item} />
              ) : (
                <AgenciesCard key={item?._id} agency={item} />
              )
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default AgentAgencyListings;
