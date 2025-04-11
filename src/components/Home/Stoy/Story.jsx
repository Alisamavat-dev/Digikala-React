import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Videoj from "../Videoj/Videoj";
import { useCallback, useState } from "react";

const Story = ({ nav = false, pag = false, space = 10, videosetter }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const {
    data: storyData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["storydata"],
    queryFn: async () => {
      const response = await fetch(
        "https://676d71200e299dd2ddff8fef.mockapi.io/story"
      );
      if (!response.ok) throw new Error("Failed to fetch stories");
      return response.json();
    },
  });

  const handleStoryClick = useCallback(
    (story) => {
      if (story.video) {
        setSelectedVideo(story.video);
        videosetter(true);
      }
    },
    [videosetter]
  );

  const handleCloseVideo = useCallback(() => {
    setSelectedVideo(null);
    videosetter(false);
  }, [videosetter]);

  if (isPending) {
    return (
      <div className="w-full h-48 flex justify-center items-center bg-gray-50 rounded-xl">
        <AiOutlineLoading3Quarters
          size={32}
          className="animate-spin text-black-600 opacity-80"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-48 flex flex-col justify-center items-center space-y-2 bg-gray-50 rounded-xl">
        <svg
          className="w-10 h-10 text-rose-400"
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
        <p className="text-gray-600 text-center px-4 text-sm font-medium max-w-md">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          navigation={nav}
          pagination={pag}
          slidesPerView="auto"
          spaceBetween={space}
          breakpoints={{
            320: { slidesPerView: 4.5 },
            480: { slidesPerView: 5.5 },
            640: { slidesPerView: 6.5 },
            768: { slidesPerView: 7.5 },
            900: { slidesPerView: 8.5 },
            1024: { slidesPerView: 9.5 },
            1200: { slidesPerView: 11.5 },
            1400: { slidesPerView: 13.5 },
          }}
        >
          {storyData?.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto">
              <div
                onClick={() => handleStoryClick(item)}
                className="group w-[80px] h-[140px] flex flex-col items-center justify-start cursor-pointer"
              >
                <div className="relative">
                  <div className="relative w-[72px] h-[72px] rounded-full p-[2px] shadow-sm border border-red-500">
                    <div className="w-full h-full rounded-full p-[2px] overflow-hidden">
                      <img
                        className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-[0.96]"
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full px-1 mt-1">
                  <h3 className="text-center text-[11px] font-medium text-gray-700 line-clamp-2 transition-colors duration-300 group-hover:text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Videoj
        videos={!!selectedVideo}
        videosetter={handleCloseVideo}
        videoUrl={selectedVideo}
      />
    </>
  );
};

export default Story;
