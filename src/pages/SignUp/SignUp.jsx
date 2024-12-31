import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { TbFidgetSpinner } from "react-icons/tb";
import Logo from "../../components/Landing/Shared/Navbar/Logo";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import baseUrl from "../../api/baseUrl";

const SignUp = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Current step tracker
  const [formData, setFormData] = useState({}); // Store selected options
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let url = "/users/create-buyer";

    if (formData?.Step === "I'm Agent") {
      url = "/users/create-agent";
    }

    try {
      const res = await baseUrl.post(url, {
        email: formData.email,
        password: formData.password,
        ...formData, // All steps data
      });

      console.log(res)

      window.alert("Successfully Signed Up!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      window.alert(error?.message);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setFormData((prev) => ({
      ...prev,
      [`Step`]: option,
    }));
  };

  // Handle "Next" button click
  const handleNext = (event) => {
    if (currentStep === 1) {
      // const email = email;
      // const password = password;

      setFormData((prev) => ({
        ...prev,
        email,
        password,
      }));
    }
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle "Back" button click
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoogleSignIn = () => {
    // signInWithGoogle logic here
  };

  // Option data for each step
  const options = {
    2: ["Just Explore", "Buy Property", "Sell Property", "I'm Agent"],
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
        {/* Logo Inside Form Container */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create account
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            You can use this account across these sites:
          </p>
          <div className="flex justify-center gap-1 mt-1 text-gray-600 text-xs">
            <span>realcommercial.com.au</span> | <span>Property</span>
          </div>
        </div>

        <form
          onSubmit={currentStep === 1 ? handleNext : handleSubmit}
          className="space-y-4"
        >
          {currentStep === 1 ? (
            <>
              {/* Email Field */}
              <div className="relative mt-6">
                <MdEmail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={(e) => setEmailFocus(e.target.value !== "")}
                  className={`border rounded-lg w-full pl-10 pr-4 py-3 text-gray-700 transition-all duration-200 ${
                    emailFocus
                      ? "border-gray-500 pt-3 pb-3"
                      : "border-gray-300 pt-3 pb-3"
                  }`}
                />
                <label
                  className={`absolute text-xs left-10 transition-all duration-200 pointer-events-none ${
                    emailFocus
                      ? "-top-2 text-xs text-gray-500 bg-white px-1"
                      : "top-1/2 transform -translate-y-1/2 text-gray-400"
                  }`}
                >
                  Email address
                </label>
              </div>

              {/* Password Field */}
              <div className="relative mt-6">
                <MdPassword
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={(e) => setPasswordFocus(e.target.value !== "")}
                  className={`border rounded-lg w-full pl-10 pr-4 py-3 text-gray-700 transition-all duration-200 ${
                    passwordFocus
                      ? "border-gray-500 pt-3 pb-3"
                      : "border-gray-300 pt-3 pb-3"
                  }`}
                />
                <label
                  className={`absolute text-xs left-10 transition-all duration-200 pointer-events-none ${
                    passwordFocus
                      ? "-top-2 text-xs text-gray-500 bg-white px-1"
                      : "top-1/2 transform -translate-y-1/2 text-gray-400"
                  }`}
                >
                  Password
                </label>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-semibold text-xl text-gray-800">
                {currentStep === 2
                  ? "What is your goal to use this site?"
                  : "What is your monthly income?"}
              </h1>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {options[currentStep].map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={`py-2 px-4 rounded-md border ${
                      formData[`Step`] === option
                        ? "bg-red-600 hover:bg-red-700 transition duration-500 text-white font-semibold"
                        : "bg-rose-50 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="py-2 px-4 bg-rose-50 text-black rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !email ||
                  !password ||
                  (currentStep !== 1 && !formData[`Step`])
                }
                className={`py-2 px-4 bg-red-600 hover:bg-red-700 transition duration-500 text-white rounded-md font-semibold ${
                  currentStep !== 1 &&
                  !formData[`Step`] &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData[`Step`]}
                className={`py-2 px-4 bg-red-600 hover:bg-red-700 transition duration-500 text-white rounded-md font-semibold ${
                  !formData[`Step`] && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <TbFidgetSpinner className="m-auto animate-spin" size={24} />
                ) : (
                  "Continue"
                )}
              </button>
            )}
          </div>
        </form>

        <div className="text-center mt-6 text-gray-500 text-xs">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Sign in
          </Link>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center rounded-lg transition-all duration-200"
        >
          <FcGoogle size={20} className="mr-2" />
          Continue with Google
        </button>

        <div className="text-center mt-6 text-gray-400 text-xs">
          By clicking Continue, you agree to the{" "}
          <a href="/privacy-policy" className="text-red-600 font-semibold">
            privacy policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
