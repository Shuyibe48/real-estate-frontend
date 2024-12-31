import { Bath, Bed, Car, Square } from "lucide-react";
import { FaStar } from "react-icons/fa"; // React Icons থেকে স্টার আইকন ইমপোর্ট
import { Link } from "react-router-dom";

const FavoritePropertyCard = ({
  title,
  address,
  price,
  id,
  image,
  onUnsave,
  bedrooms,
  bathrooms,
  carSpaces,
  landSize,
  propertyType,
}) => {
  return (
    <Link to={`/list/${id}`} className="border rounded-md shadow-md overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        {/* টাইটেল ও স্টার আইকন ফ্লেক্স লাইনে রাখা */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-yellow-500" onClick={onUnsave}>
            <FaStar size={24} />
          </button>
        </div>
        {/* <p className="font-semibold text-xl">{price}</p> */}
        <div className="mt-2">
          <p>{address}</p>
        </div>
        <div className="flex items-center text-xs gap-2 my-2">
          <span className="flex justify-center items-center gap-1">
            <Bed className="h-3 w-3" />
            <span>{bedrooms}</span>
          </span>
          <span className="flex justify-center items-center gap-1">
            <Bath className="h-3 w-3" />
            <span>{bathrooms}</span>
          </span>
          <span className="flex justify-center items-center gap-1">
            <Car className="h-3 w-3" />
            <span>{carSpaces}</span>
          </span>
          <span className="flex justify-center items-center gap-1">
            <Square className="h-3 w-3" />
            <span>
              {landSize}m<sup>2</sup>
            </span>
          </span>
          <span className="capitalize border-l pl-2">{propertyType}</span>
        </div>
      </div>
    </Link>
  );
};

export default FavoritePropertyCard;
