import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useRef, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import Logo from "../../components/Landing/Shared/Navbar/Logo";
import { AuthContext } from "../../providers/AuthProvider";
import { MdEmail, MdPassword } from "react-icons/md";
import baseUrl from "../../api/baseUrl";
import toast from "react-hot-toast";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const { loading, setLoading, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const [emailFocus, setEmailFocus] = useState(false); // Floating label effect for email field
  const [passwordFocus, setPasswordFocus] = useState(false); // Floating label effect for password field

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await loginUser(email, password, navigate, from);

    return;
  };

  // Handle password reset
  const handleReset = () => {
    const email = emailRef.current.value;
    // resetPassword logic here
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    // signInWithGoogle logic here
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
            Log in to your account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative mt-6">
            <MdEmail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              ref={emailRef}
              type="email"
              name="email"
              required
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

          {/* Forgot Password */}
          <div className="text-right mt-2 text-gray-500">
            <button
              onClick={handleReset}
              className="hover:underline text-xs text-gray-500"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            {loading ? (
              <TbFidgetSpinner className="m-auto animate-spin" size={24} />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 border py-2 w-full rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-700">
            Continue with Google
          </span>
        </div>

        <p className="text-center text-gray-500 mt-4 text-xs">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-red-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
