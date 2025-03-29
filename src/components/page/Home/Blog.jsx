import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Blog = () => {
  const {
    data: readings,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["readings"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/Reading.json"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات مقالات");
      }
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
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full py-4 px-2 sm:px-3 md:px-4 max-w-[1330px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {readings?.map((reading, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-300"
          >
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={reading.image}
              alt={reading.title}
              loading="lazy"
            />
            <p className="text-gray-700 text-[12px] md:text-[13px] font-medium p-2 pb-12">
              {reading.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
