import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Admin/AdminMenu";
import { FaSpinner, FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";

const ManageBlogList = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://67f518d0913986b16fa337be.mockapi.io/Blog"
        );
        if (!response.ok) {
          throw new Error("خطا در دریافت لیست وبلاگ‌ها");
        }
        return response.json();
      } catch (error) {
        return error;
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await fetch(
          `https://67f518d0913986b16fa337be.mockapi.io/Blog/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("خطا در حذف وبلاگ");
        }
      } catch (error) {
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <FaSpinner size={44} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-500 font-semibold mb-2">
            خطا در دریافت اطلاعات
          </h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">لیست وبلاگ‌ها</h1>
          <AdminMenu />
        </div>
        <Link
          to="/manage/blog/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <FaPlus className="text-sm" />
          <span>ایجاد وبلاگ جدید</span>
        </Link>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="جستجو بر اساس عنوان وبلاگ"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBlogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <div className="flex items-center justify-end gap-2">
                <Link
                  to={`/manage/blog/update/${blog.id}`}
                  className="inline-flex items-center justify-center w-10 h-10 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                >
                  <FaPencilAlt size={18} />
                </Link>
                <button
                  onClick={() => deleteMutation.mutate(blog.id)}
                  className="inline-flex items-center justify-center w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">هیچ وبلاگی یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default ManageBlogList;
