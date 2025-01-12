import { useEffect, useState } from "react";
import Container from "../../../Shared/Container";
import baseUrl from "../../../../api/baseUrl";
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

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {blogs.slice(0, 3).map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg hover:shadow-lg overflow-hidden border md:w-1/3"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="mb-4">
                {card.description.length > 100
                  ? `${card.description.slice(0, 100)}...`
                  : card.description}
              </p>
              <Link
                to={`/blog/${card?._id}`}
                className="text-gray-400 font-medium hover:underline"
              >
                Take a look
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default InfoCard;
