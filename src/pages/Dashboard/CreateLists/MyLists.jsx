import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; // Add this import for useQuery
import Container from "../../../components/Shared/Container";
import { AuthContext } from "../../../providers/AuthProvider";
import MyListsCard from "./MyListsCard";
import baseUrl from "../../../api/baseUrl";
import Loader from "../../../components/Shared/Loader";

const FavoriteProperties = () => {
  const { user } = useContext(AuthContext);

  // Define the query with useQuery hook
  const {
    data: propertiesData = {
      data: [],
    },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favoriteProperties", user?._id],
    queryFn: async () => {
      if (!user?._id) return { data: [] };
      const res = await baseUrl.get(`/agents/${user?._id}`);
      return res.data.data.properties;
    },
    enabled: !!user?._id, // Make sure query only runs if user is present
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mt-6">
      <Container>
        <div>
          <h1 className="text-2xl font-semibold mb-6">My Lists</h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {propertiesData?.map((property) => (
              <MyListsCard
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

export default FavoriteProperties;
