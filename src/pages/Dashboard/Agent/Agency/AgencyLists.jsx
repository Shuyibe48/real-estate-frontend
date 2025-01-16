import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; // Add this import for useQuery
import { useParams } from "react-router-dom";
import baseUrl from "../../../../api/baseUrl";
import Loader from "../../../../components/Shared/Loader";
import Container from "../../../../components/Shared/Container";
import AgencyListsCard from "./AgencyListsCard";

const AgencyLists = () => {
  const { id } = useParams();
  const [action, setAction] = useState(false);

  // Define the query with useQuery hook
  const {
    data: propertiesData = {
      data: [],
    },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favoriteProperties", id],
    queryFn: async () => {
      if (!id) return { data: [] };
      const res = await baseUrl.get(`/agencies/${id}`);
      return res.data.data.properties;
    },
    enabled: !!id, // Make sure query only runs if user is present
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  const filteredProduct = Array.isArray(propertiesData)
    ? propertiesData?.filter(
        (product) =>
          product?.approved === !action
      )
    : [];

  return (
    <div className="mt-6">
      <Container>
        <div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h1 className="text-2xl font-semibold">Agency Lists</h1>
            <select
              className="select select-accent rounded-md font-light bg-[#F9F9F9] outline-none px-2 py-1 w-[120px] text-sm"
              onChange={(e) => setAction(e.target.value === "true")}
            >
              <option value="false">Approved</option>
              <option value="true">Pending</option>
            </select>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProduct?.map((property) => (
              <AgencyListsCard
                key={property._id}
                id={property._id}
                title={property.title}
                address={property.address}
                price={`$${property.price}`}
                image={property.images[0]}
                description={property.description}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                carSpaces={property.carSpaces}
                landSize={property.landSize}
                propertyType={property.propertyType}
                type={property.type}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AgencyLists;
