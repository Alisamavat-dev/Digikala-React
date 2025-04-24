import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/grid";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Slider = () => {
  const {
    data: sliderData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["sliderData"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/categury.json"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات دسته‌بندی‌ها");
      }
      return response.json();
    },
  });

  // تبدیل داده‌ها به آرایه یک بعدی برای نمایش در موبایل
  const flattenedData = sliderData?.reduce((acc, item) => {
    return [...acc, item[0], item[1]];
  }, []);

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
    <div className="w-full overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-[1260px] mx-auto">
        <div className="hidden md:block">
          <h2 className="text-center p-6 text-[20px] font-sans">
            خرید بر اساس دسته‌بندی
          </h2>
          <Swiper
            slidesPerView="auto"
            spaceBetween={8}
            className="w-full"
            breakpoints={{
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
                key={`desktop-${index}`}
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

        <div className="md:hidden">
          <h2 className="text-center p-4 text-[18px] font-sans">
            خرید بر اساس دسته‌بندی
          </h2>
          <Swiper
            modules={[Grid]}
            slidesPerView={3}
            grid={{
              rows: 3,
              fill: "row",
            }}
            spaceBetween={8}
            className="w-full"
            breakpoints={{
              480: {
                slidesPerView: 4,
                spaceBetween: 12,
                grid: {
                  rows: 3,
                  fill: "row",
                },
              },
              640: {
                slidesPerView: 5,
                spaceBetween: 16,
                grid: {
                  rows: 3,
                  fill: "row",
                },
              },
            }}
          >
            {flattenedData?.map((item, index) => (
              <SwiperSlide
                key={`mobile-${index}`}
                className="w-[80px] sm:w-[90px] p-1"
              >
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="w-full p-1 mb-0.5 rounded-lg hover:scale-105 transition-transform duration-300 object-contain"
                    src={item.image}
                    alt={item.title}
                  />
                  <p className="h-[25px] sm:h-[28px] text-center overflow-hidden text-ellipsis text-[9px] sm:text-[10px] font-medium">
                    {item.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Slider;
