import React, { useState } from "react";
import Container from "../../../components/Shared/Container";
import baseUrl from "../../../api/baseUrl";

const UploadPlan = ({ tab }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "", // Comma-separated values for features
    price: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    let durationInDays;

    switch (value) {
      case "1 Month":
        durationInDays = 30;
        break;
      case "6 Month":
        durationInDays = 180;
        break;
      case "1 Year":
        durationInDays = 365;
        break;
      default:
        durationInDays = 0;
    }

    setFormData({ ...formData, duration: durationInDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      features: formData.features.split(",").map((feature) => feature.trim()),
    };

    try {
      const response = await baseUrl.post("/plans/create-plan", {
        formattedData,
      });
      if (response?.data?.data) {
        tab("plan");
      }
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  };

  return (
    <div className="mt-6">
      <Container>
        <div className="p-6 border rounded-lg shadow-lg bg-[#f8f9fa]">
          <h2 className="text-2xl font-bold text-[#212529] mb-4">
            Upload New Plan
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#495057] font-medium mb-2">
                Plan Name
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
            <div className="mb-4">
              <label className="block text-[#495057] font-medium mb-2">
                Features
              </label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                placeholder="Enter features (comma-separated) (e.g., Unlimited access, Priority support, Custom integrations)"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#495057] font-medium mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                placeholder="Enter price (e.g., 10)"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#495057] font-medium mb-2">
                Duration
              </label>
              <select
                name="duration"
                onChange={handleDurationChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                required
              >
                <option value="">Select duration</option>
                <option value="1 Month">1 Month</option>
                <option value="6 Month">6 Month</option>
                <option value="1 Year">1 Year</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors"
            >
              Submit Plan
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UploadPlan;
