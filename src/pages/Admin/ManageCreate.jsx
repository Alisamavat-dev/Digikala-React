import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import AdminMenu from "../../components/Admin/AdminMenu";

const ManageCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    discount: "",
    price: "",
    realPrice: "",
  });

  useEffect(() => {
    if (formData.realPrice && formData.discount) {
      const realPriceNum = Number(formData.realPrice.replace(/,/g, ""));
      const discountNum = Number(formData.discount);
      if (!isNaN(realPriceNum) && !isNaN(discountNum)) {
        const discountedPrice = Math.round(
          realPriceNum * (1 - discountNum / 100)
        );
        setFormData((prev) => ({
          ...prev,
          price: discountedPrice.toLocaleString(),
        }));
      }
    }
  }, [formData.realPrice, formData.discount]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["product-create"],
    mutationFn: async (data) => {
      try {
        let response = await fetch(
          "https://676d71200e299dd2ddff8fef.mockapi.io/product",
          {
            method: "POST",
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/manage");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "realPrice") {
      // Remove non-numeric characters and format with commas
      const numericValue = value.replace(/[^\d]/g, "");
      const formattedValue = numericValue
        ? parseInt(numericValue).toLocaleString()
        : "";
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            افزودن محصول جدید
          </h1>
          <AdminMenu />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            عنوان محصول
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
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            آدرس تصویر
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="realPrice"
            className="block text-sm font-medium text-gray-700"
          >
            قیمت اصلی
          </label>
          <input
            type="text"
            id="realPrice"
            name="realPrice"
            value={formData.realPrice}
            onChange={handleChange}
            required
            placeholder="مثال: 1,000,000"
            dir="ltr"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            درصد تخفیف
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            قیمت با تخفیف (محاسبه خودکار)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            readOnly
            dir="ltr"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/manage")}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ManageCreate;
