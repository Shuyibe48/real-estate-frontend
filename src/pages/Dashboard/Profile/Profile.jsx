import { useContext, useState, useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";
import Container from "../../../components/Shared/Container";
import { Edit, Save } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState([]);

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: user?.name?.firstName || "",
    lastName: user?.name?.lastName || "",
    email: user?.email || "",
    contactNo: user?.contactNo || "",
    profileImage: user?.profileImage || "",
    address: user?.address || "",
    gender: user?.gender || "", // Gender field added
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
      const res = await baseUrl.patch(`/buyers/${user?._id}`, {
        buyer: {
          name: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          email: formData.email,
          contactNo: formData.contactNo,
          profileImage: formData.profileImage,
          address: formData.address,
          gender: formData.gender, // Send gender data to the backend
        },
      });

      if (res.data.data) {
        setEdit(!edit);
      }

      // Update local state and local storage with updated data
      const updatedUser = { ...user, ...res.data.data }; // নতুন তথ্য দিয়ে ইউজার আপডেট করা
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!"); // নোটিফিকেশন দেখানো
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Container>
        <div className="py-4">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h1 className="font-semibold text-2xl">Profile</h1>
              {/* Submit Button */}
              {edit ? (
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition duration-500 font-semibold"
                >
                  {loading ? (
                    <TbFidgetSpinner
                      className="m-auto animate-spin"
                      size={14}
                    />
                  ) : (
                    <span>
                      <Save className="w-3 h-3" />
                    </span>
                  )}
                </button>
              ) : (
                <span
                  onClick={() => setEdit(!edit)}
                  className="hover:bg-rose-50 rounded-md p-2 cursor-pointer transition duration-500"
                >
                  <Edit className="w-5 h-5" />
                </span>
              )}
            </div>
            <div className="mb-1 space-y-4">
              {/* Profile Image Field */}
              <div className="space-y-1 mb-6">
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

                  <div className={`${!edit ? "hidden" : "block"}`}>
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
              </div>
              {/* First Name Field */}
              <div className="space-y-1">
                <label htmlFor="firstName" className="block font-semibold">
                  First Name
                </label>
                <input
                  className="w-full px-2 py-2 outline-none border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition duration-500"
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  disabled={!edit}
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
                  className="w-full px-2 py-2 outline-none border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition duration-500"
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  disabled={!edit}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block font-semibold">
                  Email
                </label>
                <input
                  className="w-full px-2 py-2 outline-none border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition duration-500"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  disabled
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
                  className="w-full px-2 py-2 outline-none border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition duration-500"
                  name="contactNo"
                  id="contactNo"
                  type="text"
                  disabled={!edit}
                  placeholder="Contact Number"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                />
              </div>

              {/* Address Field */}
              <div className="space-y-1">
                <label htmlFor="address" className="block font-semibold">
                  Address
                </label>
                <input
                  className="w-full px-2 py-2 outline-none border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition duration-500"
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Address"
                  disabled={!edit}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              {/* Gender Field */}
              <div className="space-y-1">
                <label htmlFor="gender" className="block font-semibold">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-2 py-2 outline-none border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition duration-500"
                  disabled={!edit}
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
