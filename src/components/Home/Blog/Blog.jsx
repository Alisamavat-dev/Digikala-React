import React, { useMemo } from "react";
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

  const randomizedPosts = useMemo(() => {
    if (!readings) return [];
    const shuffled = [...readings];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 3);
  }, [readings]);

  if (isPending) {
    return (
      <div className="min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex justify-center items-center">
        <AiOutlineLoading3Quarters
          size={44}
          className="animate-spin text-blue-500"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex justify-center items-center">
        <p className="text-red-500 text-lg">خطا: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        آخرین مقالات
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {randomizedPosts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-40 sm:h-44 md:h-48">
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
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-bl-lg text-xs sm:text-sm">
                {post.category || "دسته‌بندی نشده"}
              </div>
            </div>
            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
                {post.excerpt || "بدون توضیحات"}
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-auto">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{post.date || "تاریخ نامشخص"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUser className="text-gray-400" />
                  <span className="truncate max-w-[100px]">
                    {post.author || "نویسنده نامشخص"}
                  </span>
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
