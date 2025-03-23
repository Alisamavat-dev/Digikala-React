import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-10">
      <div className="bg-white rounded-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 bg-white/80 hover:bg-white rounded-full p-1 transition-all duration-200 shadow-sm hover:shadow-md z-10"
        >
          <IoClose size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
