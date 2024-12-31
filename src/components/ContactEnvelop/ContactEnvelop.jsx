import { useContext } from "react";
import { FaStar, FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const ContactEnvelop = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 p-4 text-center text-white font-semibold text-sm">
        {user?.myAgency[0]?.agency?.name}
      </div>

      {/* Profile Image and Info */}
      <div className="p-6 flex flex-col items-center">
        <img
          src={user?.profileImage}
          alt="Agent"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">{user?.fullName}</h2>
        <div className="flex items-center space-x-1 text-yellow-500 mt-2">
          <FaStar />
          <span className="font-semibold text-gray-800">5.0</span>
          <span className="text-gray-600">(59 reviews)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 space-y-4">
        <button
          onClick={() =>
            window.alert("You cannot Request a free appraisal to you")
          }
          className="w-full flex items-center justify-center bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
        >
          <FaEnvelope className="mr-2" /> Request a free appraisal
        </button>
        <a
          href="#enquiry"
          className="w-full flex items-center justify-center border border-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
        >
          <FaEnvelope className="mr-2" /> Enquire
        </a>
        <button className="w-full flex items-center justify-center border border-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition">
          <FaPhone className="mr-2" /> {user?.contactNo}
        </button>
      </div>

      {/* Footer */}
      {/* <div className="flex justify-center py-4 border-t">
        <FaFacebook
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
          size={24}
        />
      </div> */}
    </div>
  );
};

export default ContactEnvelop;
