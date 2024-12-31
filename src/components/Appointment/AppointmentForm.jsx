import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import baseUrl from "../../api/baseUrl";

const AppointmentForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Handle option selection
  const handleOptionSelect = (option, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  // Handle text input change
  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.checked,
    }));
  };

  const handleNext = async () => {
    switch (currentStep) {
      case 2:
        if (!formData.propertyAddress || !formData.propertyType) {
          alert("Please fill out all fields before proceeding.");
          return;
        }
        break;
      case 3:
        if (!formData.propertyUsage) {
          alert("Please select how the property is being used.");
          return;
        }
        break;
      case 4:
        if (!formData.appraisalReason) {
          alert("Please select a reason for appraisal.");
          return;
        }
        break;
      case 5:
        if (!formData.fullName || !formData.email || !formData.mobileNumber) {
          alert("Please complete all contact details.");
          return;
        }
        // এখানে ডাটা কন্সোল করুন এবং সাবমিট সম্পন্ন করুন
        console.log("Form Data from submit:", formData); // ফর্ম ডাটা কন্সোলে লগ হবে

        try {
          // ডাটা পোস্ট করার চেষ্টা
          const response = await baseUrl.post(
            "/appointments/create-appointment",
            {
              senderId: user?.userId?._id,
              toId: id,
              appointmentData: formData,
            }
          );

          // যদি সফলভাবে ডাটা পোস্ট হয়
          if (response.status === 200 || response.status === 201) {
            alert("Data logged in console!");
            console.log("Response Data:", response.data);

            // বর্তমান ধাপ আপডেট
            setCurrentStep(currentStep + 1);
            navigate("/");
          } else {
            // ব্যাকএন্ড থেকে অন্য কোনো স্ট্যাটাস রিটার্ন করলে
            alert("Failed to post data. Please try again.");
          }
        } catch (error) {
          // ব্যাকএন্ড বা নেটওয়ার্ক এরর হ্যান্ডলিং
          console.error("Error posting data:", error.message);
          alert("Something went wrong! Please check the console for details.");
        }
        return;
      default:
        break;
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle "Back" button click
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle "Submit" button click
  const handleSubmit = () => {
    console.log("Form Data:", formData);
    alert("Data logged in console!");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Request a free market appraisal in less than 5 minutes
            </h3>
            <p>
              Answer some quick questions to connect with the right agency for a
              personalised appraisal.
            </p>
            <ul className="mt-4">
              <li>
                Recommendations on potential sale or rental price, plus
                marketing plans
              </li>
              <li>
                Information on current demand trends and comparable properties
                on the market
              </li>
            </ul>
            <p className="mt-4">Get started:</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Which property would you like to get appraised?
            </h3>
            <div>
              <input
                type="text"
                placeholder="Search for your property address"
                className="border p-2 mb-2 w-full"
                onChange={(e) => handleInputChange(e, "propertyAddress")}
              />
            </div>
            <div className="mb-4">
              <label>Select a property type:</label>
              <select
                className="border p-2 w-full"
                onChange={(e) =>
                  handleOptionSelect(e.target.value, "propertyType")
                }
              >
                <option>Please select</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Commercial</option>
              </select>
            </div>
            <p className="mt-4">
              Can't find your address?{" "}
              <button
                onClick={() =>
                  handleOptionSelect("manual", "addressSearchMethod")
                }
              >
                Enter address manually
              </button>
            </p>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How is this property being used?
            </h3>
            <p>
              This will help the agency provide information that is most
              relevant to your needs.
            </p>
            <div className="flex items-center mt-4">
              <input
                type="radio"
                id="primaryResidence"
                name="usage"
                value="primary"
                onChange={() => handleOptionSelect("primary", "propertyUsage")}
              />
              <label htmlFor="primaryResidence" className="ml-2">
                As my primary residence
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="investmentProperty"
                name="usage"
                value="investment"
                onChange={() =>
                  handleOptionSelect("investment", "propertyUsage")
                }
              />
              <label htmlFor="investmentProperty" className="ml-2">
                As my investment property
              </label>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Why are you looking for an appraisal?
            </h3>
            <p>
              This will help the agency provide information that is most
              relevant to your needs.
            </p>
            <div className="flex items-center mt-4">
              <input
                type="radio"
                id="selling"
                name="reason"
                value="selling"
                onChange={() =>
                  handleOptionSelect("selling", "appraisalReason")
                }
              />
              <label htmlFor="selling" className="ml-2">
                I'm thinking about selling
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="leasing"
                name="reason"
                value="leasing"
                onChange={() =>
                  handleOptionSelect("leasing", "appraisalReason")
                }
              />
              <label htmlFor="leasing" className="ml-2">
                I'm thinking about leasing
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="bankValuation"
                name="reason"
                value="bankValuation"
                onChange={() =>
                  handleOptionSelect("bankValuation", "appraisalReason")
                }
              />
              <label htmlFor="bankValuation" className="ml-2">
                I'm after a bank valuation
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="curious"
                name="reason"
                value="curious"
                onChange={() =>
                  handleOptionSelect("curious", "appraisalReason")
                }
              />
              <label htmlFor="curious" className="ml-2">
                I'm just curious
              </label>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              How can the agency reach you?
            </h3>
            <div>
              <label htmlFor="fullName" className="block">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                className="border p-2 w-full"
                onChange={(e) => handleInputChange(e, "fullName")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 w-full"
                onChange={(e) => handleInputChange(e, "email")}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="mobileNumber" className="block">
                Mobile number
              </label>
              <input
                type="text"
                id="mobileNumber"
                className="border p-2 w-full"
                onChange={(e) => handleInputChange(e, "mobileNumber")}
              />
            </div>
            <div className="mt-4">
              <p>Preferred contact method(s):</p>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="emailContact"
                  onChange={(e) =>
                    handleCheckboxChange(e, "preferredContactEmail")
                  }
                />
                <label htmlFor="emailContact" className="ml-2">
                  Email
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="callContact"
                  onChange={(e) =>
                    handleCheckboxChange(e, "preferredContactCall")
                  }
                />
                <label htmlFor="callContact" className="ml-2">
                  Call
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="smsContact"
                  onChange={(e) =>
                    handleCheckboxChange(e, "preferredContactSMS")
                  }
                />
                <label htmlFor="smsContact" className="ml-2">
                  SMS
                </label>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p>
                Your contact details and declared data will not be shared with
                any third parties other than in relation to your property
                appraisal. See our{" "}
                <a href="/privacy-policy" className="text-blue-500">
                  Personal Information Collection Statement
                </a>{" "}
                for more information.
              </p>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Successfully sent the appointment request
            </h3>
            <p>Thank you for your submission! We will contact you soon.</p>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-6">{renderStepContent()}</div>
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {currentStep < 6 && (
            <button
              onClick={handleNext}
              className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {currentStep === 5 ? "Submit" : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
