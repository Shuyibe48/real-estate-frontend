import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";
import { useEffect } from "react";
import Loader from "../../../components/Shared/Loader";
import { useParams } from "react-router-dom";
import DeveloperProject from "../Developer/DeveloperProject";

const SingleDeveloper = () => {
  const { id } = useParams();
  const {
    data: responseData = {
      data: [],
    },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: async ({ queryKey }) => {
      const [_key] = queryKey;
      const { data } = await baseUrl.get(`developers/${id}`);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Container>
        <div>
          <div className="flex items-center gap-4 text-white bg-black p-4 font-semibold rounded-t-md">
            <span>{responseData?.data?.address}</span>
            <span>{responseData?.data?.contactNo}</span>
            <span>{responseData?.data?.email}</span>
          </div>
          <div>
            <img
              className="h-96 w-full rounded-b-md"
              src={responseData?.data?.profileImage}
              alt=""
            />
          </div>

          <div>
            <DeveloperProject id={responseData?.data?._id} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleDeveloper;
