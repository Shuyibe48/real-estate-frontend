import { useState } from "react";
import { FaListAlt, FaUpload } from "react-icons/fa";
import Container from "../../../components/Shared/Container";
import UploadPlan from "./UploadPlan";
import ManagePlan from "./ManagePlan";

const Plan = () => {
  const [activeTab, setActiveTab] = useState("plan");

  const navigate = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-10">
      <Container>
        <div>
          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 border-b pb-2">
            <div
              className={`cursor-pointer flex items-center gap-2 ${
                activeTab === "plan" && "border-b-2 border-red-600 text-red-600"
              }`}
              onClick={() => navigate("plan")}
            >
              <FaListAlt /> <span>Plan</span>
            </div>

            <div
              className={`cursor-pointer flex items-center gap-2 ${
                activeTab === "uploadPlan" &&
                "border-b-2 border-red-600 text-red-600"
              }`}
              onClick={() => navigate("uploadPlan")}
            >
              <FaUpload /> <span>Upload Plan</span>
            </div>
          </div>

          {/* Conditional Rendering */}
          <div className="mt-6">
            {activeTab === "plan" && <ManagePlan />}
            {activeTab === "uploadPlan" && <UploadPlan tab={setActiveTab} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Plan;
