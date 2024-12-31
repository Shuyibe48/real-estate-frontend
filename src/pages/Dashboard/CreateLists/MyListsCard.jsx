import { useState } from "react";
import { Bath, Bed, Car, Edit, Square, X } from "lucide-react";
import { Link } from "react-router-dom";
import baseUrl from "../../../api/baseUrl";

const MyListsCard = ({
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
  type,
  refetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // মডাল স্টেট
  const [actionType, setActionType] = useState(null); // স্টোর অ্যাকশন টাইপ (Mark as Sold / Delete)

  const markAsSold = async (id) => {
    try {
      await baseUrl.patch(`/properties/markAsSold/${id}`);
      refetch();
      setIsModalOpen(false);  // মডাল বন্ধ করা
    } catch (error) {
      console.error("Failed to mark as sold:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await baseUrl.delete(`/properties/${id}`);
      refetch();
      setIsModalOpen(false);  // মডাল বন্ধ করা
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const openModal = (action) => {
    setActionType(action);  // অ্যাকশন টাইপ সেট করা (Mark as Sold / Delete)
    setIsModalOpen(true);    // মডাল ওপেন করা
  };

  return (
    <div className="border rounded-md shadow-md overflow-hidden relative">
      <Link to={`/list/${id}`}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <span className="bg-yellow-500 text-white font-semibold p-1 rounded-md absolute right-2 bottom-2">{type}</span>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link to={`/list/${id}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
          </Link>
          <span className="flex justify-between items-center gap-2">
            <span onClick={() => openModal("markAsSold")} className="cursor-pointer">
              <Edit className="h-4 w-4" />
            </span>
            <span onClick={() => openModal("delete")} className="cursor-pointer">
              <X className="h-4 w-4" />
            </span>
          </span>
        </div>

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

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold">
              {actionType === "markAsSold" ? "Mark as Sold" : "Are you sure?"}
            </h2>
            <p className="mt-2">
              {actionType === "markAsSold"
                ? "Do you want to mark this property as sold?"
                : "Are you sure you want to delete this property?"}
            </p>
            <div className="mt-4 flex justify-between gap-4">
              <button
                onClick={() => {
                  if (actionType === "markAsSold") markAsSold(id);
                  if (actionType === "delete") handleDelete(id);
                }}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // মডাল বন্ধ করার জন্য
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListsCard;
