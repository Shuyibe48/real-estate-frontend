import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Container from "../../../Shared/Container";

const RecentSearches = () => {
  const [saved, setSaved] = useState([]);

  const handleSave = (index) => {
    if (!saved.includes(index)) {
      alert("Saved");
      setSaved((prev) => [...prev, index]);
    } else {
      alert("Removed from Saved");
      setSaved((prev) => prev.filter((item) => item !== index));
    }
  };

  const searches = [
    { location: "Vaucluse, NSW 2030", type: "Buy" },
    { location: "Brisbane City, QLD 4000", type: "Buy" },
    { location: "Perth - CBD and Inner Suburbs", type: "Buy" },
  ];

  return (
    <div className="mt-10 mb-6">
      <Container>
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white border rounded-lg shadow-md p-4 w-full"
              >
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112.9 7.6a7.5 7.5 0 014.5 8.9z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">
                      {search.location}
                    </p>
                    <p className="text-sm text-gray-500">{search.type}</p>
                  </div>
                </div>
                <button onClick={() => handleSave(index)}>
                  {saved.includes(index) ? (
                    <AiFillStar className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <AiOutlineStar className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RecentSearches;
