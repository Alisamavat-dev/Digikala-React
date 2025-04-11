import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaSpinner, FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import Card from "../../components/Home/Card/Card";
import AdminMenu from "../../components/Admin/AdminMenu";
import { Link } from "react-router-dom";

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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">لیست محصولات</h1>
          <AdminMenu />
        </div>
        <Link
          to="/manage/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          <FaPlus className="text-sm" />
          <span>افزودن محصول</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((product) => (
          <Card
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            discount={
              <div className="flex items-center justify-between">
                {product.discount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded-full">
                    {product.discount}٪ تخفیف
                  </span>
                )}
                <div className="flex flex-col items-end">
                  {product.discount > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      {product.realPrice} تومان
                    </span>
                  )}
                  <span className="font-bold text-gray-900">
                    {product.price} تومان
                  </span>
                </div>
              </div>
            }
          >
            <div className="flex items-center gap-2 relative z-10">
              <Link
                to={`/manage/update/${product.id}`}
                className="inline-flex items-center justify-center w-10 h-10 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
              >
                <FaPencilAlt size={18} />
              </Link>
              <button
                onClick={() => mutate(product.id)}
                disabled={isDeleting}
                className="inline-flex items-center justify-center w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <FaSpinner size={18} className="animate-spin" />
                ) : (
                  <FaTrashAlt size={18} />
                )}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {data?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">هیچ محصولی یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default ManageList;
