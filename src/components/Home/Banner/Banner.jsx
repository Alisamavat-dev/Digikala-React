import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation as CustomNavigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Banner = ({ nav = true, pag = true, view = 1, space = 0 }) => {
  const [bandata, setBandata] = useState([]);

  const { data, error, isFetching } = useQuery({
    queryKey: ["fetchBannerData"],
    queryFn: async () => {
      const response = await fetch(
        "https://amir0113.github.io/GitHub-Api-4/db.json"
      );
      return await response.json();
    },
  });

  useEffect(() => {
    if (data) {
      setBandata(data);
    }
  }, [data]);

  if (error) {
    return (
      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto text-rose-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="mt-2 text-gray-600">خطا در دریافت اطلاعات</p>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center bg-gray-50 rounded-xl">
        <AiOutlineLoading3Quarters
          size={32}
          className="animate-spin text-black-600 opacity-80"
        />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-3 sm:px-5 lg:px-7">
      {bandata && (
        <Swiper
          modules={[CustomNavigation, Pagination, Scrollbar, Autoplay, A11y]}
          navigation={nav}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          slidesPerView={view}
          spaceBetween={space}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {bandata.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px]">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={item.img}
                  alt={item.title || "بنر دیجی‌کالا"}
                  loading="lazy"
                />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
                    <h3 className="text-white text-lg md:text-xl font-medium">
                      {item.title}
                    </h3>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;
