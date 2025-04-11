import { useState } from "react";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "../../components/Home/Footer/Footer";
import Header from "../../components/Home/Header/Header";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: blogPosts,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogPosts"],
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

  const filteredPosts = blogPosts?.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  if (filteredPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">مقاله‌ای یافت نشد</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
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
                />
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-tl-lg">
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
      <Footer />
    </div>
  );
};

export default Blog;
