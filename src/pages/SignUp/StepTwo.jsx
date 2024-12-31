import { MdPassword } from "react-icons/md";

const StepTwo = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Step 2</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }} className="space-y-4">
        <div className="relative mt-6">
          <MdPassword
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="password"
            name="password"
            required
            className="border rounded-lg w-full pl-10 pr-4 py-3 text-gray-700"
          />
          <label className="absolute text-xs left-10 -top-2 text-gray-500 bg-white px-1">
            Password
          </label>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} className="text-gray-600">
            Back
          </button>
          <button type="submit" className="bg-red-600 text-white py-3 px-4 rounded-lg font-semibold">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
