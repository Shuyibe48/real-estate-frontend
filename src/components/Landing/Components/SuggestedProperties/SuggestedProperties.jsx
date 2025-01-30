import React from "react";
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa"; // React Icons
import Container from "../../../Shared/Container";

const SuggestedProperties = () => {
  const properties = [
    {
      image:
        "https://res.cloudinary.com/drvj2jdcs/image/upload/v1737001312/project/xatmg2uyvbzrboklggxs.png",
      logo: "BELLCOURT.",
      price: "Price on Application",
      address: "5/37 Mount Street, West Perth, WA 6005",
      details: { bed: 2, bath: 2, car: 2 },
    },
    {
      image:
        "https://res.cloudinary.com/drvj2jdcs/image/upload/v1737001198/project/osxqw2fpfhzrw0kfjapn.png",
      logo: "MACK HALL REAL ESTATE",
      price: "From $799,000",
      address: "9/35 Mount Street, West Perth, WA 6005",
      details: { bed: 2, bath: 2, car: 1 },
    },
  ];

  return (
    <div className="mt-10 mb-6">
      <Container>
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Suggested properties for you
          </h2>
          <div className="flex flex-wrap gap-4">
            {properties.map((property, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden w-48"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt="Property"
                    className="w-full h-32 object-cover rounded-lg" // ইমেজ উচ্চতা h-32 করে ছোট করা হয়েছে
                  />
                  <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                    {property.logo}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-gray-800 font-semibold">
                    {property.price}
                  </p>
                  <p className="text-gray-500 text-sm">{property.address}</p>
                  <div className="flex items-center gap-4 text-gray-600 mt-2">
                    <div className="flex items-center">
                      <FaBed className="w-4 h-4" />
                      <span className="ml-1">{property.details.bed}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="w-4 h-4" />
                      <span className="ml-1">{property.details.bath}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCarAlt className="w-4 h-4" />
                      <span className="ml-1">{property.details.car}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuggestedProperties;
