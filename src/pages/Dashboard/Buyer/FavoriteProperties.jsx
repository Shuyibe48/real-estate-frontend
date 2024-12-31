import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
import FavoritePropertyCard from "./FavoritePropertyCard";
import Container from "../../../components/Shared/Container";

const FavoriteProperties = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(user.favorites || []);

  const removeProperty = async (id) => {
    try {
      const res = await baseUrl.post(
        `/buyers/delete-favorite-property/${user._id}`,
        { propertyId: id }
      );

      const updatedUser = { ...user, ...res.data.data };
      setUser(updatedUser);
      setFavorites(updatedUser.favorites || []);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error removing property from favorites:", error);
      alert("Failed to remove the property. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      <Container>
        <div>
          <h1 className="text-2xl font-semibold mb-6">
            My Favorite Properties
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((property) => (
              <FavoritePropertyCard
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
                onUnsave={() => removeProperty(property._id)}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FavoriteProperties;
