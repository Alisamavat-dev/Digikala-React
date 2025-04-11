import { useEffect, useState } from "react";
import Story from "../../components/Home/Stoy/Story";
import Videoj from "../../components/Home/Videoj/Videoj";
import Blog from "../../components/Home/Blog/Blog";
import CartList from "../../components/Home/CartList/CartList";
import Slider from "../../components/Home/Slider/Slider";
import Brands from "../../components/Home/Brands/Brands";
import Footer from "../../components/Home/Footer/Footer";
import AmazingOffer from "../../components/Home/Amazing/Amazing";
import Banner from "../../components/Home/Banner/Banner";
import Header from "../../components/Home/Header/Header"
import Shoping from "../../components/Home/Shoping/Shoping";

const Home = () => {
  const [showContent, setShowContent] = useState(true);
  const [vstory, setvstory] = useState();

  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-100">
    <Header/>
    </div>
    <div className="relative md:mt-30 mt-17">
      <div className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <Story space={window.innerWidth >= 600 ? 7 : 2} videosetter={setvstory} />
        <Videoj videos={vstory} videosetter={setvstory} 
       />
        </div>
    </div>
      <div>
        <Banner nav={true}/>
      </div>
      <div>
        <div className="container mx-auto flex justify-center">
          <CartList />
        </div>
        <div>
          <AmazingOffer />
        </div>
        <div className="flex justify-center items-center">
          <Slider />
        </div>
        <div className="">
          <Brands />
        </div>
        <div>
          <Shoping/>
        </div>
        <div className="container mx-auto mb-20 md:mb-5">
          <Blog />
        </div>
        <div className="fixed md:relative bottom-0 left-0 right-0 z-50">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
