import { useParams } from "react-router-dom";
import baseUrl from "../../../api/baseUrl";
import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await baseUrl.get(`/blogs/${id}`);
        setBlog(response?.data?.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchPlans();
  }, [id]);

  console.log(blog);
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">{blog?.title}</h1>
            <p className="text-gray-400">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div>
            <img className="h-[400px] w-screen" src={blog?.image} alt="" />
          </div>
          <p>{blog?.description}</p>
        </div>
      </Container>
    </div>
  );
};

export default SingleBlog;
