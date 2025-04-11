import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const Shoping = () => {
  const {
    data: shopping,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["shopping"],
    queryFn: async () => {
      const response = await fetch(
        "https://amir0113.github.io/gitapi5/db.json"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات برندها");
      }
      return response.json();
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <AiOutlineLoading3Quarters
          size={44}
          className="animate-spin text-red-500"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1350px] mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 p-4">
          {shopping?.map((item, index) => (
            <div
              key={item.id}
              className={`group p-4 hover:bg-gray-50 transition-colors duration-300 ${
                index % 2 === 0 && index !== shopping.length - 1
                  ? "sm:border-r-2 sm:border-gray-200"
                  : ""
              } ${index < shopping.length - 2 ? " lg:border-gray-200" : ""}`}
            >
              <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-red-500 transition-colors">
                {item.title}
              </h2>
              {item.p && (
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                  {item.p}
                </p>
              )}
              <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
                {item.image?.[0] && (
                  <>
                    <div className="relative overflow-hidden rounded-lg aspect-square border border-gray-200">
                      <img
                        src={item.image[0].img1}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-lg aspect-square border border-gray-200">
                      <img
                        src={item.image[0].img2}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-lg aspect-square border border-gray-200">
                      <img
                        src={item.image[0].img3}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-lg aspect-square border border-gray-200">
                      <img
                        src={item.image[0].img4}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shoping;
