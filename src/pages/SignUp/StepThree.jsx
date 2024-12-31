const StepThree = ({ prevStep }) => {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Step 3</h1>
        <p className="text-gray-500">Final Step - Submit your form</p>
        <div className="flex justify-between mt-6">
          <button onClick={prevStep} className="text-gray-600">
            Back
          </button>
          <button type="submit" className="bg-red-600 text-white py-3 px-4 rounded-lg font-semibold">
            Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default StepThree;
  