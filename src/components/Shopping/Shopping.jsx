import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrashAlt, FaShoppingCart, FaStore } from "react-icons/fa";
import Footer from "../Home/Footer/Footer";
import Header from "../Home/Header/Header";

const Shopping = () => {
  const queryClient = useQueryClient();

  const {
    data: cart = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["shopping-cart"],
    queryFn: async () => {
      const response = await fetch(
        "https://67f518d0913986b16fa337be.mockapi.io/Shopping"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات سبد خرید");
      }
      const data = await response.json();
      return data;
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await fetch(
        `https://67f518d0913986b16fa337be.mockapi.io/Shopping/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("خطا در حذف محصول");
      }
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const currentItem = cart.find((item) => item.id === productId);

      const response = await fetch(
        `https://67f518d0913986b16fa337be.mockapi.io/Shopping/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...currentItem,
            quantity: quantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("خطا در بروزرسانی تعداد");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const finalPrice = Number(item.discountedPrice);
      const quantity = Number(item.quantity) || 0;
      const itemTotal = finalPrice * quantity;
      return total + itemTotal;
    }, 0);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative">
            <AiOutlineLoading3Quarters
              size={44}
              className="animate-spin text-primary"
            />
            <div className="mt-4 text-gray-600">
              در حال بارگذاری سبد خرید...
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-red-500 text-xl mb-4">
            خطا در بارگذاری سبد خرید
          </div>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center h-[60vh] p-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
            <FaShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              سبد خرید شما خالی است
            </h2>
            <p className="text-gray-600 mb-8">
              می‌توانید با مراجعه به فروشگاه، محصولات مورد نظر خود را به سبد
              خرید اضافه کنید.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              <FaStore className="w-5 h-5" />
              <span>رفتن به فروشگاه</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaShoppingCart className="text-primary" />
            سبد خرید شما
          </h1>
          <div className="text-gray-600">{totalItems} کالا</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-6 mb-4 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-800 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => removeFromCartMutation.mutate(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                      disabled={removeFromCartMutation.isPending}
                    >
                      <FaTrashAlt className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">
                          {Number(item.price).toLocaleString()} تومان
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-lg">
                          {Number(item.discountedPrice).toLocaleString()} تومان
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                      <button
                        onClick={() =>
                          updateQuantityMutation.mutate({
                            productId: item.id,
                            quantity: (item.quantity || 0) + 1,
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                        disabled={updateQuantityMutation.isPending}
                      >
                        +
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity || 0}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantityMutation.mutate({
                            productId: item.id,
                            quantity: Math.max(1, (item.quantity || 0) - 1),
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white rounded-lg transition-all"
                        disabled={updateQuantityMutation.isPending}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4 transition-all duration-300 ease-in-out transform hover:shadow-md">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                <span>خلاصه سفارش</span>
                <span className="text-sm font-normal text-gray-500">
                  ({totalItems} کالا)
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>قیمت کالاها:</span>
                  <span className="font-medium">
                    {calculateTotal().toLocaleString()} تومان
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span>تخفیف کالاها:</span>
                  <span className="font-medium text-red-500">
                    {cart
                      .reduce(
                        (total, item) =>
                          total +
                          (Number(item.price) - Number(item.discountedPrice)) *
                            (item.quantity || 0),
                        0
                      )
                      .toLocaleString()}{" "}
                    تومان
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">
                      مبلغ قابل پرداخت:
                    </span>
                    <span className="font-bold text-primary text-xl">
                      {calculateTotal().toLocaleString()} تومان
                    </span>
                  </div>
                </div>

                <button
                  className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-4"
                  disabled={
                    updateQuantityMutation.isPending ||
                    removeFromCartMutation.isPending
                  }
                >
                  <span>ادامه فرآیند خرید</span>
                  <FaShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shopping;
