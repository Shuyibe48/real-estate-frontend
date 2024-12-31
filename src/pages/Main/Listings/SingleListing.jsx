import { Bath, Bed, Car, HomeIcon, House, Square } from "lucide-react";
import Slider from "../../../components/Listings/Slider/Slider";
import Container from "../../../components/Shared/Container";
import { Link, useLoaderData } from "react-router-dom";
import { MdEventAvailable } from "react-icons/md";
import {
  FaEnvelope,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import Map from "../../../components/Listings/Map/Map";
import Map2 from "../../../components/Listings/Map/Map2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaRegStar } from "react-icons/fa6";
import baseUrl from "../../../api/baseUrl";
import PromotedList from "./PromotedLIst";

const SingleListing = () => {
  const { user, setUser } = useContext(AuthContext);
  const property = useLoaderData();
  const [save, setSave] = useState(false);

  // চেক করা প্রপার্টি সেভ করা হয়েছে কিনা
  useEffect(() => {
    if (user?.favorites?.some((fav) => fav._id === property?._id)) {
      setSave(true);
    }
  }, [property, user]);

  const saveProperty = async (id) => {
    const res = await baseUrl.post(
      `/buyers/save-favorite-property/${user._id}`,
      {
        propertyId: id,
      }
    );

    if (res.data.data) {
      setSave(!save);
    }

    const updatedUser = { ...user, ...res.data.data }; // নতুন তথ্য দিয়ে ইউজার আপডেট করা
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const removeProperty = async (id) => {
    const res = await baseUrl.post(
      `/buyers/delete-favorite-property/${user._id}`,
      {
        propertyId: id,
      }
    );

    if (res.data.data) {
      setSave(!save);
    }

    const updatedUser = { ...user, ...res.data.data }; // নতুন তথ্য দিয়ে ইউজার আপডেট করা
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <div>
      <Container>
        {/* Image Slider */}
        <div>
          <Slider images={property?.images} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
          {/* Left Section */}
          <div className="lg:col-span-8">
            {/* Header Section */}
            <div className="flex justify-between items-start border-b py-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{property?.title}</h1>
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="h-4 w-4" />
                  <span>{property?.address}</span>
                </div>
                <div className="font-semibold text-xl">$ {property?.price}</div>
              </div>
            </div>

            {/* Property Information */}
            <div className="border-b py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: "PROPERTY TYPE",
                  icon: <House className="h-5 w-5" />,
                  value: property?.propertyType,
                },
                {
                  label: "BEDROOMS",
                  icon: <Bed className="h-5 w-5" />,
                  value: property?.bedrooms,
                },
                {
                  label: "BATHROOMS",
                  icon: <Bath className="h-5 w-5" />,
                  value: property?.bathrooms,
                },
                {
                  label: "SIZE",
                  icon: <Square className="h-5 w-5" />,
                  value: `${property?.landSize}m²`,
                },
                {
                  label: "CAR SPACES",
                  icon: <Car className="h-5 w-5" />,
                  value: property?.carSpaces,
                },
                {
                  label: "PROPERTY AGE",
                  icon: <HomeIcon className="h-5 w-5" />,
                  value: property?.propertyAge,
                },
                {
                  label: "AVAILABLE DATE",
                  icon: <MdEventAvailable className="h-5 w-5" />,
                  value: new Date(property?.availableDate).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <div className="flex items-center gap-1">
                    {item.icon}
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b py-8">
              <Map2 item={property} />
            </div>

            {/* Feature Lists */}
            <div className="border-b py-8 grid grid-cols-2 gap-6">
              {[
                {
                  label: "Property Requirements",
                  list: property?.propertyRequirements,
                },
                { label: "Indoor Features", list: property?.indoorFeatures },
                { label: "Outdoor Features", list: property?.outdoorFeatures },
                {
                  label: "Climate Control And Energy",
                  list: property?.climateControlAndEnergy,
                },
                {
                  label: "Accessibility Features",
                  list: property?.accessibilityFeatures,
                },
                { label: "Near By", list: property?.nearBy },
              ].map((section, idx) => (
                <div key={idx}>
                  <h1 className="font-semibold text-lg">{section.label}</h1>
                  <ul className="space-y-2">
                    {section.list?.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sale Method & Description */}
            <div className="border-b py-8">
              <h5 className="font-semibold text-lg">Sale Method</h5>
              <p className="text-gray-600">{property?.saleMethod}</p>
              <h5 className="font-semibold text-lg mt-6">Description</h5>
              <p className="mt-4">{property?.description}</p>

              {/* Key Features
              <h5 className="font-semibold text-lg mt-6">Key Features</h5>
              <ul className="list-disc list-inside space-y-2 mt-4">
                {property?.keyFeatures?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul> */}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Link to={`/agency/${property?.agencyId?._id}`}>
                  <h2 className="text-xl font-bold mb-4">
                    {property?.agencyId?.name}
                  </h2>
                </Link>
                <img
                  src={property?.agencyId?.logo}
                  alt="Agency"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <div className="flex items-center justify-center text-yellow-500">
                  <FaStar />
                  <span className="ml-2">5.0 (59 reviews)</span>
                </div>
                <p className="text-gray-500 mt-2">
                  {property?.agencyId?.address}
                </p>
                <div className="mt-6 space-y-4">
                  <Link to={`/agency/${property?.agencyId?._id}`}>
                    <button className="w-full bg-red-600 text-white py-2 rounded-md font-semibold">
                      Get in touch
                    </button>
                  </Link>

                  {!save ? (
                    <button
                      onClick={() => saveProperty(property?._id)}
                      className="flex justify-center items-center gap-2 w-full border border-gray-300 py-2 rounded-md"
                    >
                      <span>
                        <FaRegStar className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">Save Property</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => removeProperty(property?._id)}
                      className="flex justify-center items-center gap-2 w-full border border-gray-300 py-2 rounded-md"
                    >
                      <span>
                        <FaStar className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">Save Property</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-20">
                <h1 className="font-semibold text-gray-500 mb-6">
                  PROMOTED PROPERTIES
                </h1>
                <PromotedList />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleListing;
