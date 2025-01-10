import { Bath, Bed, Car, Square } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { FaMapMarkerAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import baseUrl from "../../../api/baseUrl";
import Container from "../../../components/Shared/Container";
import ImageSlider from "../../../components/Listings/Slider/ImageSlider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Shared/Loader";
import { AuthContext } from "../../../providers/AuthProvider";

const SingleProject = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    enquiryType: "",
    message: "",
    name: "",
    email: "",
    phone: "",
  });

  const {
    data: responseData = {
      data: [],
    },
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async ({ queryKey }) => {
      const [_key] = queryKey;
      const { data } = await baseUrl.get(`/projects/${id}`);
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return "An error has occurred: " + error.message;

  // Function to handle Next button click
  const handleSubmit = async () => {
    const message = `
    Description : ${formData?.message}
    Enquiry Type: ${formData?.enquiryType}
    Name        : ${formData?.name}
    Email       : ${formData?.email}
    Phone       : ${formData?.phone}
    `;
    if (message) {
      const res = await baseUrl.post(`/messages/create-message`, {
        toId: responseData?.data?.developerId?.userId,
        senderId: user?.userId?._id,
        messageData: message,
      });

      if (res.data.data) {
        navigate("/inbox");
      }
    } else {
      window.alert("Please select an option before proceeding.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Container>
        {/* Image Slider */}
        <div>
          <ImageSlider images={responseData?.data?.images} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
          {/* Left Section */}
          <div className="lg:col-span-8">
            {/* Header Section */}
            <div className="flex justify-between items-start border-b py-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">
                  {responseData?.data?.title}
                </h1>
                <div className="text-lg">
                  From $ {responseData?.data?.price}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 justify-between items-start pt-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">
                  Customise your design and create your dream home
                </h1>
                <div className="font-semibold">Choose your floorplan</div>
              </div>
              <div className="border rounded-md p-8">
                <img src={responseData?.data?.images[0]} alt="" />
              </div>
            </div>

            {/* responseData?.data?Information */}
            <div
              id="enquiry"
              className="border-b py-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                {
                  label: "BEDROOMS",
                  icon: <Bed className="h-5 w-5" />,
                  value: responseData?.data?.bedrooms,
                },
                {
                  label: "BATHROOMS",
                  icon: <Bath className="h-5 w-5" />,
                  value: responseData?.data?.bathrooms,
                },
                {
                  label: "SIZE",
                  icon: <Square className="h-5 w-5" />,
                  value: `${responseData?.data?.landSize}m²`,
                },
                {
                  label: "CAR SPACES",
                  icon: <Car className="h-5 w-5" />,
                  value: responseData?.data?.carSpaces,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">{item?.label}</p>
                  <div className="flex items-center gap-1">
                    {item.icon}
                    <p className="font-semibold">{item?.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="py-8">
              <div>
                <p className="font-semibold text-xl mb-6">
                  What's your enquiry about?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <label>
                    <input
                      type="checkbox"
                      name="enquiryType"
                      value="If you build in my area"
                      checked={
                        formData.enquiryType === "If you build in my area"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          enquiryType: "If you build in my area",
                        })
                      }
                    />
                    If you build in my area
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="enquiryType"
                      value="An indication of price"
                      checked={
                        formData.enquiryType === "An indication of price"
                      }
                      onChange={() =>
                        setFormData({
                          ...formData,
                          enquiryType: "An indication of price",
                        })
                      }
                    />
                    An indication of price
                  </label>
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 resize-none border mb-2 mt-3 rounded-md"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name (required)"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border mb-2 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address (required)"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border mb-2 rounded-md"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border mb-2 rounded-md"
                />
              </div>
              <div className="p-2">
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                  Send enquiry
                </button>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-20">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {responseData?.data?.title}
                    </h2>
                    <h2 className="text-lg">
                      {responseData?.data?.developerId?.companyName}
                    </h2>
                  </div>
                  <img
                    src={responseData?.data?.images[0]}
                    alt="Agency"
                    className="w-16 h-16 rounded-xl mx-auto"
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <a
                    href="#enquiry"
                    className="w-full px-8 bg-red-600 text-white py-2 rounded-md font-semibold"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProject;
