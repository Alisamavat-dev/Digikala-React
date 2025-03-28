import CartList from "../../components/page/Home/CartList";
import Footer from "../../components/page/Home/Footer";
import Offer from "../../components/page/Home/Offer";
import Slider from "../../components/page/Home/Slider";
import Brands from "../../components/page/Home/Brands";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import Amazing_offer from "../../components/page/Home/Amazing_offer";
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
      <div className="mb-20">
        <Brands />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
