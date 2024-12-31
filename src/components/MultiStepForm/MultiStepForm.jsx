import React, { useState } from "react";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // Current step tracker
  const [formData, setFormData] = useState({}); // Store selected options

  // Option data for each step
  const options = {
    1: ["Option 1A", "Option 1B", "Option 1C", "Option 1D"],
    2: ["Option 2A", "Option 2B", "Option 2C", "Option 2D"],
    3: ["Option 3A", "Option 3B", "Option 3C", "Option 3D"],
    4: ["Option 4A", "Option 4B", "Option 4C", "Option 4D"],
    5: ["Option 5A", "Option 5B", "Option 5C", "Option 5D"],
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setFormData((prev) => ({
      ...prev,
      [`Step ${currentStep}`]: option,
    }));
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentStep < 5) {
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
    console.log("Selected Data:", formData);
    alert("Data logged in console!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Step {currentStep} of 5
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options[currentStep].map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`py-2 px-4 rounded border ${
                formData[`Step ${currentStep}`] === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!formData[`Step ${currentStep}`]}
              className={`py-2 px-4 bg-blue-500 text-white rounded ${
                !formData[`Step ${currentStep}`] &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!formData[`Step ${currentStep}`]}
              className={`py-2 px-4 bg-green-500 text-white rounded ${
                !formData[`Step ${currentStep}`] &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
