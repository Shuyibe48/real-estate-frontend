import React, { useState } from "react";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";

const UploadBlog = ({ tab }) => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseUrl.post("/blogs/create-blog", {
        blog: {
          title: formData.name,
          description: formData.description,
          image: images[0],
        },
      });
      if (response?.data?.data) {
        tab("plan");
      }
    } catch (error) {
      console.error("Error creating Blog:", error);
    }
  };

  return (
    <div className="mt-6">
      <Container>
        <div className="p-6 border rounded-lg shadow-lg bg-[#f8f9fa]">
          <h2 className="text-2xl font-bold text-[#212529] mb-4">
            Upload New Blog
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#495057] font-medium mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                placeholder="Enter plan name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#495057] font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                placeholder="Enter plan description"
                required
              ></textarea>
            </div>

            <div className="relative flex flex-col items-center text-center mb-10">
              <label htmlFor="image">
                <button
                  type="button"
                  className="bg-[#00A79D] hover:bg-rose-700 text-white px-6 py-2 rounded-md transition duration-500 font-semibold"
                >
                  Upload Image
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
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors"
            >
              Create Blog
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UploadBlog;
