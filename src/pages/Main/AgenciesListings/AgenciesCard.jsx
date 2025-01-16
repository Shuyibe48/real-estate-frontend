import { FaChartLine, FaEnvelope, FaHome, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const AgenciesCard = ({ agency }) => {
  return (
    <Link to={`/agency/${agency?._id}`}>
      <div className="bg-white shadow-md rounded-md overflow-hidden pb-4">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{agency.name}</h2>
          <FaHome className="text-lg" />
        </div>

        {/* Main Content */}
        <div className="px-4">
          {/* Property Info */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold">{agency.name}</h3>
            <p className="">{agency.address}</p>
           
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full text-sm">
                Professional (1053)
              </span>
              <span className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full text-sm">
                Great communicator (860)
              </span>
              <span className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full text-sm">
                Genuine (834)
              </span>
            </div>
          </div>

          {/* Performance Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
            {/* Sales Performance */}
            <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <FaChartLine /> Sales performance
              </h4>
              <p className="mt-4 text-lg font-semibold">556</p>
              <p className="text-gray-500">Properties sold in Gold Coast</p>
              <p className="mt-4 text-lg font-semibold">33</p>
              <p className="text-gray-500">Median days advertised</p>
            </div>

            {/* Rent Performance */}
            <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <FaChartLine /> Rent performance
              </h4>
              <p className="mt-4 text-lg font-semibold">287</p>
              <p className="text-gray-500">Properties leased in Gold Coast</p>
              <p className="mt-4 text-lg font-semibold">17</p>
              <p className="text-gray-500">Median days advertised</p>
            </div>

            {/* Agency Video */}
            {/* <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <FaVideo /> Agency video
              </h4>
              <div className="mt-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTc_pvcr2MAEaaeBQJwL2B8JupIZXm16OMCw&s"
                  alt="Agency Video"
                  className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition"
                />
              </div>
            </div> */}

            {/* Recently Sold */}
            {/* <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-semibold text-lg">
                Recently sold in this area
              </h4>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <img
                    key={item}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcqgtsGNO_IfzYM6VPS8lNikw4JWE-gsEBjQ&s"
                    alt={`Sold Property ${item}`}
                    className="w-full h-20 object-cover rounded-lg hover:scale-105 transition"
                  />
                ))}
              </div>
            </div> */}
          </div>

          {/* Buttons */}
          <div className="md:flex justify-end gap-4 mt-4">
           
            <Link
              to={`/multi-step-form/${agency?.owner?.userId}`}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaHome /> Request a free appraisal
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AgenciesCard;
