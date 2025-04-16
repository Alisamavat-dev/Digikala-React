import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TomanIcon from "../../components/Home/Common/TomanIcon";
import { FaRegHeart, FaHeart, FaShare, FaStar } from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isPending,
    isError,
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

  const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: async () => {
      const cartItem = {
        productId: product.id,
        title: product.title,
        price: Number(product.realPrice),
        discountedPrice: Number(product.price),
        image: product.imageUrl,
        quantity: Number(quantity),
      };

      const response = await fetch(
        "https://67f518d0913986b16fa337be.mockapi.io/Shopping",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در افزودن به سبد خرید");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-cart"] });
    },
  });

  const handleAddToCartAndNavigate = async () => {
    try {
      await addToCart(undefined, {
        onSuccess: () => {
          navigate("/cart");
        },
      });
    } catch (error) {
      console.error("خطا در افزودن به سبد خرید:", error);
    }
  };

  const handleAddToCart = () => {
    addToCart();
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <div className="text-gray-800">{error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center bg-gray-50 rounded-2xl p-8 overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="max-h-[450px] object-contain transition-all duration-300 hover:scale-105"
                />
              </motion.div>
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3].map((index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100"
                  >
                    <img
                      src={product.imageUrl}
                      alt={`Thumbnail ${index}`}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl font-bold text-gray-800"
                >
                  {product.title}
                </motion.h1>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  >
                    {isFavorite ? (
                      <FaHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-6 h-6 text-gray-500" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  >
                    <FaShare className="w-6 h-6 text-gray-500" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <FaStar
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.reviews} نظر
                </span>
              </div>

              <div className="space-y-3 bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-red-600 text-white text-sm font-medium rounded-full px-4 py-2"
                  >
                    {product.discount}% تخفیف
                  </motion.span>
                  <div className="flex items-center gap-2">
                    <TomanIcon className="w-5 h-5" />
                    <span className="text-2xl font-bold text-gray-800">
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through text-lg">
                    {product.realPrice.toLocaleString()}
                  </span>
                  <TomanIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-6 bg-gray-50 p-6 rounded-2xl">
                <span className="text-gray-700 font-medium">تعداد:</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-xl hover:bg-white hover:border-red-500 hover:text-red-500 transition-all duration-200"
                  >
                    -
                  </motion.button>
                  <span className="w-16 text-center text-lg font-medium">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-xl hover:bg-white hover:border-red-500 hover:text-red-500 transition-all duration-200"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-800">
                  توضیحات محصول
                </h2>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {product.description || "توضیحات محصول در دسترس نیست."}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-red-200"
                >
                  {isAddingToCart ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      <TfiShoppingCart className="w-6 h-6" />
                      <span className="text-lg">افزودن به سبد خرید</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCartAndNavigate}
                  disabled={isAddingToCart}
                  className="w-full border-2 border-red-500 text-red-500 py-4 rounded-xl hover:bg-red-50 transition-all duration-300 text-lg disabled:opacity-50"
                >
                  خرید این محصول
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
