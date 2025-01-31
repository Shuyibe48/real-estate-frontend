import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // For custom arrow icons
import { useEffect, useState } from "react";
import baseUrl from "../../../../api/baseUrl";
import Container from "../../../Shared/Container";
import { Link } from "react-router-dom";

const InfoCard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await baseUrl.get("/blogs/get-blogs");
        setBlogs(response?.data?.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchPlans();
  }, []);

  // Custom Previous Arrow
  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full shadow p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      <AiOutlineLeft className="text-gray-700" size={24} />
    </div>
  );

  // Custom Next Arrow
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <Container>
        <div>
          <h2 className="text-xl font-semibold mb-6">Latest property news</h2>
        </div>
        <div className="relative">
          <Slider {...settings}>
            {blogs?.map((item) => (
              <Link to={`/blog/${item?._id}`} key={item?._id} className="p-2">
                <div className="bg-white rounded-lg">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="pt-2">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mb-2 text-xs">
                      {item.description.length > 100
                        ? `${item.description.slice(0, 100)}...`
                        : item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default InfoCard;
