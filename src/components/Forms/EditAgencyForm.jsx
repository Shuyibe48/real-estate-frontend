import { useState, useEffect, useContext } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import baseUrl from "../../api/baseUrl";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import UploadWidget from "../UploadWidget/UploadWidget";

const EditAgencyForm = ({ agencyInfo, closeModal }) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: agencyInfo?.name || "",
    contactNo: agencyInfo?.contactNo || "",
    logo: agencyInfo?.logo || "",
    address: agencyInfo?.address || "",
    email: agencyInfo?.email || "",
    description: agencyInfo?.description || "",
  });

  // Update logo in formData whenever avatar changes
  useEffect(() => {
    if (avatar.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        logo: avatar[0], // Assuming the first element contains the URL
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
      const res = await baseUrl.patch(`/agencies/${agencyInfo?._id}`, {
        agency: {
          name: formData.name,
          contactNo: formData.contactNo,
          logo: formData.logo,
          address: formData.address,
          email: formData.email,
          description: formData.description,
        },
      });

      // Update local state and local storage with updated data
      const updatedAgency = res?.data?.data;
      const updatedUser = {
        ...user,
        myAgency: user.myAgency.map((item) =>
          item.agency._id === agencyInfo._id
            ? { ...item, agency: updatedAgency }
            : item
        ),
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      closeModal();
      toast.success("Agency updated successfully!");
    } catch (error) {
      console.error("Agency update failed:", error);
      toast.error("Agency update failed. Please try again.");
      closeModal();
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div className="border-t py-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-1 space-y-2">
          <div className="space-y-1">
            <label htmlFor="name" className="block font-semibold">
              Name
            </label>
            <input
              className="w-full px-2 py-2 outline-none border rounded-md text-sm"
              name="name"
              id="name"
              type="text"
              placeholder="Agency Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

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
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              className="w-full px-2 py-2 outline-none border rounded-md text-sm"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Logo Image Field */}
          <div className="space-y-1">
            <label htmlFor="logo" className="block font-semibold">
              Logo
            </label>
            <div className="flex items-center space-x-4">
              {/* Profile Image Display */}
              <img
                className="w-[80px] h-[80px] rounded-full border-2 border-rose-500"
                src={
                  avatar[0] ||
                  formData.logo ||
                  "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                }
                alt="Logo"
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
                    Upload Logo
                  </button>
                )}
              </UploadWidget>
            </div>
          </div>

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
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-2 py-2 h-[200px] outline-none border rounded-md resize-none text-sm"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

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

export default EditAgencyForm;
