import { useContext, useState, useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import baseUrl from "../../../api/baseUrl";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";
import Container from "../../../components/Shared/Container";
import { Edit, Save } from "lucide-react";
import { useParams } from "react-router-dom";

const DeveloperProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const res = await baseUrl.get(`/developers/${id}`);
        setData(res?.data?.data);
      } catch (error) {
        console.error("Error fetching developer data:", error);
      }
    };
    fetchDeveloper();
  }, [id]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    profileImage: "",
    address: "",
    companyName: "",
    description: "",
    licenses: [
      {
        licenseNumber: "",
        issuedBy: "",
        expiryDate: "",
      },
    ],
  });
  

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data?.name?.firstName || "",
        lastName: data?.name?.lastName || "",
        email: data?.email || "",
        contactNo: data?.contactNo || "",
        profileImage: data?.profileImage || "",
        address: data?.address || "",
        companyName: data?.companyName || "",
        description: data?.description || "",
        licenses: data?.licenses || [
          { licenseNumber: "", issuedBy: "", expiryDate: "" },
        ],
      });
    }
  }, [data]);

  useEffect(() => {
    if (avatar.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: avatar[0],
      }));
    }
  }, [avatar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLicenseChange = (e, index, field) => {
    const updatedLicenses = [...formData.licenses];
    updatedLicenses[index][field] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      licenses: updatedLicenses,
    }));
  };

  const addNewLicense = () => {
    setFormData((prevData) => ({
      ...prevData,
      licenses: [
        ...prevData.licenses,
        { licenseNumber: "", issuedBy: "", expiryDate: "" },
      ],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await baseUrl.patch(`/developers/${id}`, {
        developer: {
          name: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          email: formData.email,
          contactNo: formData.contactNo,
          profileImage: formData.profileImage,
          address: formData.address,
          companyName: formData.companyName,
          description: formData.description,
          licenses: formData.licenses,
        },
      });

      if (res.data.data) {
        setEdit(!edit);
        const updatedUser = { ...user, ...res.data.data };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");
      }
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
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h1 className="font-semibold text-2xl">Developer Profile</h1>
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
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div>
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-[120px] h-[120px] rounded-full border-2 border-rose-500"
                      src={
                        avatar[0] ||
                        formData.profileImage ||
                        "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                      }
                      alt="Profile"
                    />
                    <div className={`${!edit ? "hidden" : "block"}`}>
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
                <div className="space-y-1">
                  <div>
                    <div className="space-y-1">
                      <input
                        className="px-2 text-xl outline-none rounded-md bg-transparent transition duration-500"
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
                    <div className="space-y-1">
                      <input
                        className="px-2 outline-none rounded-md text-xl bg-transparent transition duration-500"
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
                  </div>
                  <div className="space-y-1">
                    <input
                      className="w-full px-2 outline-none font-semibold rounded-md text-sm bg-transparent transition duration-500"
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
                  <div className="space-y-1">
                    <input
                      className="w-full px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name="contactNo"
                      id="contactNo"
                      type="text"
                      disabled={!edit}
                      placeholder="Contact Number"
                      value={formData.contactNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      className="w-full px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name="address"
                      id="address"
                      type="text"
                      placeholder="Address"
                      disabled={!edit}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      className="w-full px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name="companyName"
                      id="companyName"
                      type="text"
                      placeholder="Company Name"
                      disabled={!edit}
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <textarea
                      className="resize-none w-full h-[70px] px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name="description"
                      id="description"
                      placeholder="Description"
                      disabled={!edit}
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="licenses" className="block font-semibold">
                  Licenses
                </label>
                {formData.licenses.map((license, index) => (
                  <div key={index} className="space-y-1">
                    <input
                      className="w-full px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name={`licenseNumber-${index}`}
                      type="text"
                      placeholder="License Number"
                      disabled={!edit}
                      value={license.licenseNumber}
                      onChange={(e) =>
                        handleLicenseChange(e, index, "licenseNumber")
                      }
                    />
                    <input
                      className="w-full px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name={`issuedBy-${index}`}
                      type="text"
                      placeholder="Issued By"
                      disabled={!edit}
                      value={license.issuedBy}
                      onChange={(e) =>
                        handleLicenseChange(e, index, "issuedBy")
                      }
                    />
                    <input
                      className="w-full px-2 outline-none rounded-md text-sm bg-transparent transition duration-500"
                      name={`expiryDate-${index}`}
                      type="date"
                      placeholder="Expiry Date"
                      disabled={!edit}
                      value={
                        license.expiryDate
                          ? new Date(license.expiryDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleLicenseChange(e, index, "expiryDate")
                      }
                    />
                  </div>
                ))}
                {edit && !data?.licenses?.length > 0 && (
                  <button
                    type="button"
                    className="bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-md transition duration-500 font-semibold mt-2"
                    onClick={addNewLicense}
                  >
                    Add New License
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default DeveloperProfile;
