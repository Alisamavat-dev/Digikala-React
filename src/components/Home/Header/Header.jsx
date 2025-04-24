import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";
import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ sdata }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openNav, setOpenNav] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { data: headerData, isLoading: isHeaderLoading } = useQuery({
    queryKey: ["headerdata"],
    queryFn: async () => {
      const response = await fetch(
        "https://amir0113.github.io/GithubApi2/db.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch header data");
      }
      return response.json();
    },
  });

  const { data: titleHeaderData, isLoading: isTitleLoading } = useQuery({
    queryKey: ["titleheaderdata"],
    queryFn: async () => {
      const response = await fetch(
        "https://67d5a8aa286fdac89bc00aa3.mockapi.io/header"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch title data");
      }
      return response.json();
    },
  });

  const { data: logoHeaderData, isLoading: isLogoLoading } = useQuery({
    queryKey: ["logoheaderdata"],
    queryFn: async () => {
      const response = await fetch(
        "https://67d5a8aa286fdac89bc00aa3.mockapi.io/story"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch logo data");
      }
      return response.json();
    },
  });

  const handleMouseEnter = (menuId) => {
    setActiveMenu(menuId);
    setOpenNav(menuId);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setOpenNav(false);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);

    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    if (!products || products.length === 0) {
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setSearchResults(filtered);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://676d71200e299dd2ddff8fef.mockapi.io/product"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }
      setProducts(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, products]);

  const NotificationBellIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 transition-transform duration-300 hover:scale-110"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const SearchIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-gray-500 transition-transform duration-300 hover:scale-110"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MenuIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 transition-transform duration-300 hover:scale-110"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M4 6h16M4 12h16M4 18h16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (isHeaderLoading || isTitleLoading || isLogoLoading) {
    return (
      <div className="flex justify-center items-center h-20 bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-6 flex-grow">
                {logoHeaderData?.map((iteml) => (
                  <Link
                    key={`logo-${iteml.id}`}
                    to="/"
                    className="hover:opacity-80 transition-opacity flex-shrink-0"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-32 h-8"
                    >
                      <img
                        src={iteml.img}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </Link>
                ))}

                <div className="relative flex-grow max-w-2xl">
                  <form className="flex">
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      placeholder="جستجو در دیجی‌کالا ..."
                      className="w-full h-11 bg-gray-100 rounded-lg pr-12 outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 border border-transparent focus:border-red-500 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() =>
                        setTimeout(() => setIsSearchFocused(false), 200)
                      }
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-500 transition-colors"
                    >
                      <SearchIcon />
                    </motion.button>
                  </form>

                  {isSearchFocused && searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto z-50">
                      {loading && (
                        <div className="flex justify-center items-center p-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        </div>
                      )}
                      {error && (
                        <div className="text-red-500 text-center p-4 text-sm">
                          <p>خطا در دریافت اطلاعات: {error}</p>
                        </div>
                      )}
                      {!loading && !error && filteredProducts.length === 0 && (
                        <div className="text-center p-4 text-gray-500 text-sm">
                          <p>محصولی با این مشخصات یافت نشد</p>
                        </div>
                      )}
                      {!loading && !error && filteredProducts.length > 0 && (
                        <div className="p-3">
                          <div className="space-y-2">
                            {filteredProducts.map((item) => (
                              <Link
                                key={item.id}
                                to={`/product/${item.id}`}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-sm"
                              >
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-14 h-14 object-contain transition-transform duration-300 hover:scale-110"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                    {item.title}
                                  </h3>
                                  {item.price && (
                                    <p className="text-red-500 font-bold mt-1 text-sm">
                                      {item.price.toLocaleString()} تومان
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 mr-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:text-red-500 transition-colors relative"
                >
                  <NotificationBellIcon />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    3
                  </motion.span>
                </motion.button>

                <div className="flex gap-2">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-300 px-3 py-1.5 text-xs rounded flex items-center gap-1 hover:bg-gray-50 transition-colors hover:border-red-500 hover:text-red-500 shadow-sm whitespace-nowrap"
                    >
                      <FaRegUser className="w-3.5 h-3.5" />
                      <span className="border-r border-gray-300 pr-2">
                        ورود
                      </span>
                    </motion.button>
                  </Link>
                  <Link to="/shopping">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-300 px-3 py-1.5 text-xs rounded flex items-center gap-1 hover:bg-gray-50 transition-colors hover:border-red-500 hover:text-red-500 shadow-sm whitespace-nowrap"
                    >
                      <TfiShoppingCart className="w-3.5 h-3.5" />
                      <span>سبد خرید</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-4">
                  {titleHeaderData?.slice(0, 6).map((itemt) => (
                    <div
                      key={`category-${itemt.id}`}
                      className="relative group"
                      onMouseEnter={() => handleMouseEnter(itemt.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center gap-1 cursor-pointer font-medium group whitespace-nowrap">
                        <img
                          className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                          src={itemt.img}
                          alt={itemt.text}
                        />
                        <span className="relative">
                          {itemt.text}
                          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                        </span>
                      </div>

                      {itemt.children && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={
                            activeMenu === itemt.id
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 15 }
                          }
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className={`absolute top-full right-0 w-[52rem] shadow-xl rounded-2xl border border-gray-100 transition-all duration-300 backdrop-blur-sm bg-white/95 ${
                            activeMenu === itemt.id
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                          }`}
                        >
                          {openNav === itemt.id && (
                            <div className="flex h-[480px] overflow-hidden">
                              <div className="w-64 bg-gray-50/80 rounded-r-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
                                {itemt.children.map((child) => (
                                  <motion.div
                                    key={child.id}
                                    className={`p-4 cursor-pointer transition-all duration-300 border-r-4 ${
                                      activeCategory === child.id
                                        ? "bg-white border-red-500 shadow-sm"
                                        : "border-transparent hover:border-red-200"
                                    }`}
                                    onMouseEnter={() =>
                                      setActiveCategory(child.id)
                                    }
                                    whileHover={{ x: 5 }}
                                  >
                                    <h2
                                      className={`font-medium ${
                                        activeCategory === child.id
                                          ? "text-red-500"
                                          : "text-gray-700 group-hover:text-red-500"
                                      } transition-colors duration-300`}
                                    >
                                      {child.title}
                                    </h2>
                                  </motion.div>
                                ))}
                              </div>

                              <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100">
                                {itemt.children.map((child) => (
                                  <motion.div
                                    key={child.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={
                                      activeCategory === child.id
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -20 }
                                    }
                                    transition={{ duration: 0.3 }}
                                    className={`${
                                      activeCategory === child.id
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  >
                                    <div className="grid grid-cols-2 gap-6">
                                      {child.childernb?.map((childb, index) => (
                                        <motion.div
                                          key={childb.id}
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{
                                            duration: 0.3,
                                            delay: index * 0.1,
                                          }}
                                          className="group"
                                        >
                                          <Link
                                            to={childb.link || "#"}
                                            className="block"
                                          >
                                            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-red-50 hover:shadow-md group-hover:scale-[1.02]">
                                              <h3 className="font-medium text-gray-800 group-hover:text-red-500 transition-colors duration-300 mb-2">
                                                {childb.title}
                                              </h3>
                                              <p className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-300">
                                                {childb.text}
                                              </p>
                                            </div>
                                          </Link>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="h-5 w-px bg-gray-300 mx-2"></div>

                <div className="flex items-center gap-4">
                  {headerData?.slice(0, 4).map((item) => (
                    <Link
                      key={`quicklink-${item.id}`}
                      to={item.link}
                      className="flex items-center gap-1 text-sm hover:text-red-500 transition-colors whitespace-nowrap"
                    >
                      <img className="w-4 h-3" src={item.img} alt={item.text} />
                      <span className="relative after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full">
                        {item.text}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="text-sm font-bold">
                <span className="hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap">
                  ارسال به تهران،تهران
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Header */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col gap-3">
            {/* Top Section */}
            <div className="flex items-center justify-between gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MenuIcon />
              </motion.button>

              {logoHeaderData?.map((iteml) => (
                <Link
                  key={`logo-${iteml.id}`}
                  to="/"
                  className="hover:opacity-80 transition-opacity"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-6 sm:w-32 sm:h-8"
                  >
                    <img
                      src={iteml.img}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </Link>
              ))}

              <div className="flex items-center gap-2">
                <Link to="/shopping">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <TfiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaRegUser className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <form className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <IoSearch className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="جستجو در دیجی‌کالا ..."
                  className="w-full bg-transparent pr-2 outline-none text-sm placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                />
              </form>

              {isSearchFocused && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto z-50"
                >
                  {loading && (
                    <div className="flex justify-center items-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                  )}
                  {error && (
                    <div className="text-red-500 text-center p-4 text-sm">
                      <p>خطا در دریافت اطلاعات: {error}</p>
                    </div>
                  )}
                  {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center p-4 text-gray-500 text-sm">
                      <p>محصولی با این مشخصات یافت نشد</p>
                    </div>
                  )}
                  {!loading && !error && filteredProducts.length > 0 && (
                    <div className="p-3">
                      <div className="space-y-2">
                        {filteredProducts.map((item) => (
                          <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all duration-300"
                          >
                            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                {item.title}
                              </h3>
                              {item.price && (
                                <p className="text-red-500 font-bold mt-1 text-xs">
                                  {item.price.toLocaleString()} تومان
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 bg-white rounded-lg overflow-hidden"
              >
                <div className="space-y-4 p-4">
                  {/* Quick Links */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {headerData?.map((item) => (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                      >
                        <img
                          className="w-4 h-3"
                          src={item.img}
                          alt={item.text}
                        />
                        <span>{item.text}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Categories */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-sm mb-3">دسته‌بندی‌ها</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {titleHeaderData?.map((itemt) => (
                        <div
                          key={itemt.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <img
                            className="w-4 h-4"
                            src={itemt.img}
                            alt={itemt.text}
                          />
                          <span className="text-sm">{itemt.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Header;
