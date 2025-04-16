import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { SiAparat } from "react-icons/si";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    data: readings,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const response = await fetch(
        "https://ali-samavat.github.io/API/footer.json"
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات مقالات");
      }
      return response.json();
    },
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const mobileMenuItems = [
    {
      to: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M20 18.172v-6.586l1.293 1.293 1.414-1.415-8.586-8.585a3 3 0 00-4.242 0l-8.586 8.585 1.414 1.415L4 11.586v6.586a3 3 0 003 3h10a3 3 0 003-3zm-14 0V9.586l5.293-5.293a1 1 0 011.414 0L18 9.586v8.586a1 1 0 01-1 1H7a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: "خانه",
    },
    {
      to: "/category",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M10 2H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zM4 9V4h5v5H4zm17 4a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1h7zm-3.5-2a4.5 4.5 0 110-9 4.5 4.5 0 010 9zM20 6.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM6.5 22a4.5 4.5 0 110-9 4.5 4.5 0 010 9zM9 17.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm6 2.5v-5h5v5h-5z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: "دسته بندی",
    },
    {
      to: "/shopping",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M20 4h2V2h-3a1 1 0 00-1 1v1H3a1 1 0 00-.995 1.1l1 10A1 1 0 004 16h15a1 1 0 001-1V4zm-2 17a2 2 0 110-4 2 2 0 010 4zM5 21a2 2 0 110-4 2 2 0 010 4zm13-7V6H4.105l.8 8H18z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: "سبد خرید",
    },
    {
      to: "/Login",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2a5 5 0 015 5v1A5 5 0 017 8V7a5 5 0 015-5zm9.996 18.908C21.572 16.318 18.096 14 12 14c-6.095 0-9.572 2.318-9.996 6.908A1 1 0 003 22h18a1 1 0 00.996-1.092zM4.188 20c.728-2.677 3.231-4 7.812-4 4.58 0 7.084 1.323 7.812 4H4.188zM9 7a3 3 0 116 0v1a3 3 0 01-6 0V7z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: "دیجیکالا من",
    },
  ];

  if (isPending) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <AiOutlineLoading3Quarters size={44} className="text-red-500" />
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-lg bg-red-50 p-4 rounded-lg shadow-md"
        >
          Error: {error.message}
        </motion.p>
      </div>
    );
  }

  return (
    <>
      <footer className="md:hidden fixed bottom-0 w-full">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="flex justify-around w-full bg-white h-16 border-t-2 border-gray-100 shadow-lg z-[1000]"
        >
          {mobileMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="group flex flex-col items-center justify-center transition-all duration-300 hover:text-red-500"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center justify-center"
              >
                {item.icon}
                <span className="text-xs mt-1 group-hover:text-red-500">
                  {item.text}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </footer>

      <footer className="from-gray-50 to-white hidden md:block">
        <div className="max-w-[1500px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <img
              src={readings?.[0]?.logo}
              className="w-52 hover:opacity-90 transition-opacity"
              alt="logo"
            />
          </motion.div>

          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-600 ml-2">
                  {readings?.[0]?.phone}
                </span>
              </div>
              <div className="text-gray-400">|</div>
              <span className="text-gray-600">
                ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="text-gray-600 hover:text-red-500 transition-colors duration-300"
              >
                تماس با پشتیبانی
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-8 py-12">
            {[
              {
                icon: "https://www.digikala.com/statics/img/svg/footer/express-delivery.svg",
                text: "امکان تحویل اکسپرس",
              },
              {
                icon: "https://www.digikala.com/statics/img/svg/footer/cash-on-delivery.svg",
                text: "امکان پرداخت در محل",
              },
              {
                icon: "https://www.digikala.com/statics/img/svg/footer/support.svg",
                text: "۷ روز هفته، ۲۴ ساعته",
              },
              {
                icon: "https://www.digikala.com/statics/img/svg/footer/days-return.svg",
                text: "هفت روز ضمانت بازگشت",
              },
              {
                icon: "https://www.digikala.com/statics/img/svg/footer/original-products.svg",
                text: "ضمانت اصل بودن کالا",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <motion.img
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  src={feature.icon}
                  alt={feature.text}
                  className="w-12 h-12 mb-3"
                />
                <p className="text-sm text-gray-600 text-center font-medium">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-8 py-8 border-t border-gray-200">
            <div className="space-y-4">
              <h5 className="font-bold text-gray-700">با دیجی‌کالا</h5>
              <ul className="space-y-2">
                {[
                  "اتاق خبر دیجی‌کالا",
                  "فروش در دیجی‌کالا",
                  "فرصت‌های شغلی",
                  "گزارش تخلف",
                  "تماس با ما",
                  "درباره ما",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="transition-colors duration-300"
                  >
                    <Link
                      to={readings?.[0]?.link}
                      className="text-gray-500 hover:text-red-500 text-sm"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-gray-700">خدمات مشتریان</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    پاسخ به پرسش های متداول
                  </Link>
                </li>
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    رویه های بازگرداندن کالا
                  </Link>
                </li>
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    شرایط استفاده
                  </Link>
                </li>
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    حریم خصوصی
                  </Link>
                </li>
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    گزارش باگ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-gray-700">
                راهنمای خرید از دیجی‌کالا
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    نحوه ثبت سفارش
                  </Link>
                </li>
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    رویه ارسال سفارش
                  </Link>
                </li>
                <li>
                  <Link
                    to={readings?.[0]?.link}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    شیوه پرداخت
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-gray-700">همراه ما باشید!</h5>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  <FaTwitter size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  <FaLinkedin size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  <SiAparat size={24} />
                </motion.a>
              </div>

              <div className="mt-6">
                <h6 className="text-gray-700 font-medium mb-3">
                  با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید
                </h6>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل شما"
                    className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:outline-none focus:border-red-500 transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`px-6 py-2 bg-red-500 text-white rounded-l-lg transition-all duration-300 ${
                      isHovered ? "bg-red-600 shadow-lg" : ""
                    }`}
                  >
                    ثبت
                  </button>
                </form>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-sm mt-2"
                  >
                    ایمیل شما با موفقیت ثبت شد!
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 my-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  className="w-12 h-12"
                  src="https://www.digikala.com/statics/img/png/footerlogo2.webp"
                  alt="digikala"
                />
                <h2 className="text-white font-bold mr-4">
                  دانلود اپلیکیشن دیجی‌کالا
                </h2>
              </div>
              <div className="flex space-x-4">
                {[
                  {
                    src: "https://www.digikala.com/statics/img/svg/appStores/coffe-bazzar.svg",
                    alt: "Bazaar",
                  },
                  {
                    src: "https://www.digikala.com/statics/img/svg/appStores/myket.svg",
                    alt: "Myket",
                  },
                  {
                    src: "https://www.digikala.com/statics/img/svg/appStores/sib-app.svg",
                    alt: "Sib App",
                  },
                ].map((store, index) => (
                  <motion.img
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    src={store.src}
                    alt={store.alt}
                    className="h-10 cursor-pointer ml-4"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              کلیه حقوق این سایت متعلق به شرکت نوآوران فن آوازه (دیجی‌کالا)
              می‌باشد.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
