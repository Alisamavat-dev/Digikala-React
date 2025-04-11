import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        "https://678411bd8b6c7a1316f69c9a.mockapi.io/B"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات کاربران");
      }
      return response.json();
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.username.trim() || !formData.password.trim()) {
        throw new Error("لطفا تمام فیلدها را پر کنید");
      }

      const user = users?.find(
        (u) =>
          u.username === formData.username && u.password === formData.password
      );

      if (!user) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          isAdmin: true,
        })
      );

      navigate("/manage");
    } catch (err) {
      setError(err.message || "خطا در ورود به سیستم");
    } finally {
      setIsLoading(false);
    }
  };

  if (isUsersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-2">
            <img
              src="https://www.digikala.com/brand/full-vertical.svg"
              alt="لوگو"
              className="w-28 h-28 mx-auto transform transition-transform duration-300 hover:scale-105"
            />
            <h2 className="text-2xl font-bold text-gray-800">خوش آمدید</h2>
            <p className="text-sm text-gray-500">
              برای ورود اطلاعات خود را وارد کنید
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                نام کاربری
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="block w-full pr-10 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 disabled:opacity-50"
                  placeholder="نام کاربری خود را وارد کنید"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="block w-full pr-10 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 disabled:opacity-50"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="mr-2 text-sm text-gray-600"
                >
                  مرا به خاطر بسپار
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                فراموشی رمز عبور؟
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  در حال ورود...
                </div>
              ) : (
                "ورود به حساب کاربری"
              )}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              حساب کاربری ندارید؟{" "}
              <a
                href="#"
                className="font-medium text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                ثبت‌نام کنید
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
