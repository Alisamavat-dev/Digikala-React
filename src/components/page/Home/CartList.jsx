import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TfiMoreAlt } from "react-icons/tfi";
import Cart from "../../Cart/Cart";
import Modal from "../../Modal/Modal";
import { useState } from "react";

const CartList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/swiper.json"
      );
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
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex flex-nowrap gap-1.5 sm:gap-2">
          {data?.map((item) => (
            <div key={item.id} className="flex-none">
              <Cart image={item.image} title={item.title} size="sm" />
            </div>
          ))}
        </div>
        <div className="flex-none relative ml-1.5 sm:ml-2 mb-2.5 sm:mb-4.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br bg-gray-200 text-gray-400 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <TfiMoreAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] text-gray-600 shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            بیشتر
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-2 sm:p-3">
          <h2 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-gray-800 border-b border-gray-200 pb-1.5 sm:pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.22 12.704a.966.966 0 01.194-1.405l1.61-1.126a.971.971 0 011.294.172A8.826 8.826 0 0012 13.413a8.825 8.825 0 006.682-3.068.971.971 0 011.295-.172l1.609 1.126a.965.965 0 01.194 1.405A12.72 12.72 0 0112 17.3a12.72 12.72 0 01-9.78-4.597z" />
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
