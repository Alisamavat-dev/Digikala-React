const Card = ({
  imageUrl,
  title,
  discount,
  button,
  children,
  styles = null,
}) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">

      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        <div className="mt-4 space-y-2">{discount}</div>

        <div className="mt-4 flex items-center justify-end gap-2">
          {children}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default Card;
