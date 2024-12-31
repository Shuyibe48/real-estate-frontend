import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const FilterContent = ({ type, closeModal }) => {
  // All available property types, features, and other options
  const propertyTypes = [
    "House",
    "Townhouse",
    "Apartment and Unit",
    "Villa",
    "Retirement Living",
    "Land",
    "Acreage",
    "Rural",
    "Block Of Units",
  ];

  const rentPropertyTypes = [
    "House",
    "Townhouse",
    "Apartment and Unit",
    "Villa",
  ];

  const outdoorFeatures = [
    "Swimming pool",
    "Garage",
    "Balcony",
    "Outdoor area",
  ];

  const featuresRequirements = ["Furnished", "Pets considered"];

  const indoorFeatures = ["Ensuite", "Dishwasher", "Study", "Built-in robes"];
  const climateControl = [
    "Air conditioning",
    "Solar panels",
    "Heating",
    "Fireplace",
  ];
  const accessibilityFeatures = [
    "Single storey",
    "Step-free entry",
    "Wide doorways",
    "Elevator",
  ];
  const saleMethods = ["All Types", "Private treaty sale", "Auction"];

  const { searchContent, setSearchContent, query, setQuery } =
    useContext(AuthContext);

  // console.log(query);

  const [propertyType, setPropertyType] = useState([]);
  const [priceMin, setPriceMin] = useState("Any");
  const [priceMax, setPriceMax] = useState("Any");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [carSpaces, setCarSpaces] = useState("Any");
  const [landSize, setLandSize] = useState("Any");
  const [propertyAge, setPropertyAge] = useState("All Types");
  const [selectedFeaturesRequirements, setSelectedFeaturesRequirements] =
    useState([]);
  const [selectedOutdoorFeatures, setSelectedOutdoorFeatures] = useState([]);
  const [selectedIndoorFeatures, setSelectedIndoorFeatures] = useState([]);
  const [selectedClimateControl, setSelectedClimateControl] = useState([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [selectedSaleMethod, setSelectedSaleMethod] = useState("All Types");
  const navigate = useNavigate();

  // Functions for managing checkbox selection
  const handleCheckboxChange = (type, setSelected, selected) => {
    if (selected.includes(type)) {
      setSelected(selected.filter((item) => item !== type));
    } else {
      setSelected([...selected, type]);
    }
  };

  const carSpacesOptions = ["Any", "1", "2", "3", "4", "5", "6"];

  // Function to clear all filters
  const handleClearFilters = () => {
    setpropertyType(["All types"]);
    setPriceMin("Any");
    setPriceMax("Any");
    setBedrooms("Any");
    setBathrooms("Any");
    setCarSpaces("Any");
    setLandSize("Any");
    setPropertyAge("All types");
    setSelectedFeaturesRequirements([]);
    setSelectedOutdoorFeatures([]);
    setSelectedIndoorFeatures([]);
    setSelectedClimateControl([]);
    setSelectedAccessibility([]);
    setKeywords("");
    setSelectedSaleMethod("All types");
  };

  // আজকের তারিখ থেকে পরবর্তী ৭ দিনের অপশন তৈরি করা
  const getRealTimeOptions = () => {
    const options = [
      { value: "Any", label: "Any" },
      { value: "now", label: "Avail. now" },
    ];
    const today = new Date();

    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.toLocaleDateString("en-US", { day: "2-digit" });
      const month = date.toLocaleDateString("en-US", { month: "short" });

      options.push({
        value: `before-${day}-${dayNumber}-${month}`,
        label: `Before ${day} ${dayNumber} ${month}`,
      });
    }
    return options;
  };

  const handleSearch = () => {
    const searchData = {
      propertyType,
      priceMin,
      priceMax,
      bedrooms,
      bathrooms,
      carSpaces,
      landSize,
      propertyAge,
      selectedFeaturesRequirements,
      selectedOutdoorFeatures,
      selectedIndoorFeatures,
      selectedClimateControl,
      selectedAccessibility,
      keywords,
      selectedSaleMethod,
    };

    setQuery((prev) => ({
      ...prev,
      propertyType: propertyType[0] === "All Types" ? "" : propertyType,
      price: {
        min: priceMin === "Any" ? "" : priceMin,
        max: priceMax === "Any" ? "" : priceMax,
      },
      bedrooms: bedrooms === "Any" ? "" : bedrooms,
      bathrooms: bathrooms === "Any" ? "" : bathrooms,
      carSpaces: carSpaces === "Any" ? "" : carSpaces,
      landSize: landSize === "Any" ? "" : landSize,
      propertyAge: propertyAge === "Any types" ? "" : propertyAge,
      selectedFeaturesRequirements: selectedFeaturesRequirements
        ? selectedFeaturesRequirements
        : "",
      selectedOutdoorFeatures: selectedOutdoorFeatures
        ? selectedOutdoorFeatures
        : "",
      selectedIndoorFeatures: selectedIndoorFeatures
        ? selectedIndoorFeatures
        : "",
      selectedClimateControl: selectedClimateControl
        ? selectedClimateControl
        : "",
      selectedAccessibility: selectedAccessibility ? selectedAccessibility : "",
      keywords,
      selectedSaleMethod,
    }));

    const queryFiler = {
      propertyType: propertyType ? propertyType : "",
      propertyAge: propertyAge === "All Types" ? "" : propertyAge,
      saleMethod: selectedSaleMethod === "All Types" ? "" : selectedSaleMethod,

      type: query.type,
      searchText: query.searchText,
      outdoorFeatures: selectedOutdoorFeatures ? selectedOutdoorFeatures : "",
      indoorFeatures: selectedIndoorFeatures ? selectedIndoorFeatures : "",
      accessibilityFeatures: selectedAccessibility ? selectedAccessibility : "",
      keywords: keywords ? keywords : "",
      minPrice: priceMin === "Any" ? "" : priceMin,
      maxPrice: priceMax === "Any" ? "" : priceMax,
      minBedrooms: bedrooms === "Any" ? "" : bedrooms,
      minBathrooms: bathrooms === "Any" ? "" : bathrooms,
      minCarSpaces: carSpaces === "Any" ? "" : carSpaces,
      minLandSize: landSize === "Any" ? "" : landSize,
      propertyRequirements: selectedFeaturesRequirements
        ? selectedFeaturesRequirements
        : "",
      climateControlAndEnergy: selectedClimateControl
        ? selectedClimateControl
        : "",
    };

    setSearchContent(queryFiler);

    localStorage.setItem("query", JSON.stringify(queryFiler));

    navigate("/listings");
  };

  return (
    <div>
      {/* Property Type */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Property type</h2>
        <div className="grid grid-cols-2 gap-2">
          {type === "Buy" || type === "Sold"
            ? propertyTypes.map((type, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={propertyType.includes(type)}
                    onChange={() =>
                      handleCheckboxChange(type, setPropertyType, propertyType)
                    }
                    className="form-checkbox"
                  />
                  <span>{type}</span>
                </label>
              ))
            : rentPropertyTypes.map((type, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={propertyType.includes(type)}
                    onChange={() =>
                      handleCheckboxChange(type, setPropertyType, propertyType)
                    }
                    className="form-checkbox"
                  />
                  <span>{type}</span>
                </label>
              ))}
        </div>
      </div>

      <hr className="pt-6" />

      {/* Price Range */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Price</h2>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="form-select outline-none border rounded-md p-2"
          >
            <option value="Any">Min</option>
            <option value="100000">100,000+</option>
            <option value="200000">200,000+</option>
            <option value="300000">300,000+</option>
            <option value="400000">400,000+</option>
            {/* আরও অপশন যোগ করতে পারেন */}
          </select>
          <select
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="form-select outline-none border rounded-md p-2"
          >
            <option value="Any">Max</option>
            <option value="500000">500,000+</option>
            <option value="600000">600,000+</option>
            <option value="700000">700,000+</option>
            <option value="800000">800,000+</option>
            {/* আরও অপশন যোগ করতে পারেন */}
          </select>
        </div>
      </div>

      <hr className="pt-6" />

      {/* Bedrooms */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Bedrooms</h2>
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="form-select w-1/2 outline-none border rounded-md p-2"
        >
          <option value="Any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      <hr className="pt-6" />

      {/* Bathrooms */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Bathrooms</h2>
        <select
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="form-select w-1/2 outline-none border rounded-md p-2"
        >
          <option value="Any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>
      </div>

      <hr className="pt-6" />

      {/* Car Spaces */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Car spaces</h2>
        <select
          value={carSpaces}
          onChange={(e) => setCarSpaces(e.target.value)}
          className="form-select w-1/2 outline-none border rounded-md p-2"
        >
          {carSpacesOptions.map((option, index) => (
            <option key={index} value={option}>
              {option === "Any" ? option : option + "+"}
            </option>
          ))}
        </select>
      </div>

      <hr className="pt-6" />

      {/* Land Size */}
      {type === "buy" || type === "sold" ? (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold">Land Size</h2>
          <select
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            className="form-select w-1/2 outline-none border rounded-md p-2"
          >
            <option value="Any">Any</option>
            <option value="100">100+ sqm</option>
            <option value="200">200+ sqm</option>
            <option value="500">500+ sqm</option>
            <option value="1000">1000+ sqm</option>
          </select>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold">Available Date</h2>
          <select
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            className="form-select w-1/2 outline-none border rounded-md p-2"
          >
            {getRealTimeOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <hr className="pt-6" />

      {/* Property Age */}
      {type === "buy" || type === "sold" ? (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold">
            New or Established Property
          </h2>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                value="All types"
                checked={propertyAge === "All types"}
                onChange={(e) => setPropertyAge(e.target.value)}
                className="form-radio checked:bg-rose-500"
              />
              <span>All types</span>
            </label>
            <label>
              <input
                type="radio"
                value="New"
                checked={propertyAge === "New"}
                onChange={(e) => setPropertyAge(e.target.value)}
                className="form-radio checked:bg-rose-500"
              />
              <span>New</span>
            </label>
            <label>
              <input
                type="radio"
                value="Established"
                checked={propertyAge === "Established"}
                onChange={(e) => setPropertyAge(e.target.value)}
                className="form-radio checked:bg-rose-500"
              />
              <span>Established</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold">Property requirements</h2>
          {featuresRequirements.map((feature, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFeaturesRequirements.includes(feature)}
                onChange={() =>
                  handleCheckboxChange(
                    feature,
                    setSelectedFeaturesRequirements,
                    selectedFeaturesRequirements
                  )
                }
                className="form-checkbox"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      )}

      <hr className="pt-6" />

      {/* Outdoor Features */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Outdoor Features</h2>
        {outdoorFeatures.map((feature, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOutdoorFeatures.includes(feature)}
              onChange={() =>
                handleCheckboxChange(
                  feature,
                  setSelectedOutdoorFeatures,
                  selectedOutdoorFeatures
                )
              }
              className="form-checkbox"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>

      <hr className="pt-6" />

      {/* Indoor Features */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Indoor Features</h2>
        {indoorFeatures.map((feature, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedIndoorFeatures.includes(feature)}
              onChange={() =>
                handleCheckboxChange(
                  feature,
                  setSelectedIndoorFeatures,
                  selectedIndoorFeatures
                )
              }
              className="form-checkbox"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>

      <hr className="pt-6" />

      {/* Climate Control */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Climate Control</h2>
        {climateControl.map((feature, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedClimateControl.includes(feature)}
              onChange={() =>
                handleCheckboxChange(
                  feature,
                  setSelectedClimateControl,
                  selectedClimateControl
                )
              }
              className="form-checkbox"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>

      <hr className="pt-6" />

      {/* Accessibility features */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Accessibility features</h2>
        {accessibilityFeatures.map((feature, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedAccessibility.includes(feature)}
              onChange={() =>
                handleCheckboxChange(
                  feature,
                  setSelectedAccessibility,
                  selectedAccessibility
                )
              }
              className="form-checkbox"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>

      <hr className="pt-6" />

      {/* Keywords */}
      <div className="mb-6">
        <h2 className="text-md mb-2 font-semibold">Keywords</h2>
        <input
          type="text"
          placeholder="Enter keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="form-input w-1/2 outline-none border rounded-md p-2"
        />
      </div>

      <hr className="pt-6" />

      {/* Sale Method */}
      {type === "buy" && (
        <div className="mb-6">
          <h2 className="text-md mb-2 font-semibold">Sale Method</h2>
          <div className="grid grid-cols-1 gap-2">
            {saleMethods.map((method, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={selectedSaleMethod === method}
                  onChange={() => setSelectedSaleMethod(method)}
                  className="form-checkbox"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {type === "buy" && <hr className="pt-6" />}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handleClearFilters}
          className="px-4 py-2 text-rose-600 border border-rose-600 rounded-md hover:bg-rose-50"
        >
          Clear Filters
        </button>
        <span onClick={handleSearch}>
          <button
            onClick={closeModal}
            type="button"
            className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
          >
            Search
          </button>
        </span>
      </div>
    </div>
  );
};

export default FilterContent;
