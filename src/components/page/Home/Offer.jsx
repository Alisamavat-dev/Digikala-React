import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Offer = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["offer"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/after.json"
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
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-[1240px] w-full">
          {data?.map((item, index) => (
            <div
              key={index}
              className="w-full aspect-[4/3] sm:aspect-[3/4] md:aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-full h-full">
                <img
                  src={item.img}
                  className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;
