import { MdEmail } from "react-icons/md";

const StepOne = ({ nextStep }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Step 1</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }} className="space-y-4">
        <div className="relative mt-6">
          <MdEmail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            name="email"
            required
            className="border rounded-lg w-full pl-10 pr-4 py-3 text-gray-700"
          />
          <label className="absolute text-xs left-10 -top-2 text-gray-500 bg-white px-1">
            Email address
          </label>
        </div>
        <button type="submit" className="bg-red-600 text-white w-full py-3 rounded-lg font-semibold">
          Next
        </button>
      </form>
    </div>
  );
};

export default StepOne;
