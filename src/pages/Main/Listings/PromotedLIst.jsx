import { useEffect, useState } from "react";
import baseUrl from "../../../api/baseUrl";
import { Bed, Bath, Car } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const PromotedList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const promotedProperties = async () => {
      const res = await baseUrl.get(`/properties/promoted-properties`);
      const shuffledData = res?.data?.data.sort(() => Math.random() - 0.5); // Shuffle the data
      setList(shuffledData);
    };

    promotedProperties();

    const interval = setInterval(() => {
      promotedProperties(); // Shuffle and load new data every 2 minutes
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds auto scroll
    arrows: true,
  };

  const clickProperty = async (id) => {
    await baseUrl.patch(`/properties/update-property-clicks/${id}`);
  };

  if (Array.isArray(list) && list.length < 0) {
    return;
  }

  return (
    <div>
      <h1 className="font-semibold text-gray-500 mb-6">PROMOTED PROPERTIES</h1>
      <Slider {...settings}>
        {list?.map((property) => (
          <Link
            onClick={() => clickProperty(property?._id)}
            to={`/list/${property?._id}`}
            key={property?._id}
            className="max-w-sm rounded overflow-hidden border bg-white"
          >
            <img
              className="w-full h-56 object-cover"
              src={property?.images?.[0] || "https://via.placeholder.com/400"}
              alt={property?.title || "Property Image"}
            />
            <div className="p-4">
              <h2 className="font-semibold text-xl text-gray-700">
                {property?.title}
              </h2>
              <p className="text-gray-500 text-sm">{property?.address}</p>
              <div className="flex items-center gap-4 my-2">
                <span className="flex justify-center items-center gap-2">
                  <Bed className="h-4 w-4" />
                  <span>{property?.bedrooms}</span>
                </span>
                <span className="flex justify-center items-center gap-2">
                  <Bath className="h-4 w-4" />
                  <span>{property?.bathrooms}</span>
                </span>
                <span className="flex justify-center items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span>{property?.carSpaces}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default PromotedList;
