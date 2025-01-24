import React, { useState } from "react";
import { Link } from "react-router-dom";

const RealEstateComponent = () => {
  const [activeTab, setActiveTab] = useState("Real estate");

  const tabs = ["Real estate", "New homes", "Popular areas", "Popular searches"];

  const renderContent = () => {
    switch (activeTab) {
      case "Real estate":
        return (
          <div>
            <h2 className="font-bold mb-2">Real estate in Australia</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li><Link to="#" className="text-gray-700 hover:underline">Real estate NSW</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Real estate WA</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Real estate ACT</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Real estate Melbourne</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Real estate Adelaide</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Real estate Darwin</Link></li>
            </ul>
          </div>
        );
      case "New homes":
        return (
          <div>
            <h2 className="font-bold mb-2">Build new homes in Australia</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li><Link to="#" className="text-gray-700 hover:underline">Home builders</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">House and land</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Home builders Perth</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Home builders Adelaide</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">House and land packages Sydney</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">House and land packages Canberra</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">House designs</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Land estates</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Home builders Sydney</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">House and land packages Melbourne</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">House and land packages Brisbane</Link></li>
            </ul>
          </div>
        );
      case "Popular areas":
        return (
          <div>
            <h2 className="font-bold mb-2">Browse popular areas in Australia</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li><Link to="#" className="text-gray-700 hover:underline">Sydney house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Brisbane house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Canberra house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Perth house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Adelaide house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Melbourne house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Hobart house prices</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Suburb profiles</Link></li>
            </ul>
          </div>
        );
      case "Popular searches":
        return (
          <div>
            <h2 className="font-bold mb-2">Popular searches in Australia</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li><Link to="#" className="text-gray-700 hover:underline">Popular real estate searches</Link></li>
              <li><Link to="#" className="text-gray-700 hover:underline">Top areas to live</Link></li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8 mt-10 mb-6">
      <div className="max-w-5xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-between border-b-2 border-gray-300 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-4 text-sm font-semibold ${
                activeTab === tab ? "border-b-2 border-red-500 text-red-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default RealEstateComponent;