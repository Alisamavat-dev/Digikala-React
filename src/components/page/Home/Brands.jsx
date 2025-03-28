import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

const Brands = () => {
  const {
    data: brands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/Brands.json"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات برندها");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-32 text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="w-full py-4 relative px-4 md:px-6 lg:px-8 max-w-[1300px] mx-auto border-2 border-gray-200 rounded-2xl">
      <div>
        <h2 className="font-bold flex justify-center text-xl mb-5 ">
          <img src="../../../../public/svgexport-21.svg" alt="" />
          محبوب‌ترین برنده ها
        </h2>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={8}
        className="w-full"
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 9,
            spaceBetween: 28,
          },
        }}
      >
        {brands?.map((brand) => (
          <SwiperSlide className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[90px] xl:w-[100px] border-l border-gray-200 border-h-1 ">
            <div className="flex flex-col items-center justify-center p-2 pl-4">
              <img
                className="h-30 rounded-lg hover:scale-105 transition-transform duration-300 object-contain bg-white"
                src={brand.img}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
