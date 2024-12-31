import {
  AlertCircle,
  ArrowBigRight,
  Bell,
  ChevronDown,
  ChevronUp,
  Hammer,
  InspectIcon,
  List,
  Map,
  Star,
} from "lucide-react";
import { useState } from "react";
const Filter2 = () => {
  const [showFeatured, setShowFeatured] = useState(false);
  return (
    <div>
      <div className="pt-6 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Map area search results</h4>
            <span>1-25 of 5838 properties</span>
          </div>
          <div>
            <button className="border px-5 py-3 flex justify-center items-center gap-2 rounded-md">
              <span>
                <Star className="h-4 w-4" />
              </span>
              <span>Save search</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-t border-b py-2 mb-4 mt-2">
        <ul className="flex items-center font-semibold justify-between gap-10">
          <li className="flex justify-center items-center gap-2">
            <span>
              <List className="h-4 w-4" />
            </span>
            <span>List</span>
          </li>
          <li className="flex justify-center items-center gap-2">
            <span>
              <Map className="h-4 w-4" />
            </span>
            <span>Map</span>
          </li>
          <div className="relative w-full">
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-500" />
            </span>
            <input
              className="border-none outline-none pl-8 pr-2 py-3 w-full rounded-md hover:bg-rose-50 transition duration-500"
              type="text"
              name="location"
              placeholder="Search suburb, postcode or state"
            />
          </div>
          <button
            onClick={() => handleOpenFilterModal()}
            type="button"
            className={`flex justify-between items-center gap-1 border border-rose-500 hover:bg-rose-50 px-6 py-2 rounded-full transition duration-500 font-semibold`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Filter2;
