import { Search } from "lucide-react";
import Container from "../../../../../components/Shared/Container";
import { useContext, useEffect, useState } from "react";
import baseUrl from "../../../../../api/baseUrl";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../providers/AuthProvider";

const Team = () => {
  const { user } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const res = await baseUrl.get(
          `/agencies/${user?.myAgency[0]?.agency?._id}`
        );
        setTeam(res.data.data.member); // কাংখিত ডাটা কনসোলে দেখানোর জন্য
      } catch (error) {
        console.error("Error fetching agency data:", error);
      }
    };

    if (user?.myAgency[0]?.agency?._id) {
      fetchAgency();
    }
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const text = e.target.search.value;

    try {
      const res = await baseUrl.get(`/agents/get-agents?searchTerm=${text}`);
      const newAgent = res?.data?.data[0];

      if (newAgent) {
        setAgents((prevAgents) => {
          // Check if the new agent already exists in the state based on `_id`
          const existingAgentIndex = prevAgents.findIndex(
            (agent) => agent._id === newAgent._id
          );

          if (existingAgentIndex !== -1) {
            // If agent exists, move it to the beginning
            const updatedAgents = [
              newAgent,
              ...prevAgents.filter((_, index) => index !== existingAgentIndex),
            ];
            return updatedAgents;
          } else {
            // If agent does not exist, add it to the beginning
            return [newAgent, ...prevAgents];
          }
        });
      }
    } catch (error) {
      console.error("Error fetching agent:", error);
    }

    e.target.reset();
  };

  return (
    <div>
      <Container>
        <div className="my-6">
          <div className="mb-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row justify-between items-center gap-2"
            >
              <div className="relative w-full">
                <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-500" />
                </span>
                <input
                  className="border outline-none pl-8 pr-2 py-3 w-full rounded-md hover:bg-rose-50 transition duration-500"
                  type="text"
                  name="search"
                  placeholder="Search agent"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-full transition duration-500 font-semibold"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {agents?.map((agent, index) => (
                <Link
                  to={`/dashboard/portfolio/single-portfolio/${agent?._id}`}
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg py-4 text-center shadow-sm"
                >
                  <img
                    src={agent?.profileImage}
                    alt={agent?.name?.fullName}
                    className="mx-auto rounded-full w-20 h-20 mb-4 object-cover"
                  />

                  <h3 className="font-semibold">{agent?.fullName}</h3>

                  {/* <p className="text-xs">{agent.role}</p> */}
                  {/* {agent.rating && (
                      <div className="mt-2 text-yellow-500 text-xs">
                        <span>⭐ {agent.rating.toFixed(1)}</span>
                        <span className="ml-1 text-gray-500">
                          ({agent.reviews} review
                          {agent.reviews > 1 ? "s" : ""})
                        </span>
                      </div>
                    )} */}
                  <div className="mt-2 text-yellow-500 text-xs">
                    <span>⭐ 5</span>
                    <span className="ml-1 text-gray-500">(47 review's)</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <hr className="pt-4" />
          <h2 className="text-2xl font-semibold mb-2">About the team</h2>
          {/* <p className="text-gray-600 mb-4">
            Showing 12 of 26 team members from Pat O'Driscoll Real Estate -
            Rockhampton
          </p> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team?.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg py-4 text-center shadow-sm"
              >
                <img
                  src={member.agent.profileImage}
                  alt={member.agent.fullName}
                  className="mx-auto rounded-full w-20 h-20 mb-4 object-cover"
                />
                <h3 className="font-semibold">{member.agent.fullName}</h3>
                <p className="text-xs">{member.role === "agent" && "Agent"}</p>
                {/* {member.rating && (
                  <div className="mt-2 text-yellow-500 text-xs">
                    <span>⭐ {member.rating.toFixed(1)}</span>
                    <span className="ml-1 text-gray-500">
                      ({member.reviews} review
                      {member.reviews > 1 ? "s" : ""})
                    </span>
                  </div>
                )} */}
                <div className="mt-2 text-yellow-500 text-xs">
                  <span>⭐ 5</span>
                  <span className="ml-1 text-gray-500">(47 review's)</span>
                </div>
              </div>
            ))}
          </div>
          {/* 
          <div className="flex justify-center">
            <span className="mt-6 px-4 py-2 rounded-md border hover:bg-rose-50 transition duration-500 cursor-pointer font-semibold">
              Show 14 more
            </span>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default Team;
