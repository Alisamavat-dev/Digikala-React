import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TfiMoreAlt } from "react-icons/tfi";
import Cart from "../Cart/Cart";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y } from "swiper/modules";

const CartList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/swiper.json"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات لیست سبد خرید");
      }
      return response.json();
    },
  });

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

  return (
    <div className="container mx-auto">
      <div className="relative flex justify-center items-center">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={8}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          className=" w-full max-w-7xl"
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto flex justify-center">
              <Cart image={item.image} title={item.title} size="sm" />
            </SwiperSlide>
          ))}
          <SwiperSlide className="!w-auto flex justify-center sm:mt-3 md:mt-10 mt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <TfiMoreAlt className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </SwiperSlide>
        </Swiper>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-2 sm:p-3">
          <h2 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-gray-800 border-b border-gray-200 pb-1.5 sm:pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 6v6l4 2" />
            </svg>
            خدمات دیجی‌کالا
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-1.5">
            {data?.map((item) => (
              <Cart
                key={item.id}
                image={item.image}
                title={item.title}
                size="sm"
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartList;
