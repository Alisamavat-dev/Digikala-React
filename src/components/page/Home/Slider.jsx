import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";

const Slider = () => {
  const {
    data: sliderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sliderData"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/categury.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
    <div className="w-full overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-[1260px] mx-auto">
        <Swiper
          slidesPerView="auto"
          spaceBetween={8}
          className="w-full"
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 8,
              grid: {
                rows: 3,
                fill: "row",
              },
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 28,
            },
          }}
        >
          {sliderData?.map((swiper, index) => (
            <SwiperSlide
              key={index}
              className="w-[80px] sm:w-[90px] md:w-[100px] lg:w-[110px] xl:w-[120px] p-1"
            >
              <div className="flex flex-col items-center justify-center mb-1.5 sm:mb-2">
                <img
                  className="w-full p-1 mb-0.5 rounded-lg hover:scale-105 transition-transform duration-300 object-contain"
                  src={swiper[0].image}
                  alt={swiper[0].title}
                />
                <p className="h-[25px] sm:h-[28px] text-center overflow-hidden text-ellipsis text-[9px] sm:text-[10px] font-medium">
                  {swiper[0].title}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  className="w-full p-1 mb-0.5 rounded-lg hover:scale-105 transition-transform duration-300 object-contain"
                  src={swiper[1].image}
                  alt={swiper[1].title}
                />
                <p className="h-[25px] sm:h-[28px] text-center overflow-hidden text-ellipsis text-[9px] sm:text-[10px] font-medium">
                  {swiper[1].title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
