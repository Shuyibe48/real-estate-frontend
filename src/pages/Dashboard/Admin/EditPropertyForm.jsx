import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import baseUrl from "../../../api/baseUrl";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";

const EditPropertyForm = () => {
  const { id } = useParams(); // Assuming the property ID is passed as a URL parameter
  const navigate = useNavigate();
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  //   const property = useLoaderData();

  useEffect(() => {
    // Fetch existing property data to populate the form
    const fetchPropertyData = async () => {
      try {
        const response = await baseUrl.get(`/properties/${id}`);
        const { title, description, images, video } = response.data.data;
        setTitle(title);
        setValue(description);
        setImages(images);
        setVideo(video);
      } catch (error) {
        console.error("Failed to fetch property data", error);
      }
    };

    fetchPropertyData();
  }, [id]);

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await baseUrl.patch(`/properties/${id}`, {
        property: {
          title,
          description: value,
          images,
          video,
        },
      });
      setLoading(false);
      window.alert("Property updated successfully!");
      navigate("/dashboard/manage-lists");
    } catch (error) {
      console.error(error.response?.data?.data?.message);
      setLoading(false);
      window.alert("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <Container>
        <div className="mt-6">
          <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <h1 className="mb-6 font-semibold text-xl border-b pb-1">Edit Property</h1>
            <form onSubmit={handleSubmit} className="">
              <div className="flex flex-col gap-2">
                <div className="space-y-1">
                  <label htmlFor="title" className="block font-semibold">
                    Title
                  </label>
                  <input
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="title"
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
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
                        alt="Property"
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
                          folder: "lists",
                        }}
                        setState={setImages}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="video" className="block font-semibold">
                    Video Link
                  </label>
                  <input
                    className="w-full px-2 py-2 border rounded-md outline-none"
                    name="video"
                    id="video"
                    type="text"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                    placeholder="Paste your property video link"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-500 text-white py-2 rounded-md transition duration-500 font-semibold"
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin mx-auto" />
                  ) : (
                    "Update Property"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditPropertyForm;
