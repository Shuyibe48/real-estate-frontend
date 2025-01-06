import { useState, useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import UploadWidget from "../UploadWidget/UploadWidget";
import toast from "react-hot-toast";
import baseUrl from "../../api/baseUrl";

const EditAgentFormAdmin = ({ agentInfo, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    // id: agentInfo?.id || "",
    firstName: agentInfo?.name?.firstName || "",
    lastName: agentInfo?.name?.lastName || "",
    contactNo: agentInfo?.contactNo || "",
    profileImage: agentInfo?.profileImage || "",
    address: agentInfo?.address || "",
    description: agentInfo?.description || "",
  });

  // Update profileImage in formData whenever avatar changes
  useEffect(() => {
    if (avatar.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: avatar[0], // Assuming the first element contains the URL
      }));
    }
  }, [avatar]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Backend call to update data
      const res = await baseUrl.patch(`/agents/${agentInfo?._id}`, {
        Agent: {
          name: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          contactNo: formData.contactNo,
          profileImage: formData.profileImage,
          address: formData.address,
          description: formData.description,
        },
      });
      closeModal()
      window.alert("User updated successfully!"); // নোটিফিকেশন দেখানো
    } catch (error) {
      console.error("User update failed:", error);
      toast.error("User update failed. Please try again.");
      closeModal()
    } finally {
      setLoading(false);
      closeModal() // Ensure loading is false after the request completes
    }
  };

  return (
    <div className="border-t py-4">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-1 space-y-2">
          {/* First Name Field */}
          <div className="space-y-1">
            <label htmlFor="firstName" className="block font-semibold">
              First Name
            </label>
            <input
              className="w-full px-2 py-2 outline-none border rounded-md text-sm"
              name="firstName"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Last Name Field */}
          <div className="space-y-1">
            <label htmlFor="lastName" className="block font-semibold">
              Last Name
            </label>
            <input
              className="w-full px-2 py-2 outline-none border rounded-md text-sm"
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Contact Number Field */}
          <div className="space-y-1">
            <label htmlFor="contactNo" className="block font-semibold">
              Contact Number
            </label>
            <input
              className="w-full px-2 py-2 outline-none border rounded-md text-sm"
              name="contactNo"
              id="contactNo"
              type="text"
              placeholder="Contact Number"
              value={formData.contactNo}
              onChange={handleInputChange}
            />
          </div>

          {/* Profile Image Field */}
          <div className="space-y-1">
            <label htmlFor="profileImage" className="block font-semibold">
              Profile Image
            </label>
            <div className="flex items-center space-x-4">
              {/* Profile Image Display */}
              <img
                className="w-[80px] h-[80px] rounded-full border-2 border-rose-500"
                src={
                  avatar[0] ||
                  formData.profileImage ||
                  "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                }
                alt="Profile"
              />

              {/* Upload Button */}
              <UploadWidget
                uwConfig={{
                  cloudName: "drvj2jdcs",
                  uploadPreset: "realestate",
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: "avatars",
                }}
                setState={setAvatar}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition duration-300 font-semibold"
                  >
                    Upload Image
                  </button>
                )}
              </UploadWidget>
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-1">
            <label htmlFor="address" className="block font-semibold">
              Address
            </label>
            <input
              className="w-full px-2 py-2 outline-none border rounded-md text-sm"
              name="address"
              id="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-2 py-2 h-[200px] outline-none text-sm border rounded-md resize-none"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditAgentFormAdmin;
