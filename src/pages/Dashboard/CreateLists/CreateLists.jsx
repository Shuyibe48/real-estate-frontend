import { useNavigate } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import baseUrl from "../../../api/baseUrl";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";

const types = ["Buy", "Rent"];

const CreateLists = () => {
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

  const outdoorFeatures = [
    "Swimming pool",
    "Garage",
    "Balcony",
    "Outdoor area",
  ];

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
  const saleMethods = ["Private treaty sale", "Auction"];

  const rentPropertyTypes = [
    "House",
    "Townhouse",
    "Apartment and Unit",
    "Villa",
  ];

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [value, setValue] = useState("");
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const [nearBy, setNearBy] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("Buy");
  const [propertyType, setPropertyType] = useState(["House"]);
  const [propertyAge, setPropertyAge] = useState("New");
  const [selectedFeaturesRequirements, setSelectedFeaturesRequirements] =
    useState([]);
  const [selectedOutdoorFeatures, setSelectedOutdoorFeatures] = useState([]);
  const [selectedIndoorFeatures, setSelectedIndoorFeatures] = useState([]);
  const [selectedClimateControl, setSelectedClimateControl] = useState([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [selectedSaleMethod, setSelectedSaleMethod] = useState(
    "Private treaty sale"
  );

  // Functions for managing checkbox selection
  const handleCheckboxChange = (type, setSelected, selected) => {
    if (selected.includes(type)) {
      setSelected(selected.filter((item) => item !== type));
    } else {
      setSelected([...selected, type]);
    }
  };

  const handleAddFeature = (feature) => {
    setPropertyFeatures([...propertyFeatures, feature]);
  };

  const handleAddNearBy = (location) => {
    setNearBy([...nearBy, location]);
  };

  const featuresRequirements = ["Furnished", "Pets considered"];

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputs = Object.fromEntries(formData);
    setLoading(true);

    try {
      const res = await baseUrl.post(
        `/properties/create-property/${user?.myAgency[0]?.agency?._id}`,
        {
          agentId: user?._id,
          property: {
            title: inputs.title, //
            description: inputs.description, //
            type: selectedType, //
            propertyType: propertyType, //
            price: Number(inputs.price), //
            address: inputs.address, //
            city: inputs.city, //
            latitude: Number(inputs.latitude), //
            longitude: Number(inputs.longitude), //
            landSize: Number(inputs.landSize), //
            bedrooms: Number(inputs.bedrooms), //
            bathrooms: Number(inputs.bathrooms), //
            carSpaces: Number(inputs.carSpaces), //
            propertyAge: propertyAge, //
            availableDate: new Date(inputs.availableDate), //
            propertyRequirements: selectedFeaturesRequirements, //
            saleMethod: selectedSaleMethod, //
            outdoorFeatures: selectedOutdoorFeatures, //
            indoorFeatures: selectedIndoorFeatures, //
            climateControlAndEnergy: selectedClimateControl,
            accessibilityFeatures: selectedAccessibility,
            keywords: keywords?.split(",") || [],
            nearBy: nearBy,
            images: images,
            video: inputs.video ? inputs.video : "",
          },
        }
      );

      console.log(res);
      setLoading(false);
      window.alert("Property created successfully!");
      navigate(`/dashboard/agency-lists/${user?.myAgency[0]?.agency?._id}`);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      window.alert("Something went wrong, please try again.");
    }

    // console.log({
    //   title: inputs.title, //
    //   description: value, //
    //   type: selectedType, //
    //   propertyType: propertyType, //
    //   price: Number(inputs.price), //
    //   address: inputs.address, //
    //   city: inputs.city, //
    //   latitude: Number(inputs.latitude), //
    //   longitude: Number(inputs.longitude), //
    //   landSize: Number(inputs.landSize), //
    //   bedrooms: Number(inputs.bedrooms), //
    //   bathrooms: Number(inputs.bathrooms), //
    //   carSpaces: Number(inputs.carSpaces), //
    //   propertyAge: propertyAge, //
    //   availableDate: new Date(inputs.availableDate), //
    //   propertyRequirements: selectedFeaturesRequirements, //
    //   saleMethod: selectedSaleMethod, //
    //   outdoorFeatures: selectedOutdoorFeatures, //
    //   indoorFeatures: selectedIndoorFeatures, //
    //   climateControlAndEnergy: selectedClimateControl,
    //   accessibilityFeatures: selectedAccessibility,
    //   keywords: keywords?.split(",") || [],
    //   nearBy: nearBy,
    //   images: images,
    // });
  };

  const switchType = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <Container>
        <div className="mt-6">
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
          <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left column */}
                <div className="space-y-2">
                  {/* Property Type */}
                  <div className="mb-6">
                    <h2 className="text-md mb-2 font-semibold">
                      Property type
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedType === "Buy" || selectedType === "Sold"
                        ? propertyTypes.map((type, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                name="propertyType" // All radio buttons in the same group share the same name
                                value={type}
                                checked={propertyType === type} // Only one type can be selected at a time
                                onChange={() => setPropertyType(type)} // Set the selected type on change
                                className="form-radio"
                              />
                              <span>{type}</span>
                            </label>
                          ))
                        : rentPropertyTypes.map((type, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="radio"
                                name="propertyType" // All radio buttons in the same group share the same name
                                value={type}
                                checked={propertyType === type} // Only one type can be selected at a time
                                onChange={() => setPropertyType(type)} // Set the selected type on change
                                className="form-radio"
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                    </div>
                  </div>

                  {selectedType === "Buy" || selectedType === "Sold" ? (
                    <div className="mb-6">
                      <h2 className="text-md mb-2 font-semibold">
                        New or Established Property
                      </h2>
                      <div className="flex space-x-4">
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
                      <h2 className="text-md mb-2 font-semibold">
                        Property requirements
                      </h2>
                      {featuresRequirements.map((feature, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFeaturesRequirements.includes(
                              feature
                            )}
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

                  <div className="space-y-1">
                    <label htmlFor="title" className="block font-semibold">
                      Title
                    </label>
                    <input
                      className="w-full px-2 py-2 border rounded-md outline-none"
                      name="title"
                      id="title"
                      type="text"
                      placeholder="Title"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="address" className="block font-semibold">
                      Address
                    </label>
                    <input
                      className="w-full px-2 py-2 border rounded-md outline-none"
                      name="address"
                      id="address"
                      type="text"
                      placeholder="Address"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="city" className="block font-semibold">
                      City
                    </label>
                    <input
                      className="w-full px-2 py-2 border rounded-md outline-none"
                      name="city"
                      id="city"
                      type="text"
                      placeholder="City"
                      required
                    />
                  </div>

                  {/* Outdoor Features */}
                  <div className="mb-6">
                    <h2 className="text-md mb-2 font-semibold">
                      Outdoor Features
                    </h2>
                    {outdoorFeatures.map((feature, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
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
                    <h2 className="text-md mb-2 font-semibold">
                      Indoor Features
                    </h2>
                    {indoorFeatures.map((feature, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
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
                    <h2 className="text-md mb-2 font-semibold">
                      Climate Control
                    </h2>
                    {climateControl.map((feature, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
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
                    <h2 className="text-md mb-2 font-semibold">
                      Accessibility features
                    </h2>
                    {accessibilityFeatures.map((feature, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
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
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedType === "Buy" && (
                      <div className="space-y-1">
                        <label htmlFor="price" className="block font-semibold">
                          Price
                        </label>
                        <input
                          min={0}
                          className="w-full px-2 py-2 border rounded-md outline-none"
                          name="price"
                          id="price"
                          type="number"
                          placeholder="Price"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="landSize" className="block font-semibold">
                        Land Size (sqft)
                      </label>
                      <input
                        min={0}
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="landSize"
                        id="landSize"
                        type="text"
                        placeholder="Land Size"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label htmlFor="bedrooms" className="block font-semibold">
                        Bedrooms
                      </label>
                      <input
                        min={0}
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="bedrooms"
                        id="bedrooms"
                        type="number"
                        placeholder="Bedrooms"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="bathrooms"
                        className="block font-semibold"
                      >
                        Bathrooms
                      </label>
                      <input
                        min={0}
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="bathrooms"
                        id="bathrooms"
                        type="number"
                        placeholder="Bathrooms"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="latitude" className="block font-semibold">
                        Latitude
                      </label>
                      <input
                        min={0}
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="latitude"
                        id="latitude"
                        type="text"
                        placeholder="Latitude"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="longitude"
                        className="block font-semibold"
                      >
                        Longitude
                      </label>
                      <input
                        min={0}
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="longitude"
                        id="longitude"
                        type="text"
                        placeholder="Longitude"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="carSpaces"
                        className="block font-semibold"
                      >
                        Car Spaces
                      </label>
                      <input
                        min={0}
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="carSpaces"
                        id="carSpaces"
                        type="number"
                        placeholder="Car Spaces"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="propertyAge"
                        className="block font-semibold"
                      >
                        Property Age
                      </label>
                      <input
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="propertyAge"
                        id="propertyAge"
                        type="text"
                        placeholder="Property Age"
                        required
                      />
                    </div>
                  </div>

                  {selectedType === "Rent" && (
                    <div className="space-y-1">
                      <label
                        htmlFor="availableDate"
                        className="block font-semibold"
                      >
                        Available Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-2 py-2 border rounded-md outline-none"
                        name="availableDate"
                      />
                    </div>
                  )}

                  {/* Dynamic property features */}
                  <div>
                    <label
                      htmlFor="nearby"
                      className="block font-semibold mb-1"
                    >
                      Nearby Location
                    </label>
                    <input
                      id="nearby"
                      type="text"
                      name="nearby"
                      placeholder="Add Nearby Location (e.g., School)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddNearBy(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="border rounded w-full p-2 mb-2 outline-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      {nearBy.map((location, index) => (
                        <span key={index} className="p-1 rounded-md shadow-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>

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

                  <div className="space-y-1">
                    <label
                      htmlFor="description"
                      className="block font-semibold"
                    >
                      Description
                    </label>
                    <div className="block pb-20 sm:pb-10">
                      <textarea
                        className="h-32 w-full resize-none px-2 py-2 border rounded-md outline-none"
                        name="description"
                        id="description"
                        placeholder="Description"
                        required
                      />
                      {/* <ReactQuill
                        className="h-32 w-full"
                        theme="snow"
                        onChange={setValue}
                        value={value}
                      /> */}
                    </div>
                  </div>

                  <div className="p-2 border rounded-md">
                    <div className="flex justify-between items-center gap-2 my-2 overflow-x-auto custom-scrollbar">
                      {images?.map((image, index) => (
                        <img
                          className="h-[70px] w-[100px] rounded-md"
                          key={index}
                          src={image}
                          alt=""
                        />
                      ))}
                    </div>
                    <div className="relative flex flex-col items-center text-center">
                      <label htmlFor="image">
                        <button
                          type="button"
                          className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold"
                        >
                          {uploadButtonText}
                        </button>
                      </label>
                      <div className="absolute opacity-0">
                        <UploadWidget
                          uwConfig={{
                            cloudName: "drvj2jdcs",
                            uploadPreset: "realestate",
                            multiple: true,
                            folder: "lists",
                          }}
                          setState={setImages}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="space-y-1">
                    <label htmlFor="video" className="block font-semibold">
                      Video Link
                    </label>
                    <input
                      className="w-full px-2 py-2 border rounded-md outline-none"
                      name="video"
                      id="video"
                      type="text"
                      placeholder="Paste your property video link"
                    />
                  </div> */}

                  {/* Sale Method */}
                  {selectedType === "buy" && (
                    <div className="mb-6">
                      <h2 className="text-md mb-2 font-semibold">
                        Sale Method
                      </h2>
                      <div className="grid grid-cols-1 gap-2">
                        {saleMethods.map((method, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-2"
                          >
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rose-500 text-white py-2 rounded-md transition duration-500 font-semibold"
                  >
                    {loading ? (
                      <TbFidgetSpinner className="animate-spin mx-auto" />
                    ) : (
                      "Create Property"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateLists;
