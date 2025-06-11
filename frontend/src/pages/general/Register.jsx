import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, X, Eye, EyeOff, User, Upload, Code } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    handle: "",
    photo: null,
    termsAccepted: false,
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoName, setPhotoName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, photo: files[0] });
      setPhotoName(files[0]?.name || "");
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setAlertMessage("You must agree to the terms and conditions.");
      return;
    }

    if (
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.username &&
      formData.handle
    ) {
      setLoading(true);
      try {
        const form = new FormData();
        form.append("fullName", formData.fullName);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("username", formData.username);
        form.append("handle", formData.handle);
        if (formData.photo) form.append("avatar", formData.photo);
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${apiUrl}/api/v1/users/register`,
          {
            method: "POST",
            body: form,
          },
          { withCredentials: true }
        );

        const result = await response.json();
        if (response.ok) {
          setAlertMessage("Registration successful!");
          navigate("/login");
        } else {
          setAlertMessage(result.message || "Something went wrong.");
        }
      } catch (error) {
        setAlertMessage("Error during registration.");
      } finally {
        setLoading(false);
      }
    } else {
      setAlertMessage("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          <Link
            to="/"
            className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group border border-gray-700 hover:bg-gray-700"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
          </Link>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-gray-700/50">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Create Account
              </h1>
              <p className="text-sm text-gray-400">Sign up to get started</p>
            </div>

            {alertMessage && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm text-center">
                  {alertMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 text-white placeholder-gray-500 text-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 text-white placeholder-gray-500 text-sm"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 text-white placeholder-gray-500 text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* === MODIFIED SECTION START === */}
              {/* Handle Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-semibold text-gray-300">
                    Codeforces Handle
                  </label>
                  <a
                    href="https://codeforces.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                  >
                    Create one?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 text-white placeholder-gray-500 text-sm"
                    placeholder="e.g., tourist"
                    required
                  />
                </div>
              </div>
              {/* === MODIFIED SECTION END === */}

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-gray-700 transition-all duration-200 text-white placeholder-gray-500 text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Profile Photo (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="hidden"
                    id="photo-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="w-full flex items-center px-4 py-2.5 bg-gray-700/50 border border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 text-sm"
                  >
                    <Upload className="h-4 w-4 text-gray-500 mr-3" />
                    <span className="text-gray-400">
                      {photoName || "Choose a file"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  id="terms-checkbox"
                  className="w-3.5 h-3.5 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <label
                  htmlFor="terms-checkbox"
                  className="ml-2.5 text-xs text-gray-400"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-indigo-400 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Registering...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
