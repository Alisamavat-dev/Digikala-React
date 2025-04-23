import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaSpinner,
  FaTrashAlt,
  FaPencilAlt,
  FaPlus,
  FaBox,
} from "react-icons/fa";
import Card from "../../../components/Home/Card/Card";
import AdminMenu from "../../../components/Admin/AdminMenu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ManageList = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        let data = await fetch(
          "https://676d71200e299dd2ddff8fef.mockapi.io/product"
        );
        let res = await data.json();
        return res;
      } catch (error) {
        return error;
      }
    },
  });

  const { mutate, isPending: isDeleting } = useMutation({
    mutationKey: ["product-delete"],
    mutationFn: async (id) => {
      try {
        let data = await fetch(
          `https://676d71200e299dd2ddff8fef.mockapi.io/product/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
          <p className="text-gray-600">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="text-red-500 text-2xl" />
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
            <h1 className="text-2xl font-bold text-gray-800">مدیریت محصولات</h1>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {data?.length || 0} محصول
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AdminMenu />
            <Link
              to="/manage/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaPlus className="text-sm" />
              <span>افزودن محصول</span>
            </Link>
          </div>
        </div>

        {data?.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <FaBox className="text-gray-400 text-5xl mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">هیچ محصولی یافت نشد</p>
            <Link
              to="/manage/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300"
            >
              <FaPlus className="text-sm" />
              <span>ایجاد اولین محصول</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 relative group">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      {product.discount}% تخفیف
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-end">
                      <span className="font-bold text-gray-900 text-lg">
                        {product.price.toLocaleString()} تومان
                      </span>
                    </div>
                    {product.discount > 0 && (
                      <div className="flex items-center justify-end">
                        <span className="text-gray-400 line-through text-sm">
                          {product.realPrice.toLocaleString()} تومان
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/manage/update/${product.id}`}
                      className="inline-flex items-center justify-center w-11 h-11 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                      <FaPencilAlt size={18} />
                    </Link>
                    <button
                      onClick={() => mutate(product.id)}
                      disabled={isDeleting}
                      className="inline-flex items-center justify-center w-11 h-11 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isDeleting ? (
                        <FaSpinner size={18} className="animate-spin" />
                      ) : (
                        <FaTrashAlt size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageList;
