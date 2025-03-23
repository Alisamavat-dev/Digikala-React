import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Swiper = ({ children, menuButton }) => {
  return (
    <SwiperComponent
      modules={[Navigation]}
      slidesPerView="auto"
      navigation
      className="!py-4"
    >
      {children}
      {menuButton && (
        <SwiperSlide className="!w-auto">{menuButton}</SwiperSlide>
      )}
    </SwiperComponent>
  );
};

export default Swiper;
