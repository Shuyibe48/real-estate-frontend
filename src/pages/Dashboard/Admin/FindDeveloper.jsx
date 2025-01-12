import { useEffect, useState } from "react";
import baseUrl from "../../../api/baseUrl";
import Container from "../../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Shared/Loader";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const FindDeveloper = () => {
  const [logo, setLogo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await baseUrl.get("/platforms/get-platforms");
        const platformData = res?.data?.data?.[0];
        setLogo(platformData?.developerBanner);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const {
    data: responseData = { data: [] },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["developers"],
    queryFn: async () => {
      const { data } = await baseUrl.get(`/developers/get-developers`);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProduct = Array.isArray(responseData?.data)
    ? responseData?.data?.filter(
        (product) =>
          (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
            product?.address
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase()) ||
            product?.companyName
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase())) &&
          product?.blocked === false
      )
    : [];

  // const filteredProduct = responseData?.data?.filter(
  //   (product) =>
  //     (product?.id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //       product?.address?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //       product?.companyName
  //         ?.toLowerCase()
  //         .includes(searchTerm?.toLowerCase())) &&
  //     product?.blocked === false
  // );

  return (
    <div>
      <Container>
        <div
          className="flex justify-center items-center bg-cover bg-center rounded-md h-96 w-full"
          style={{
            backgroundImage: `url(${logo || "default-placeholder.jpg"})`,
          }}
        >
          <div className="flex justify-center items-center relative text-sm w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 font-light outline-none rounded-md bg-[#F9F9F9] w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="absolute right-4">
              <CiSearch />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {filteredProduct?.map((developer) => (
            <Link
              to={`/developer/${developer._id}`}
              className="border hover:shadow-md rounded-xl overflow-hidden max-w-[340px]"
              key={developer?._id}
            >
              <img
                className="w-full h-[240px] mb-3"
                src={developer?.profileImage}
                alt=""
              />
              <div className="p-4">
                <h1 className="text-xl font-semibold">
                  {developer?.companyName}
                </h1>
                <p>{developer?.address}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FindDeveloper;
