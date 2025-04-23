import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaSpinner,
  FaTrashAlt,
  FaPencilAlt,
  FaPlus,
  FaImage,
} from "react-icons/fa";
import AdminMenu from "../../../components/Admin/AdminMenu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ManageStories = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      try {
        let data = await fetch(
          "https://676d71200e299dd2ddff8fef.mockapi.io/story"
        );
        let res = await data.json();
        return res;
      } catch (error) {
        return error;
      }
    },
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["story-delete"],
    mutationFn: async (id) => {
      try {
        let data = await fetch(
          `https://676d71200e299dd2ddff8fef.mockapi.io/story/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        let res = await data.json();
        return res;
      } catch (error) {
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <FaSpinner
            size={48}
            className="animate-spin text-blue-500 mx-auto mb-4"
          />
          <p className="text-gray-600">در حال بارگذاری استوری‌ها...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaImage className="text-red-500 text-2xl" />
          </div>
          <h2 className="text-2xl text-gray-800 font-bold mb-3">
            خطا در دریافت اطلاعات
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              مدیریت استوری‌ها
            </h1>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {data?.length || 0} استوری
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AdminMenu />
            <Link
              to="/manage/stories/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaPlus className="text-sm" />
              <span>افزودن استوری</span>
            </Link>
          </div>
        </div>

        {data?.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <FaImage className="text-gray-400 text-5xl mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">هیچ استوری‌ای یافت نشد</p>
            <Link
              to="/manage/stories/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              <FaPlus className="text-sm" />
              <span>ایجاد اولین استوری</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {data?.map((story, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                key={story.id}
                className="group relative"
              >
                <div className="w-full pb-[100%] relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-full">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img
                        src={story.img}
                        alt={story.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Link
                      to={`/manage/stories/update/${story.id}`}
                      className="w-9 h-9 flex items-center justify-center bg-white/90 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <FaPencilAlt size={14} />
                    </Link>
                    <button
                      onClick={() => mutate(story.id)}
                      disabled={isDeleting}
                      className="w-9 h-9 flex items-center justify-center bg-white/90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isDeleting ? (
                        <FaSpinner size={14} className="animate-spin" />
                      ) : (
                        <FaTrashAlt size={14} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                    {story.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageStories;
