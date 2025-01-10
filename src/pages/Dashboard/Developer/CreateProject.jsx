import { useNavigate } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import baseUrl from "../../../api/baseUrl";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";
import { TbFidgetSpinner } from "react-icons/tb";
const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [floorPlan, setFloorPlan] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(floorPlan);

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputs = Object.fromEntries(formData);
    setLoading(true);

    try {
      const res = await baseUrl.post(`/projects/create-project/${user?._id}`, {
        project: {
          title: inputs.title, //
          landSize: Number(inputs.landSize), //
          bedrooms: Number(inputs.bedrooms), //
          bathrooms: Number(inputs.bathrooms), //
          carSpaces: Number(inputs.carSpaces), //
          price: Number(inputs.price), //
          description: value, //
          images: images,
          floorPlan: floorPlan,
        },
      });

      console.log(res);
      setLoading(false);
      window.alert("Project created successfully!");
      navigate(`dashboard/projects`);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      window.alert("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <Container>
        <div className="mt-6">
          <h1 className="font-semibold text-xl mb-6 border-b pb-1">
            Create Project
          </h1>
          <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="title" className="block font-semibold">
                    Title
                  </label>
                  <input
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="landSize" className="block font-semibold">
                    Land Size (sqft)
                  </label>
                  <input
                    min={0}
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="landSize"
                    id="landSize"
                    type="text"
                    placeholder="Land Size"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bedrooms" className="block font-semibold">
                    Bedrooms
                  </label>
                  <input
                    min={0}
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="bedrooms"
                    id="bedrooms"
                    type="number"
                    placeholder="Bedrooms"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bathrooms" className="block font-semibold">
                    Bathrooms
                  </label>
                  <input
                    min={0}
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="bathrooms"
                    id="bathrooms"
                    type="number"
                    placeholder="Bathrooms"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="carSpaces" className="block font-semibold">
                    Car Spaces
                  </label>
                  <input
                    min={0}
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="carSpaces"
                    id="carSpaces"
                    type="number"
                    placeholder="Car Spaces"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="price" className="block font-semibold">
                    Price
                  </label>
                  <input
                    min={0}
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="description" className="block font-semibold">
                    Description
                  </label>
                  <div className="block pb-20 sm:pb-10">
                    <ReactQuill
                      className="h-32 w-full"
                      theme="snow"
                      onChange={setValue}
                      value={value}
                    />
                  </div>
                </div>

                <div className="p-2 border rounded-md">
                  <div className="flex justify-between items-center gap-2 my-2 overflow-x-auto custom-scrollbar">
                    {images?.map((image, index) => (
                      <img
                        className="h-[70px] w-[100px] rounded-md"
                        key={index}
                        src={image}
                        alt=""
                      />
                    ))}
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                    <label htmlFor="image">
                      <button
                        type="button"
                        className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold"
                      >
                        {uploadButtonText}
                      </button>
                    </label>
                    <div className="absolute opacity-0">
                      <UploadWidget
                        uwConfig={{
                          cloudName: "drvj2jdcs",
                          uploadPreset: "realestate",
                          multiple: true,
                          folder: "project",
                        }}
                        setState={setImages}
                      />
                    </div>
                  </div>
                </div>
{/* 
                <div className="p-2 border rounded-md">
                  <div className="flex justify-between items-center gap-2 my-2 overflow-x-auto custom-scrollbar">
                    {floorPlan && (
                      <img
                        className="h-[70px] w-[100px] rounded-md"
                        src={floorPlan}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="relative flex flex-col items-center text-center">
                    <label htmlFor="image">
                      <button
                        type="button"
                        className="bg-rose-500 hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold"
                      >
                        Floor Plan Image
                      </button>
                    </label>
                    <div className="absolute opacity-0">
                      <UploadWidget
                        uwConfig={{
                          cloudName: "drvj2jdcs",
                          uploadPreset: "realestate",
                          multiple: true,
                          folder: "floorPlan",
                        }}
                        setState={setFloorPlan}
                      />
                    </div>
                  </div>
                </div> */}
                
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-rose-500 text-white py-2 rounded-md transition duration-500 font-semibold"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin mx-auto" />
                ) : (
                  "Create Project"
                )}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateProject;
