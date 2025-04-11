import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronUp,
  FaNewspaper,
  FaVideo,
  FaImage,
  FaUser,
  FaShoppingCart,
  FaComments,
} from "react-icons/fa";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: "محصولات",
      icon: <FaShoppingCart className="text-lg" />,
      path: "/manage",
    },
    {
      title: "استوری‌ها",
      icon: <FaImage className="text-lg" />,
      path: "/manage/stories",
    },
    {
      title: "ویدیوها",
      icon: <FaVideo className="text-lg" />,
      path: "/manage/videos",
    },
    {
      title: "اخبار",
      icon: <FaNewspaper className="text-lg" />,
      path: "/manage/news",
    },
    {
      title: "وبلاگ‌ها",
      icon: <FaNewspaper className="text-lg" />,
      path: "/manage/blog",
    },
    {
      title: "کاربران",
      icon: <FaUser className="text-lg" />,
      path: "/manage/users",
    },
    {
      title: "نظرات",
      icon: <FaComments className="text-lg" />,
      path: "/manage/comments",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        <span>مدیریت بخش‌ها</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
