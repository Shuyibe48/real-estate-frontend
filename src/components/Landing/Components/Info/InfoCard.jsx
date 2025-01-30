// import { useEffect, useState } from "react";
// import Container from "../../../Shared/Container";
// import baseUrl from "../../../../api/baseUrl";
// import { Link } from "react-router-dom";

// const InfoCard = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await baseUrl.get("/blogs/get-blogs");
//         setBlogs(response?.data?.data);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       }
//     };

//     fetchPlans();
//   }, []);

//   return (
//     <Container>
//       <div className="flex flex-col md:flex-row gap-6 mt-10">
//         {blogs.slice(0, 3).map((card, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg hover:shadow-lg overflow-hidden border md:w-1/3"
//           >
//             <img
//               src={card.image}
//               alt={card.title}
//               className="w-full h-48 object-cover rounded-xl"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
//               <p className="mb-4">
//                 {card.description.length > 100
//                   ? `${card.description.slice(0, 100)}...`
//                   : card.description}
//               </p>
//               <Link
//                 to={`/blog/${card?._id}`}
//                 className="text-gray-400 font-medium hover:underline"
//               >
//                 Take a look
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default InfoCard;

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
