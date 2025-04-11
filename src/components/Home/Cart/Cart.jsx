const Cart = ({ image, title = null, size = "md" }) => {
  const sizes = {
    sm: "w-10 h-10 sm:w-14 sm:h-14",
    md: "w-16 h-16 sm:w-24 sm:h-24",
    lg: "w-14 h-14 sm:w-24 sm:h-24",
  };

  const textSizes = {
    sm: "text-[9px] leading-tight sm:text-[11px] sm:leading-normal",
    md: "text-[10px] leading-tight sm:text-[13px] sm:leading-normal",
    lg: "text-[11px] leading-tight sm:text-[14px] sm:leading-normal",
  };

  return (
    <div className="flex flex-col items-center justify-center p-1 sm:p-2 md:p-10">
      <div
        className={`${sizes[size]} rounded-full overflow-hidden border border-gray-200 sm:border-2 shadow-sm sm:shadow-md transition-all duration-300 hover:shadow-md hover:scale-105`}
      >
        <img
          src={image}
          alt="Product Image"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      {title && (
        <h2
          className={`${textSizes[size]} font-medium sm:font-semibold mt-1 sm:mt-2 text-center text-gray-700 hover:text-gray-900 transition-colors duration-300 max-w-[90px] sm:max-w-[120px] truncate`}
        >
          {title}
        </h2>
      )}
    </div>
  );
};

export default Cart;
