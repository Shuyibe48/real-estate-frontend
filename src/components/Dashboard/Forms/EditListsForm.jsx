import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { categories } from "../Categories/categoriesData";

const EditProductForm = ({
  productInfo,
  handleSubmit,
  loading,
  handleImageChange,
  uploadButtonText,
}) => {

  
  // State for form inputs
  const [formData, setFormData] = useState({
    title: productInfo.title || "",
    category: productInfo.category || "",
    price: productInfo.price || "",
    dAuthority: productInfo.dAuthority || "",
    dRating: productInfo.dRating || "",
    dAge: productInfo.dAge || "",
    aRds: productInfo.aRds || "",
    aDRds: productInfo.aDRds || "",
    tTraffic: productInfo.tTraffic || "",
    tKeywords: productInfo.tKeywords || "",
    description: productInfo.description || "",
    image: productInfo.image || ""
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="mt-10 w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-[#FDF8F4]">
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                className="block rounded-lg focus:orange-300 w-full h-32 px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-[#FDF8F4] w-full m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(event) =>
                        handleImageChange(event.target.files[0])
                      }
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-orange-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-orange-500">
                      {uploadButtonText}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="dAuthority" className="block text-gray-600">
                  Domain Authority
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="dAuthority"
                  id="dAuthority"
                  type="number"
                  placeholder="Domain Authority"
                  value={formData.dAuthority}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="dRating" className="block text-gray-600">
                  Domain Rating
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="dRating"
                  id="dRating"
                  type="number"
                  placeholder="Domain Rating"
                  value={formData.dRating}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="dAge" className="block text-gray-600">
                  Domain Age
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="dAge"
                  id="dAge"
                  type="number"
                  placeholder="Domain Age"
                  value={formData.dAge}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="aRds" className="block text-gray-600">
                  Ahrefs RDs
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="aRds"
                  id="aRds"
                  type="number"
                  placeholder="Ahrefs RDs"
                  value={formData.aRds}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="aDRds" className="block text-gray-600">
                  Ahrefs Dofollow RDs
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="aDRds"
                  id="aDRds"
                  type="number"
                  placeholder="Ahrefs Dofollow RDs"
                  value={formData.aDRds}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="tTraffic" className="block text-gray-600">
                  Total Traffic
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="tTraffic"
                  id="tTraffic"
                  type="number"
                  placeholder="Total Traffic"
                  value={formData.tTraffic}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="tKeywords" className="block text-gray-600">
                  Total Keywords
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-orange-300 bg-[#fde6d64e] focus:outline-orange-500 rounded-lg"
                  name="tKeywords"
                  id="tKeywords"
                  type="number"
                  placeholder="Total Keywords"
                  value={formData.tKeywords}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-lg bg-orange-500"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
