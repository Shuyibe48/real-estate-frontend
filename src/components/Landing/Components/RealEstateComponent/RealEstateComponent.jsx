import { useContext, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const RealEstateComponent = () => {
  const [activeTab, setActiveTab] = useState("Real estate");
  const { setSearchContent } = useContext(AuthContext);
  const navigate = useNavigate();

  const tabs = [
    "Real estate",
    "New homes",
    "Popular areas",
    "Popular searches",
  ];

  const handleSearchClick = (type, text) => {
    // console.log(type, text);
    setSearchContent({ type: type, searchText: text });
    localStorage.setItem(
      "query",
      JSON.stringify({ type: type, searchText: text })
    );
    navigate("/listings");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Real estate":
        return (
          <div>
            <h2 className="font-bold mb-2">Real estate in Germany</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li onClick={() => handleSearchClick("Buy", "Berlin")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Real estate Berlin
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "munich")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Real estate Munich
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "hamburg")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Real estate Hamburg
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "frankfurt")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Real estate Frankfurt
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "stuttgart")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Real estate Stuttgart
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "dusseldorf")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Real estate Düsseldorf
                </p>
              </li>
            </ul>
          </div>
        );
      case "New homes":
        return (
          <div>
            <h2 className="font-bold mb-2">Build new homes in Germany</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Link to="/developer">
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Home builders Berlin
                </p>
              </Link>
              <Link to="/developer">
                <p className="text-gray-700 hover:underline cursor-pointer">
                  House and land Hamburg
                </p>
              </Link>
              <Link to="/developer">
                <p className="text-gray-700 hover:underline cursor-pointer">
                  House and land packages Munich
                </p>
              </Link>
              <Link to="/developer">
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Home builders Frankfurt
                </p>
              </Link>
              <Link to="/developer">
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Land estates Stuttgart
                </p>
              </Link>
              <Link to="/developer">
                <p className="text-gray-700 hover:underline cursor-pointer">
                  House designs Düsseldorf
                </p>
              </Link>
            </ul>
          </div>
        );
      case "Popular areas":
        return (
          <div>
            <h2 className="font-bold mb-2">Browse popular areas in Germany</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li onClick={() => handleSearchClick("Buy", "berlin")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Berlin house prices
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "munich")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Munich house prices
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "hamburg")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Hamburg house prices
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "frankfurt")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Frankfurt house prices
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "a")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Stuttgart house prices
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "dusseldorf")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Düsseldorf house prices
                </p>
              </li>
             
            </ul>
          </div>
        );
      case "Popular searches":
        return (
          <div>
            <h2 className="font-bold mb-2">Popular searches in Germany</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <li onClick={() => handleSearchClick("Buy", "berlin")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Top areas to live in Berlin
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "munich")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Top areas to live in Munich
                </p>
              </li>
              <li onClick={() => handleSearchClick("Buy", "a")}>
                <p className="text-gray-700 hover:underline cursor-pointer">
                  Popular real estate searches Germany
                </p>
              </li>
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
                activeTab === tab
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-500"
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
