import Container from "../../../components/Shared/Container.jsx";
import listData from "../../../lib/dummyData.js";
import Card from "../../../components/Listings/Card/Card.jsx";
import Filter from "../../../components/Listings/Filter/Filter.jsx";
import Filter2 from "../../../components/Listings/Filter/Filter2.jsx";
import Map from "../../../components/Listings/Map/Map.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider.jsx";
import FilterBox from "../../../components/Landing/Components/Banner/FilterBox.jsx";
import { List, Search, SlidersHorizontal } from "lucide-react";
import FilterModal from "../../../components/Modal/FilterModal.jsx";
import baseUrl from "../../../api/baseUrl.js";
import { FaMapLocation } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loader from "../../../components/Shared/Loader.jsx";
import Promotion from "../../Dashboard/Admin/Promotion.jsx";

const Listings = () => {
  const { searchContent } = useContext(AuthContext);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  console.log(properties);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await baseUrl.get(
          `/properties/get-properties?` +
            `${searchContent.type ? `type=${searchContent.type}` : ""}` +
            `${
              searchContent.searchText
                ? `&city=${searchContent.searchText}`
                : ""
            }` +
            `${
              searchContent.propertyType?.length
                ? `&propertyType=${searchContent.propertyType.join(",")}`
                : ""
            }` +
            `${
              searchContent.outdoorFeatures?.length
                ? `&outdoorFeatures=${searchContent.outdoorFeatures.join(",")}`
                : ""
            }` +
            `${
              searchContent.indoorFeatures?.length
                ? `&indoorFeatures=${searchContent.indoorFeatures.join(",")}`
                : ""
            }` +
            `${
              searchContent.accessibilityFeatures?.length
                ? `&accessibilityFeatures=${searchContent.accessibilityFeatures.join(
                    ","
                  )}`
                : ""
            }` +
            `${
              searchContent.climateControlAndEnergy?.length
                ? `&climateControlAndEnergy=${searchContent.climateControlAndEnergy.join(
                    ","
                  )}`
                : ""
            }` +
            `${
              searchContent.propertyRequirements?.length
                ? `&propertyRequirements=${searchContent.propertyRequirements.join(
                    ","
                  )}`
                : ""
            }` +
            `${
              searchContent.saleMethod
                ? `&saleMethod=${searchContent.saleMethod}`
                : ""
            }` +
            `${
              searchContent.propertyAge
                ? `&propertyAge=${searchContent.propertyAge}`
                : ""
            }` +
            `${
              searchContent.minPrice
                ? `&minPrice=${searchContent.minPrice}`
                : ""
            }` +
            `${
              searchContent.maxPrice
                ? `&maxPrice=${searchContent.maxPrice}`
                : ""
            }` +
            `${
              searchContent.minBedrooms
                ? `&minBedrooms=${searchContent.minBedrooms}`
                : ""
            }` +
            `${
              searchContent.minBathrooms
                ? `&minBathrooms=${searchContent.minBathrooms}`
                : ""
            }` +
            `${
              searchContent.minCarSpaces
                ? `&minCarSpaces=${searchContent.minCarSpaces}`
                : ""
            }` +
            `${
              searchContent.minLandSize
                ? `&minLandSize=${searchContent.minLandSize}`
                : ""
            }`
        );

        const filteredData = res?.data?.data.filter(
          (item) => item.blocked === false && item.approved === true
        );
        setProperties(filteredData);
        // setProperties(res?.data?.data);
      } catch (error) {
        console.error("Error fetching agency data:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchListings();
  }, [searchContent]);

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };
  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <div className="bg-[#F6F5F7] pb-12 px-14">
      <Container>
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-8">
            <div className="flex justify-between items-center gap-6 border-t border-b py-2 mb-4 mt-2">
              <div
                onClick={() => setToggle(false)}
                className="flex justify-center items-center gap-2 cursor-pointer"
              >
                <span>
                  <List className="h-4 w-4" />
                </span>
                <span>List</span>
              </div>
              <div
                onClick={() => setToggle(true)}
                className="flex justify-center items-center gap-2 cursor-pointer"
              >
                <span>
                  <FaMapMarkerAlt className="h-4 w-4" />
                </span>
                <span>Map</span>
              </div>
              <div
                onClick={() => handleOpenFilterModal()}
                className="relative w-full"
              >
                <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-500" />
                </span>
                <input
                  className="border-none outline-none pl-8 pr-2 py-3 w-full rounded-md hover:bg-rose-50 transition bg-transparent duration-500"
                  type="text"
                  name="location"
                  value={""}
                  placeholder="Search suburb, postcode or state"
                />
              </div>
              <div
                onClick={() => handleOpenFilterModal()}
                className={`flex justify-between items-center gap-1 border border-rose-500 hover:bg-rose-50 cursor-pointer px-6 py-2 rounded-full transition duration-500 font-semibold`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter</span>
              </div>
              <FilterModal
                isOpen={isFilterModalOpen}
                closeModal={handleCloseFilterModal}
              />
            </div>
            {!toggle ? (
              <div>
                {loading ? (
                  <Loader />
                ) : properties && properties.length > 0 ? (
                  <div className="mt-8 flex flex-col gap-6">
                    {properties.map((item) => (
                      <Card key={item?.id} items={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[450px]">
                    <p className="bg-rose-500 font-semibold py-2 px-4 rounded-md text-white">
                      Couldn't find any property!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Map items={properties} />
            )}
          </div>

          {/* Promotion Section */}
          <div className="col-span-4 h-full pt-6 sticky top-0">
            <div className="mb-8">
              <Promotion />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Listings;
