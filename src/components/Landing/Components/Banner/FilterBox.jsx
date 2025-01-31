import { useContext, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import FilterModal from "../../../Modal/FilterModal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import baseUrl from "../../../../api/baseUrl";

const types = ["Buy", "Rent", "Sold", "Agents"];

const FilterBox = () => {
  const { searchContent, setSearchContent, query, setQuery, user } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }));
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery((prev) => ({ ...prev, searchText: value }));
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();

    if (!query.searchText) {
      return;
    }

    if (query.type === "Agents") {
      localStorage.setItem(
        "query",
        JSON.stringify({ type: query?.type, searchText: query?.searchText })
      );
      navigate("/agentListings");
      return;
    }

    if (user) {
      await baseUrl.post(`/users/save-search-history/${user?.userId?._id}`, {
        type: query.type,
        searchText: query.searchText,
      });
    }

    setSearchContent({ type: query.type, searchText: query.searchText });
    localStorage.setItem(
      "query",
      JSON.stringify({ type: query?.type, searchText: query?.searchText })
    );
    navigate("/listings");
  };

  return (
    <div className="bg-[#000433] w-[66%] p-3 rounded-xl">
      <div className="mb-4 flex flex-row items-center overflow-x-auto">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`px-4 py-2 capitalize font-semibold ${
              query.type === type
                ? "text-white border-b-2 border-rose-500"
                : "text-white border-b-2 border-[#000433]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="relative w-full">
          <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-500" />
          </span>
          <input
            className="border-none outline-none pl-8 pr-2 py-2 w-full rounded-md hover:bg-rose-50 transition duration-500"
            type="text"
            name="location"
            placeholder="Search suburb, postcode or state"
            value={query.searchText}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenFilterModal()}
            type="button"
            d
            className={`${
              query.type === "Agents" ? "hidden" : ""
            } flex justify-between items-center gap-1 border text-white border-rose-500 hover:bg-rose-50 hover:text-black px-5 py-2 rounded-full transition duration-500 font-semibold`}
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>Filter</span>
          </button>

          <FilterModal
            isOpen={isFilterModalOpen}
            closeModal={handleCloseFilterModal}
          />
          <button
            type="button"
            onClick={handleSearchClick} // সার্চ বাটনে ক্লিক হলে কনসোল হবে
            className="bg-rose-500 hover:bg-rose-700 text-white px-5 py-2 rounded-full transition duration-500 font-semibold"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBox;
