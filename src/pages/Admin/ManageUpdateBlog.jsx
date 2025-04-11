import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminMenu from "../../components/Admin/AdminMenu";
import { FaSpinner } from "react-icons/fa";

const ManageUpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    date: "",
    author: "",
    category: "",
    excerpt: "",
  });

  const { data: blog, isPending: isBlogLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      try {
        let data = await fetch(
          `https://67f518d0913986b16fa337be.mockapi.io/Blog/${id}`
        );
        let res = await data.json();
        return res;
      } catch (error) {
        return error;
      }
    },
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        image: blog.image,
        date: blog.date,
        author: blog.author,
        category: blog.category,
      });
    }
  }, [blog]);

  const { data: story, isPending: isStoryLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      try {
        let data = await fetch(
          `https://67f518d0913986b16fa337be.mockapi.io/Blog/${id}`
        );
        let res = await data.json();
        return res;
      } catch (error) {
        return error;
      }
    },
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        image: blog.image || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        date: blog.date || "",
        author: blog.author || "",
        category: blog.category || "",
      });
    }
  }, [blog]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["blog-update"],
    mutationFn: async (data) => {
      try {
        let response = await fetch(
          `https://67f518d0913986b16fa337be.mockapi.io/Blog/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let res = await response.json();
        return res;
      } catch (error) {
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/manage/blog");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isBlogLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <FaSpinner size={44} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">ویرایش وبلاگ</h1>
          <AdminMenu />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            عنوان وبلاگ
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            خلاصه
          </label>
          <input
            type="text"
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            محتوا
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            لینک تصویر
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

         

        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            تاریخ
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            نویسنده
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            دسته‌بندی
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/manage/blog")}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                در حال ذخیره...
              </span>
            ) : (
              "ذخیره"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageUpdateBlog;
