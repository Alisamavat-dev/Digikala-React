import { Link, Outlet } from "react-router-dom";
import { FaPlus, FaHome, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import BackgroundSVG from "../../components/BackgroundSVG";

const ManageLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BackgroundSVG />
      <div className="relative">
        {/* Header */}
        <header className="sticky top-0 z-50">
          <nav className="bg-white/80 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                  >
                    <img
                      src="https://www.digikala.com/statics/img/svg/logo.svg"
                      alt="logo"
                      className="h-8"
                    />
                    <span className="hidden md:block">صفحه اصلی</span>
                  </Link>
                  <div className="flex gap-2">
                    <Link
                      to="/manage"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-300"
                    >
                      <FaHome className="text-lg" />
                      <span className="hidden md:block">داشبورد</span>
                    </Link>
                    <Link
                      to="/manage/create"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-green-600 hover:bg-green-50 transition-all duration-300"
                    >
                      <FaPlus className="text-lg" />
                      <span className="hidden md:block">محصول جدید</span>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUserCog className="text-lg" />
                    <span className="hidden md:block">مدیر سیستم</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-300"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="hidden md:block">خروج</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-md shadow-md mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} پنل مدیریت دیجی‌کالا. تمامی حقوق
              محفوظ است.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ManageLayout;
