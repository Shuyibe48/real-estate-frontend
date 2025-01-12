import { useState } from "react";
import Container from "../../../components/Shared/Container";

const AdCampaignDashboard = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    platform: "google", // Default to Google
    budget: "",
    impressions: "",
    clicks: "",
    ctr: "",
    conversions: "",
    cost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add code to handle form submission
    console.log("Campaign Created:", formData);
    alert("Ad Campaign Created Successfully!");
    // Reset form after submission
    setFormData({
      campaignName: "",
      platform: "google",
      budget: "",
      impressions: "",
      clicks: "",
      ctr: "",
      conversions: "",
      cost: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-rose-500 text-white py-2 px-6 rounded-md font-semibold">
        Waiting for Google AdSense Review
      </div>
    </div>
    // <div className="mt-10">
    //   <Container>
    //     <div className="p-6 bg-gray-100 rounded-lg">
    //       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
    //         Create Ad Campaign
    //       </h2>

    //       <form onSubmit={handleSubmit} className="space-y-4">
    //         <div className="space-y-2">
    //           <label className="text-gray-700">Campaign Name</label>
    //           <input
    //             type="text"
    //             name="campaignName"
    //             value={formData.campaignName}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">Platform</label>
    //           <select
    //             name="platform"
    //             value={formData.platform}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           >
    //             <option value="google">Google Ads</option>
    //             <option value="facebook">Facebook Ads</option>
    //           </select>
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">Budget</label>
    //           <input
    //             type="number"
    //             name="budget"
    //             value={formData.budget}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">Impressions</label>
    //           <input
    //             type="number"
    //             name="impressions"
    //             value={formData.impressions}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">Clicks</label>
    //           <input
    //             type="number"
    //             name="clicks"
    //             value={formData.clicks}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">CTR (Click-Through Rate)</label>
    //           <input
    //             type="text"
    //             name="ctr"
    //             value={formData.ctr}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">Conversions</label>
    //           <input
    //             type="number"
    //             name="conversions"
    //             value={formData.conversions}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <div className="space-y-2">
    //           <label className="text-gray-700">Cost</label>
    //           <input
    //             type="number"
    //             name="cost"
    //             value={formData.cost}
    //             onChange={handleChange}
    //             className="w-full p-3 border rounded-md"
    //             required
    //           />
    //         </div>

    //         <button
    //           type="submit"
    //           className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
    //         >
    //           Create Campaign
    //         </button>
    //       </form>
    //     </div>
    //   </Container>
    // </div>
  );
};

export default AdCampaignDashboard;
