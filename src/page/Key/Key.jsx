import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

import Key from "../../components/page/Key/Key";

const Key = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["Key"],
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
      <Key/>
    </div>
  );
};

export default Key;
