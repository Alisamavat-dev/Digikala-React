import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { TfiShoppingCart } from "react-icons/tfi";
import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

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

  if (isHeaderLoading || isTitleLoading || isLogoLoading) {
    return (
      <div className="flex justify-center items-center h-20 bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="hidden lg:block">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  {logoHeaderData?.map((iteml) => (
                    <Link
                      key={`logo-${iteml.id}`}
                      to="/"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <div className="w-40 h-8">
                        <img
                          src={iteml.img}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </Link>
                  ))}

                  <div className="relative flex-1 max-w-3xl">
                    <form className="flex">
                      <input
                        type="text"
                        placeholder="جستجو در دیجی‌کالا ..."
                        className="w-[40rem] h-11 bg-gray-200 rounded-lg pr-12 outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 border border-gray-300 focus:border-red-500 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() =>
                          setTimeout(() => setIsSearchFocused(false), 200)
                        }
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-500 transition-colors"
                      >
                        <IoSearch className="w-5 h-5 text-gray-500" />
                      </button>
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
                        {!loading &&
                          !error &&
                          filteredProducts.length === 0 && (
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

                <div className="flex items-center gap-4">
                  <button className="p-2 hover:text-red-500 transition-colors relative">
                    <IoMdNotificationsOutline className="w-5 h-5" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </button>

                  <div className="flex gap-2">
                    <Link to="/login">
                      <button className="border border-gray-300 px-3 py-1.5 text-xs rounded flex items-center gap-1 hover:bg-gray-50 transition-colors hover:border-red-500 hover:text-red-500">
                        <FaRegUser className="w-3.5 h-3.5" />
                        <span className="border-r border-gray-300 pr-2">
                          ورود
                        </span>
                      </button>
                    </Link>
                    <Link to="/cart">
                      <button className="border border-gray-300 px-3 py-1.5 text-xs rounded flex items-center gap-1 hover:bg-gray-50 transition-colors hover:border-red-500 hover:text-red-500">
                        <TfiShoppingCart className="w-3.5 h-3.5" />
                        <span>سبد خرید</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-4">
                    {titleHeaderData?.map((itemt) => (
                      <div
                        key={`category-${itemt.id}`}
                        className="relative group"
                        onMouseEnter={() => handleMouseEnter(itemt.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="flex items-center gap-1 cursor-pointer font-medium hover:text-red-500 transition-colors">
                          <img
                            className="w-4 h-4"
                            src={itemt.img}
                            alt={itemt.text}
                          />
                          <span className="relative after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
                            {itemt.text}
                          </span>
                        </div>

                        {itemt.children && (
                          <div
                            className={`absolute top-full right-0 w-[52rem] bg-white shadow-xl rounded-lg transition-all duration-300 ${
                              activeMenu === itemt.id
                                ? "opacity-100 visible translate-y-0"
                                : "opacity-0 invisible -translate-y-2"
                            }`}
                          >
                            {openNav === itemt.id && (
                              <div className="flex h-96 overflow-hidden">
                                <div className="w-52 bg-gray-50 rounded-r-lg overflow-y-auto">
                                  {itemt.children.map((child) => (
                                    <div
                                      key={child.id}
                                      className={`p-3 cursor-pointer hover:bg-white transition-colors ${
                                        activeCategory === child.id
                                          ? "bg-white"
                                          : ""
                                      }`}
                                      onMouseEnter={() =>
                                        setActiveCategory(child.id)
                                      }
                                    >
                                      <h2 className="font-medium text-gray-800 hover:text-red-500 transition-colors">
                                        {child.title}
                                      </h2>
                                    </div>
                                  ))}
                                </div>

                                <div className="flex-1 p-5 overflow-y-auto">
                                  {itemt.children.map((child) => (
                                    <div
                                      key={child.id}
                                      className={`${
                                        activeCategory === child.id
                                          ? "block"
                                          : "hidden"
                                      }`}
                                    >
                                      <div className="grid grid-cols-2 gap-4">
                                        {child.childernb?.map((childb) => (
                                          <div
                                            key={childb.id}
                                            className="mb-4 hover:bg-gray-50 p-2 rounded transition-colors"
                                          >
                                            <h3 className="font-medium text-gray-800 hover:text-red-500 transition-colors">
                                              {childb.title}
                                            </h3>
                                            <p className="text-gray-600 text-xs">
                                              {childb.text}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="h-5 w-px bg-gray-300 mx-2"></div>

                  <div className="flex items-center gap-4">
                    {headerData?.map((item) => (
                      <Link
                        key={`quicklink-${item.id}`}
                        to={item.link}
                        className="flex items-center gap-1 text-sm hover:text-red-500 transition-colors"
                      >
                        <img
                          className="w-4 h-3"
                          src={item.img}
                          alt={item.text}
                        />
                        <span className="relative after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full">
                          {item.text}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="text-sm font-bold">
                  <span className="hover:text-red-500 transition-colors cursor-pointer">
                    ارسال به تهران،تهران
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex-1 relative">
                <form className="flex items-center">
                  <input
                    type="text"
                    placeholder="جستجو در دیجی‌کالا ..."
                    className="w-full h-10 bg-gray-50 rounded-lg pr-10 pl-3 outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 border border-gray-200 focus:border-red-500 text-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() =>
                      setTimeout(() => setIsSearchFocused(false), 200)
                    }
                  />
                  <button
                    type="submit"
                    className="ml-3 hover:text-red-500 transition-colors"
                  >
                    <IoSearch className="w-4 h-4 text-gray-500" />
                  </button>
                </form>

                {isSearchFocused && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-md border border-gray-200 max-h-[400px] overflow-y-auto z-50">
                    {loading && (
                      <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                      </div>
                    )}
                    {error && (
                      <div className="text-red-500 text-center p-4 text-base">
                        <p>خطا در دریافت اطلاعات: {error}</p>
                      </div>
                    )}
                    {!loading && !error && filteredProducts.length === 0 && (
                      <div className="text-center p-4 text-gray-500 text-base">
                        <p>محصولی با این مشخصات یافت نشد</p>
                      </div>
                    )}
                    {!loading && !error && filteredProducts.length > 0 && (
                      <div className="p-4">
                        <div className="space-y-2">
                          {filteredProducts.map((item) => (
                            <Link
                              key={item.id}
                              to={`/product/${item.id}`}
                              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-12 h-12 object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-medium text-gray-800 line-clamp-2">
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

              <button className="p-2 relative">
                <IoMdNotificationsOutline className="w-6 h-6" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {isMobileMenuOpen && (
              <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <FaRegUser className="w-5 h-5" />
                      <span>ورود / ثبت نام</span>
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <TfiShoppingCart className="w-5 h-5" />
                      <span>سبد خرید</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">دسته بندی ها</h3>
                    <div className="space-y-2">
                      {titleHeaderData?.map((itemt) => (
                        <div key={itemt.id} className="pl-4">
                          <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <img
                              className="w-4 h-4"
                              src={itemt.img}
                              alt={itemt.text}
                            />
                            <span>{itemt.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">لینک های سریع</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {headerData?.map((item) => (
                        <Link
                          key={item.id}
                          to={item.link}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm"
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
