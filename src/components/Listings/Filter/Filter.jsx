import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers3,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import HostMenu from "../../Dashboard/DashboardSidebarMenu";

const Filter = () => {
  const [showMiles, setShowMiles] = useState(false);
  const [showMinPrice, setShowMinPrice] = useState(false);
  const [showMaxPrice, setShowMaxPrice] = useState(false);
  const [showMinBeds, setShowMinBeds] = useState(false);
  const [showMaxBeds, setShowMaxBeds] = useState(false);
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="bg-white shadow-md border-t p-2 rounded-md flex justify-between items-center">
      <div className="flex justify-center items-center">
        <div className="relative">
          <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-500" />
          </span>
          <input
            className="border-none outline-none pl-8 pr-2 py-3 w-full rounded-l-md hover:bg-rose-50 transition duration-500"
            type="text"
            name="location"
            placeholder="Enter a Search Location"
          />
        </div>

        <div className="relative bg-white rounded-r-md">
          <button className="flex w-full gap-1 items-center justify-between px-2 py-3 text-[#828793]">
            <button className="px-4 border-r border-[#adb7cb]">Clear</button>

            <span
              onClick={() => setShowMiles((prev) => !prev)}
              className="font-semibold ml-2"
            >
              +0 miles
            </span>
            {showMiles ? (
              <ChevronUp
                onClick={() => setShowMiles((prev) => !prev)}
                className="h-5 w-5"
              />
            ) : (
              <ChevronDown
                onClick={() => setShowMiles((prev) => !prev)}
                className="h-5 w-5"
              />
            )}
          </button>

          <div className="absolute bg-white shadow-md rounded-md">
            {showMiles && (
              <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                <AlertCircle className="h-6 w-6" />
                <span>$100</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        {/* Price Filter */}
        <div className="flex justify-center items-center border-r border-[#adb7cb]">
          <div className="relative">
            <button
              onClick={() => setShowMinPrice((prev) => !prev)}
              className="flex w-full gap-1 items-center justify-between px-4 py-2 text-[#828793]"
            >
              <span className="font-semibold">Min Price</span>
              {showMinPrice ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            <div className="absolute bg-white shadow-md rounded-md">
              {showMinPrice && (
                <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                  <AlertCircle className="h-6 w-6" />
                  <span>$100</span>
                </div>
              )}
            </div>
          </div>

          <span className="text-[#828793] font-semibold">To</span>

          <div className="relative">
            <button
              onClick={() => setShowMaxPrice((prev) => !prev)}
              className="flex w-full items-center gap-1 justify-between px-4 py-2 text-[#828793]"
            >
              <span className="font-semibold">Max Price</span>
              {showMaxPrice ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            <div className="absolute bg-white shadow-md rounded-md">
              {showMaxPrice && (
                <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                  <AlertCircle className="h-6 w-6" />
                  <span>$500</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Beds Filter */}
        <div className="flex justify-center items-center border-r border-[#adb7cb]">
          <div className="relative">
            <button
              onClick={() => setShowMinBeds((prev) => !prev)}
              className="flex w-full gap-1 items-center justify-between px-4 py-2 text-[#828793]"
            >
              <span className="font-semibold">Min Beds</span>
              {showMinBeds ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            <div className="absolute bg-white shadow-md rounded-md">
              {showMinBeds && (
                <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                  <AlertCircle className="h-6 w-6" />
                  <span>$100</span>
                </div>
              )}
            </div>
          </div>

          <span className="text-[#828793] font-semibold">To</span>

          <div className="relative">
            <button
              onClick={() => setShowMaxBeds((prev) => !prev)}
              className="flex w-full items-center gap-1 justify-between px-4 py-2 text-[#828793]"
            >
              <span className="font-semibold">Max Beds</span>
              {showMaxBeds ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            <div className="absolute bg-white shadow-md rounded-md">
              {showMaxBeds && (
                <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                  <AlertCircle className="h-6 w-6" />
                  <span>$500</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*property types filter */}
        <div className="relative border-r border-[#adb7cb]">
          <button
            onClick={() => setShowPropertyType((prev) => !prev)}
            className="flex w-full items-center gap-1 justify-between px-4 py-2 text-[#828793]"
          >
            <span className="font-semibold">Property Type</span>
            {showPropertyType ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div className="absolute bg-white shadow-md rounded-md">
            {showPropertyType && (
              <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                <AlertCircle className="h-6 w-6" />
                <span>$500</span>
              </div>
            )}
          </div>
        </div>

        {/*Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="flex w-full items-center gap-1 justify-between px-4 py-2 text-[#828793]"
          >
            <span className="font-semibold">Filters(1)</span>
            {showFilter ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          <div className="absolute bg-white shadow-md rounded-md">
            {showFilter && (
              <div className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-rose-50 rounded-md text-[#828793] ">
                <AlertCircle className="h-6 w-6" />
                <span>$500</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
