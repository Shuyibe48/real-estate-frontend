import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AgentCard = ({ agent }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
      if (agent?.length > 0) {
        const total = agent?.reviews?.length;
        const sumRating = agent?.reviews?.reduce(
          (sum, review) => sum + review?.rating,
          0
        );
        const avgRating = sumRating / total;
  
        setTotalReviews(total);
        setAverageRating(avgRating.toFixed(1)); // Limiting to one decimal point
      }
    }, [agent]);

    console.log(agent);

  return (
    <Link to={`/agent/${agent?._id}`}>
      <div className="bg-white shadow-md p-4 rounded-md border">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Profile Image */}
          <img
            src={agent?.profileImage}
            alt="Agent Profile"
            className="w-32 h-32 rounded-full object-cover"
          />

          {/* Agent Information */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{agent?.fullName}</h2>
            <p className="text-yellow-500 ">
              ⭐<b>{averageRating}.0</b> ({totalReviews} reviews)
            </p>
            <p className="text-gray-600 mt-2">
              Director and Selling Principal <br />
              Gold Coast Property Sales & Rentals
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center bg-[#F7F8F9] p-4 rounded-md">
            <div>
              <h3 className="text-lg font-semibold">72</h3>
              <p className="">Properties sold</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">$868k</h3>
              <p className="">Median sold price</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">27</h3>
              <p className="">Median days advertised</p>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold">77</h3>
              <p className="">Property sold</p>
            </div>
          </div>
        </div>

        <div className="lg:flex justify-between items-center gap-6">
          {/* Action Buttons */}
          <div className="flex flex-col flex-wrap gap-2 mt-6">
            <Link
              to={`/multi-step-form/${agent?.userId?._id}`}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-center"
            >
              Request a free market appraisal
            </Link>
          </div>
          {/* Recently Sold Section */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {agent?.properties?.map((property) => (
              <img
                key={property?._id}
                src={property?.images[0]}
                alt="Property 1"
                className="w-full h-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;
