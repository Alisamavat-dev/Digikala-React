import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Footer = () => {
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
    <>
      {/* Mobile Footer */}
      <footer className="md:hidden">
        <div className="flex justify-around w-full bottom-0 bg-white h-16 border-[2px] border-gray-200 z-[1000]">
          <Link to="/" className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-xs text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 18.172v-6.586l1.293 1.293 1.414-1.415-8.586-8.585a3 3 0 00-4.242 0l-8.586 8.585 1.414 1.415L4 11.586v6.586a3 3 0 003 3h10a3 3 0 003-3zm-14 0V9.586l5.293-5.293a1 1 0 011.414 0L18 9.586v8.586a1 1 0 01-1 1H7a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-center text-xs text-gray-400">
                <h2>خانه</h2>
              </div>
            </div>
          </Link>

          <Link
            to="/category"
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-xs text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zM4 9V4h5v5H4zm17 4a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1h7zm-3.5-2a4.5 4.5 0 110-9 4.5 4.5 0 010 9zM20 6.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM6.5 22a4.5 4.5 0 110-9 4.5 4.5 0 010 9zM9 17.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm6 2.5v-5h5v5h-5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-center text-xs text-gray-400">
                <h2>دسته بندی</h2>
              </div>
            </div>
          </Link>

          <Link
            to="/basket"
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-xs text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 4h2V2h-3a1 1 0 00-1 1v1H3a1 1 0 00-.995 1.1l1 10A1 1 0 004 16h15a1 1 0 001-1V4zm-2 17a2 2 0 110-4 2 2 0 010 4zM5 21a2 2 0 110-4 2 2 0 010 4zm13-7V6H4.105l.8 8H18z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-center text-xs text-gray-400">
                <h2>سبد خرید</h2>
              </div>
            </div>
          </Link>

          <Link
            to="/signin"
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-xs text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a5 5 0 015 5v1A5 5 0 017 8V7a5 5 0 015-5zm9.996 18.908C21.572 16.318 18.096 14 12 14c-6.095 0-9.572 2.318-9.996 6.908A1 1 0 003 22h18a1 1 0 00.996-1.092zM4.188 20c.728-2.677 3.231-4 7.812-4 4.58 0 7.084 1.323 7.812 4H4.188zM9 7a3 3 0 116 0v1a3 3 0 01-6 0V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-center text-xs text-gray-400">
                <h2>دیجیکالا</h2>
              </div>
            </div>
          </Link>
        </div>
      </footer>

      {/* Desktop Footer */}
      <footer className="bg-gray-100 hidden md:block">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex justify-start">
            <div className="p-5">
              <img src={readings?.[0]?.logo} className="w-52" alt="logo" />
            </div>
          </div>

          <div className="max-w-[1500px] mx-auto">
            <div className="flex justify-start gap-5">
              <p className="text-gray-500 text-sm">
                {readings?.[0]?.phone} تلفن پشتیبانی
              </p>
              <hr className="text-gray-500" />
              <p className="text-gray-500 text-sm">{readings?.[0]?.phone}</p>
              <hr className="text-gray-500" />
              <p className="text-gray-500 text-sm">
                ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
              </p>
            </div>
          </div>

          <div className="flex justify-around max-w-[1700px] mx-auto p-12">
            <div className="flex flex-col items-center">
              <img
                src="https://www.digikala.com/statics/img/svg/footer/express-delivery.svg"
                alt="express"
              />
              <p className="text-center overflow-hidden text-ellipsis text-[8px] md:text-[13px]">
                امکان تحویل اکسپرس
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://www.digikala.com/statics/img/svg/footer/cash-on-delivery.svg"
                alt="cash"
              />
              <p className="text-center overflow-hidden text-ellipsis text-[8px] md:text-[13px]">
                امکان پرداخت در محل
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://www.digikala.com/statics/img/svg/footer/support.svg"
                alt="support"
              />
              <p className="text-center overflow-hidden text-ellipsis text-[8px] md:text-[13px]">
                هر روز هفته 24 ساعته
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://www.digikala.com/statics/img/svg/footer/days-return.svg"
                alt="return"
              />
              <p className="text-center overflow-hidden text-ellipsis text-[8px] md:text-[13px]">
                هفت روز ضمانت بازگشت کالا
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://www.digikala.com/statics/img/svg/footer/original-products.svg"
                alt="original"
              />
              <p className="text-center overflow-hidden text-ellipsis text-[8px] md:text-[13px]">
                ضمانت اصل بودن کالا
              </p>
            </div>
          </div>

          <div className="p-3 flex justify-center text-[8px] md:text-[13px]">
            <div className="grid grid-cols-4 w-full max-w-[1700px] mx-auto">
              <div>
                <h5 className="mb-2.5 font-bold text-gray-600">با دیجی کالا</h5>
                <ul className="space-y-2">
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      اتاق خبر دیجی کالا
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      فروش در دیجی کالا
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      فرصت های شغلی
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      گزارش تخلف در دیجی کالا
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      تماس با دیجی کالا
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      درباره دیجی کالا
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="mb-2.5 font-bold text-gray-600">
                  خدمات مشتریان
                </h5>
                <ul className="space-y-2">
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      پاسخ به پرسش های متداول
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      رویه های بازگرداندن کالا
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      شرایط استفاده
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      حریم خصوصی
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      گزارش باگ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="mb-2.5 font-bold text-gray-600">
                  راهنمای خرید از دیجی کالا
                </h5>
                <ul className="space-y-2">
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      نحوه ثبت سفارش
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      رویه ارسال سفارش
                    </Link>
                  </li>
                  <li>
                    <Link to={readings?.[0]?.link} className="text-gray-600">
                      شیوه پرداخت
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-gray-600 mb-2.5 font-bold">
                  همراه ما باشید!
                </h5>
                <ul>
                  <li className="flex">
                    <div>
                      <Link to={readings?.[0]?.link}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 fill-gray-400"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.033 3H7.967A4.973 4.973 0 003 7.967v8.066A4.973 4.973 0 007.967 21h8.066A4.973 4.973 0 0021 16.033V7.967A4.973 4.973 0 0016.033 3zm3.37 13.033a3.374 3.374 0 01-3.37 3.37H7.967a3.374 3.374 0 01-3.37-3.37V7.967a3.374 3.374 0 013.37-3.37h8.066a3.374 3.374 0 013.37 3.37v8.066zM7.362 12A4.643 4.643 0 0112 7.362 4.643 4.643 0 0116.638 12 4.643 4.643 0 0112 16.638 4.643 4.643 0 017.362 12zM12 15.041a3.044 3.044 0 01-3.041-3.04A3.045 3.045 0 0112 8.958 3.045 3.045 0 0115.041 12 3.044 3.044 0 0112 15.041zm4.005-8.69c.218-.219.52-.343.828-.343.308 0 .61.124.828.343a1.176 1.176 0 010 1.656c-.218.218-.52.343-.828.343a1.18 1.18 0 01-.828-.343 1.18 1.18 0 01-.343-.828c0-.309.125-.611.343-.828z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div>
                      <Link to={readings?.[0]?.link}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 fill-gray-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 6.73a7.374 7.374 0 01-2.12.581 3.708 3.708 0 001.623-2.041 7.444 7.444 0 01-2.346.896 3.693 3.693 0 00-6.292 3.367 10.483 10.483 0 01-7.61-3.858 3.665 3.665 0 00-.5 1.856 3.69 3.69 0 001.642 3.073 3.692 3.692 0 01-1.673-.464v.046a3.696 3.696 0 002.962 3.621c-.31.083-.636.13-.973.13-.238 0-.47-.024-.695-.07a3.695 3.695 0 003.448 2.565 7.409 7.409 0 01-4.585 1.579c-.298 0-.592-.018-.881-.051a10.437 10.437 0 005.66 1.661c6.793 0 10.506-5.626 10.506-10.505l-.013-.478A7.373 7.373 0 0021 6.73z" />
                        </svg>
                      </Link>
                    </div>
                    <div>
                      <Link to={readings?.[0]?.link}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 fill-gray-400"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.4 4h19.2C26.92 4 28 5.08 28 6.4v19.2c0 1.32-1.08 2.4-2.4 2.4H6.4C5.08 28 4 26.92 4 25.6V6.4C4 5.08 5.08 4 6.4 4zm1.2 20.4h3.6V13.6H7.6v10.8zm1.8-12.84c-1.2 0-2.16-.96-2.16-2.16 0-1.2.96-2.16 2.16-2.16 1.2 0 2.16.96 2.16 2.16 0 1.2-.96 2.16-2.16 2.16zM20.8 24.4h3.6v-6.84c0-2.28-1.92-4.2-4.2-4.2-1.08 0-2.4.72-3 1.68V13.6h-3.6v10.8h3.6v-6.36c0-.96.84-1.8 1.8-1.8.96 0 1.8.84 1.8 1.8v6.36z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div>
                      <Link to={readings?.[0]?.link}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 fill-gray-400"
                          viewBox="0 0 33 32"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.58 4.07a5.768 5.768 0 00-.804.33c-.66.324-1.321.978-1.626 1.609-.172.347-.546 1.597-.804 2.667-.029.11.184-.075.781-.671 1.184-1.192 2.31-1.95 3.763-2.546.65-.266 1.92-.625 2.47-.7.168-.024.294-.052.277-.064a28.734 28.734 0 00-1.195-.347c-1.046-.284-1.241-.319-1.856-.342-.494-.017-.781 0-1.005.064zm1.207 2.523a10.498 10.498 0 013.493-.984 10.5 10.5 0 016.877 1.76c2.333 1.573 3.861 3.911 4.436 6.77.149.746.149 2.957 0 3.703-.575 2.859-2.103 5.197-4.436 6.77a10.405 10.405 0 01-10.37.776 10.4 10.4 0 01-5.831-7.899c-.11-.74-.11-2.257 0-2.997a10.399 10.399 0 015.831-7.9zm4.395 5.463c.408-1.592-.643-3.276-2.258-3.611-.994-.209-1.947.086-2.688.827-1.173 1.18-1.178 2.969-.018 4.138 1.615 1.626 4.39.868 4.964-1.354zm5.332-2.142c1.333.348 2.223 1.482 2.223 2.83 0 .874-.247 1.499-.833 2.09-.402.404-.89.682-1.413.81-.724.167-1.333.092-2.04-.261-1.149-.567-1.81-1.898-1.557-3.13.132-.649.35-1.06.816-1.534.603-.608 1.224-.874 2.068-.886.224-.005.558.035.736.081zm-3.982 6.111c0-.463-.27-.885-.706-1.11-1.08-.562-2.264.566-1.758 1.683.155.347.258.457.597.614.902.428 1.867-.186 1.867-1.187zm-5.165.284c.173.029.523.162.776.289 1.149.567 1.81 1.898 1.557 3.13-.132.649-.35 1.06-.816 1.534-.942.955-2.258 1.163-3.464.55-1.546-.787-2.057-2.83-1.069-4.277.66-.954 1.85-1.44 3.016-1.226zm9.813 4.93c.316-1.522-.643-3.055-2.154-3.449a2.991 2.991 0 00-2.838.776 2.935 2.935 0 00.017 4.172c.89.897 2.24 1.11 3.43.532.695-.335 1.379-1.238 1.545-2.031zM23.48 7.212c-.144-.104-.259-.208-.259-.231 0-.024.172.011.39.069.213.058.8.214 1.305.347 1.23.319 1.746.579 2.327 1.152a3.627 3.627 0 011.091 2.639c0 .457-.046.694-.367 1.932a46.007 46.007 0 01-.397 1.435c-.017.012-.057-.167-.098-.399-.235-1.504-.89-3.165-1.723-4.41-.609-.92-1.614-2.036-2.27-2.534zM4.893 17.831c0 .023-.144.578-.316 1.238-.27 1.036-.316 1.273-.316 1.725 0 1.024.373 1.92 1.086 2.632.614.608 1.028.81 2.545 1.216.672.179 1.235.318 1.246.312.012-.011-.051-.08-.143-.15-.322-.25-1.362-1.296-1.707-1.725-1.05-1.302-1.867-3.026-2.223-4.664-.103-.492-.172-.717-.172-.584zm19.442 6.151c.287-.295.626-.671.752-.84.127-.161.236-.277.247-.248.023.07-.591 2.367-.74 2.755-.288.787-.995 1.545-1.788 1.938-1.074.532-1.786.544-3.55.07-1.334-.358-1.333-.36-1.31-.382a5.53 5.53 0 01.62-.145 11.493 11.493 0 005.769-3.148z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </li>
                  <div className="flex justify-start">
                    <h2 className="text-gray-600 text-center font-bold">
                      با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
                    </h2>
                  </div>
                  <li className="flex justify-start gap-3 p-3 bg-gray-100 rounded-lg">
                    <input
                      type="text"
                      placeholder="ایمیل شما"
                      className="w-full p-2 rounded-md border border-gray-300 bg-slate-100"
                    />
                    <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-300">
                      ثبت
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-[1700px] mx-auto">
            <div className="bg-slate-600 rounded-lg">
              <div className="flex justify-between">
                <div className="flex">
                  <img
                    className="w-10 m-5"
                    src="https://www.digikala.com/statics/img/png/footerlogo2.webp"
                    alt="digikala"
                  />
                  <h2 className="text-white m-6 font-bold">
                    دانلود اپلیکیشن دیجی کالا
                  </h2>
                </div>
                <div className="flex justify-end">
                  <img
                    className="m-3 w-28"
                    src="https://www.digikala.com/statics/img/svg/appStores/coffe-bazzar.svg"
                    alt="coffe-bazzar"
                  />
                  <img
                    className="m-3 w-32"
                    src="https://www.digikala.com/statics/img/svg/appStores/myket.svg"
                    alt="myket"
                  />
                  <img
                    className="m-3 w-32"
                    src="https://www.digikala.com/statics/img/svg/appStores/sib-app.svg"
                    alt="sib-app"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto">
            <div>
              <div className="flex justify-between">
                <div className="block text-[8px] md:text-[13px]">
                  <p className="text-gray-600 m-6">
                    یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند
                    کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمان ی
                    کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته
                    باشد؛ ویژگی‌هایی که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر
                    روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را
                    داشته باشد.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto border border-gray-300 p-5">
            <div>
              <div className="flex justify-center">
                <h2 className="text-gray-600 m-6 text-[8px] md:text-[13px]">
                  برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر
                  «منبع» کافیست. تمام حقوق اين وب‌سايت نیز برای شرکت نوآوران فن
                  آوازه (فروشگاه آنلاین دیجی‌کالا) است.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
