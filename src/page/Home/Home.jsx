import CartList from "../../components/page/Home/CartList";
import Footer from "../../components/page/Home/Footer";
import Offer from "../../components/page/Home/Offer";
import Slider from "../../components/page/Home/Slider";
import Brands from "../../components/page/Home/Brands";
import Amazing_offer from "../../components/page/Home/Amazing_offer";
import Blog from "../../components/page/Home/Blog";

import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["Home"],
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
    <div>
      <div className="container mx-auto">
        <CartList />
      </div>
      <div>
        <Amazing_offer />
      </div>
      <div className="container mx-auto p-4">
        <Offer />
      </div>
      <div className=" flex justify-center items-center">
        <Slider />
      </div>
      <div className="">
        <Brands />
      </div>
      <div className="container mx-auto mb-20 md:mb-5">
        <Blog />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
