import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

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
        "https://67f518d0913986b16fa337be.mockapi.io/Blog"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات مقالات");
      }
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <AiOutlineLoading3Quarters
          size={44}
          className="animate-spin text-blue-500"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <p className="text-red-500 text-lg">خطا: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {readings.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
                {post.category || "دسته‌بندی نشده"}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt || "بدون توضیحات"}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCalendarAlt className="ml-2" />
                  <span>{post.date || "تاریخ نامشخص"}</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="ml-2" />
                  <span>{post.author || "نویسنده نامشخص"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
