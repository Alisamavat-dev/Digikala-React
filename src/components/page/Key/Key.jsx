import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

const Key = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const {
    data,
    isPending,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["Key"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/after.json"
      );
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters size={44} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-red-500">Error: {queryError.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r to-red-300 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96 transform transition-all duration-500 hover:shadow-2xl">
        <div className="mb-6 text-center">
          <img
            src="https://www.digikala.com/brand/full-vertical.svg"
            alt="لوگو"
            className="w-24 h-24 mx-auto"
          />
        </div>
        <h1 className="text-xl font-bold mb-6 text-start text-black">
          ورود | ثبت نام
        </h1>
        <p className="text-sm font-bold mb-1 text-start text-zinc-500">سلام!</p>
        <p className="text-sm font-bold mb-6 text-start text-zinc-500">
          لطفا اطلاعات خود را وارد کنید
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              نام کاربری:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-zinc-100 input-focus mt-1 block w-full px-3 text-sm py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              رمز عبور:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-zinc-100 input-focus mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>
          <button
            type="submit"
            className="button-hover w-full bg-red-500 font-bold text-white py-4 rounded-lg transition duration-150 ease-in-out"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default Key;