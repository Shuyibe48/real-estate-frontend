import { useContext, useState } from "react";
import FilterContent from "./FilterContent";
import { Search } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";

const types = ["Buy", "Rent", "Sold"];

const FilterForm = ({closeModal}) => {
  const { searchContent, setSearchContent, query, setQuery } =
    useContext(AuthContext);
  const [selectedType, setSelectedType] = useState(query.type);

  const switchType = (type) => {
    setSelectedType(type);
    setQuery((prev) => ({ ...prev, type: type, }));
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery((prev) => ({ ...prev, searchText: value }));
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex mb-4 border-b-2 space-x-4">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`px-4 py-2 capitalize font-semibold ${
              selectedType === type
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="relative w-full border rounded-md">
        <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <Search className="h-4 w-4 text-gray-500" />
        </span>
        <input
          className="border-none outline-none pl-8 pr-2 py-3 w-full rounded-md hover:bg-rose-50 transition duration-500"
          type="text"
          name="location"
          placeholder="Search suburb, postcode or state"
          value={query.searchText}
          onChange={handleInputChange}
        />
      </div>
      {/* Tab content */}
      <div className="mt-4">
        <FilterContent type={selectedType} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default FilterForm;
