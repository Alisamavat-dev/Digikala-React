import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TomanIcon from "../../components/Home/Common/TomanIcon";
import { FaRegHeart, FaHeart, FaShare, FaStar } from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(
        `https://676d71200e299dd2ddff8fef.mockapi.io/product/${id}`
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات محصول");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="max-h-[400px] object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <img
                    src={product.imageUrl}
                    alt="Thumbnail"
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <img
                    src={product.imageUrl}
                    alt="Thumbnail"
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <img
                    src={product.imageUrl}
                    alt="Thumbnail"
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-800">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {isFavorite ? (
                      <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaShare className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews} نظر)
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white text-sm rounded-full px-3 py-1">
                    {product.discount}% تخفیف
                  </span>
                  <div className="flex items-center gap-1">
                    <TomanIcon className="w-4 h-4" />
                    <span className="text-xl font-bold text-gray-800">
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 line-through">
                    {product.realPrice.toLocaleString()}
                  </span>
                  <TomanIcon className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-700">تعداد:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  توضیحات محصول
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "توضیحات محصول در دسترس نیست."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2">
                  <TfiShoppingCart className="w-5 h-5" />
                  <span>افزودن به سبد خرید</span>
                </button>
                <button className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  خرید این محصول
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

export default ProductDetails;
