import { useEffect, useState } from "react";
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import Container from "../../../Shared/Container";
import baseUrl from "../../../../api/baseUrl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const SuggestedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await baseUrl.get(`/properties/get-properties`);
        const filteredData = res?.data?.data.filter(
          (item) => item.blocked === false && item.approved === true
        );
        setProperties(filteredData);
      } catch (error) {
        console.error("Error fetching agency data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      <AiOutlineLeft className="text-gray-700" size={24} />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full shadow p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      <AiOutlineRight className="text-gray-700" size={24} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mt-10 mb-6">
      <Container>
        <h2 className="text-xl font-semibold mb-6">
          Suggested properties for you
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings}>
            {properties.map((property) => (
              <Link to={`/list/${property?._id}`} key={property._id} className="bg-white overflow-hidden w-48 px-2">
                <div className="relative">
                  <img
                    src={property?.images[0]}
                    alt="Property"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                    {property?.agencyId?.name}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-gray-800 font-semibold">{property?.title}</p>
                  <p className="text-gray-500 text-sm">{property?.address}</p>
                  <div className="flex items-center gap-4 text-gray-600 mt-2">
                    <div className="flex items-center">
                      <FaBed className="w-4 h-4" />
                      <span className="ml-1">{property?.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="w-4 h-4" />
                      <span className="ml-1">{property?.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCarAlt className="w-4 h-4" />
                      <span className="ml-1">{property?.carSpaces}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </Container>
    </div>
  );
};

export default SuggestedProperties;
