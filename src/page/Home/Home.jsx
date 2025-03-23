import CartList from "../../components/page/Home/CartList";
import Footer from "../../components/page/Home/Footer";
import Offer from "../../components/page/Home/Offer";
import Slider from "../../components/page/Home/Slider";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto">
        <CartList />
      </div>
      <div className="container mx-auto p-4">
        <Offer />
      </div>
      <div className="mb-20 flex justify-center items-center">
        <Slider />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;