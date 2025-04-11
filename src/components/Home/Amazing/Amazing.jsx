import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TomanIcon = ({ className = "w-3 h-3" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 14 14"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.057 1.742L3.821 1l.78.75-.776.741-.768-.749zm3.23 2.48c0 .622-.16 1.111-.478 1.467-.201.221-.462.39-.783.505a3.251 3.251 0 01-1.083.163h-.555c-.421 0-.801-.074-1.139-.223a2.045 2.045 0 01-.9-.738A2.238 2.238 0 011 4.148c0-.059.001-.117.004-.176.03-.55.204-1.158.525-1.827l1.095.484c-.257.532-.397 1-.419 1.403-.002.04-.004.08-.004.12 0 .252.055.458.166.618a.887.887 0 00.5.354c.085.028.178.048.278.06.079.01.16.014.243.014h.555c.458 0 .769-.081.933-.244.14-.139.21-.383.21-.731V2.02h1.2v2.202zm5.433 3.184l-.72-.7.709-.706.735.707-.724.7zm-2.856.308c.542 0 .973.19 1.293.569.297.346.445.777.445 1.293v.364h.18v-.004h.41c.221 0 .377-.028.467-.084.093-.055.14-.14.14-.258v-.069c.004-.243.017-1.044 0-1.115L13 8.05v1.574a1.4 1.4 0 01-.287.863c-.306.405-.804.607-1.495.607h-.627c-.061.733-.434 1.257-1.117 1.573-.267.122-.58.21-.937.265a5.845 5.845 0 01-.914.067v-1.159c.612 0 1.072-.082 1.38-.247.25-.132.376-.298.376-.499h-.515c-.436 0-.807-.113-1.113-.339-.367-.273-.55-.667-.55-1.18 0-.488.122-.901.367-1.24.296-.415.728-.622 1.296-.622zm.533 2.226v-.364c0-.217-.048-.389-.143-.516a.464.464 0 00-.39-.187.478.478 0 00-.396.187.705.705 0 00-.136.449.65.65 0 00.003.067c.008.125.066.22.177.283.093.054.21.08.352.08h.533zM9.5 6.707l.72.7.724-.7L10.209 6l-.709.707zm-6.694 4.888h.03c.433-.01.745-.106.937-.29.024.012.065.035.12.068l.074.039.081.042c.135.073.261.133.379.18.345.146.67.22.977.22a1.216 1.216 0 00.87-.34c.3-.285.449-.714.449-1.286a2.19 2.19 0 00-.335-1.145c-.299-.457-.732-.685-1.3-.685-.502 0-.916.192-1.242.575-.113.132-.21.284-.294.456-.032.062-.06.125-.084.191a.504.504 0 00-.03.078 1.67 1.67 0 00-.022.06c-.103.309-.171.485-.205.53-.072.09-.214.14-.427.147-.123-.005-.209-.03-.256-.076-.057-.054-.085-.153-.085-.297V7l-1.201-.5v3.562c0 .261.048.496.143.703.071.158.168.296.29.413.123.118.266.211.43.28.198.084.42.13.665.136v.001h.036zm2.752-1.014a.778.778 0 00.044-.353.868.868 0 00-.165-.47c-.1-.134-.217-.201-.35-.201-.18 0-.33.103-.447.31-.042.071-.08.158-.114.262a2.434 2.434 0 00-.04.12l-.015.053-.015.046c.142.118.323.216.544.293.18.062.325.092.433.092.044 0 .086-.05.125-.152z"
      clipRule="evenodd"
    />
  </svg>
);

const AmazingOffer = () => {

  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["amazing_offers"],
    queryFn: async () => {
      const response = await fetch(
        "https://676d71200e299dd2ddff8fef.mockapi.io/product"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات تخفیف های شگفت انگیز");
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
    <div className="w-full py-1 px-1 sm:px-3 mx-auto">
      <div className="bg-gradient-to-r bg-[#ef4a5a] rounded-xl shadow-md pt-2 sm:pt-4 pb-2 sm:pb-4 max-w-[1230px] mx-auto h-[220px] sm:h-[260px]">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={4}
          className="w-full"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            375: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 4,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 4,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 4,
            },
          }}
        >
          <SwiperSlide className="!w-[120px] sm:!w-[150px]">
            <div className="p-1 sm:p-1.5 shadow-md h-[200px] sm:h-[225px] flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center">
                <img
                  src="https://uploadkon.ir/uploads/a85309_25شگفت-انگیز.svg"
                  alt="شگفت انگیز"
                  className="h-[100px] w-[100px]"
                />
                <img src="https://uploadkon.ir/uploads/180e09_25شگفت-انگیز-1.svg" alt="شگفت انگیز 1" />
                <h2 className="text-white text-[14px] sm:text-[16px] font-bold">
                  مشاهده همه
                </h2>
              </div>
            </div>
          </SwiperSlide>
          {products?.map((product, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <Link to={`/product/${product.id}`} className="block">
                <div className="bg-white p-1 sm:p-1.5 shadow-sm hover:shadow-md transition-all duration-200 group max-w-[140px] sm:max-w-[170px] h-[200px] sm:h-[225px] flex flex-col cursor-pointer">
                  <div className="relative overflow-hidden flex-1 flex items-center justify-center">
                    <img
                      className="w-[120px] sm:w-[150px] h-[90px] sm:h-[110px] object-contain transition-transform duration-300 group-hover:scale-110"
                      src={product.imageUrl}
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h2 className="text-[10px] sm:text-[11px] font-sans text-gray-800 mt-1 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                      {product.title}
                    </h2>
                    <div className="mt-1">
                      <div className="flex items-center gap-1">
                        <span className="bg-red-600 text-white text-[9px] sm:text-[10px] rounded-full px-1 sm:px-1.5 py-0.5 shadow-sm">
                          {product.discount}%
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-0.5">
                            <TomanIcon className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                            <span className="text-[10px] sm:text-xs font-semibold">
                              {product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <span className="text-[8px] sm:text-[9px] text-gray-400 line-through">
                              {product.realPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AmazingOffer;
