import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "../../components/Home/Footer/Footer";
import Header from "../../components/Home/Header/Header";

const BlogPost = () => {
  const { id } = useParams();

  const {
    data: blogPost,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      const response = await fetch(
        `https://67f518d0913986b16fa337be.mockapi.io/Blog/${id}`
      );
      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات مقاله");
        console.log();
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
    <div>
      <Header />
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out"
          >
            <FaArrowRight className="ml-2" />
            بازگشت به لیست مقالات
          </Link>
        </div>

        <article className="bg-white overflow-hidden mx-auto">
          <div className="relative h-96">
            <img
              src={blogPost.image || "https://via.placeholder.com/800x400"}
              alt={blogPost.title}
              className="max-w-5xl w-full h-full object-cover mx-auto"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400";
              }}
            />
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              {blogPost.title}
            </h1>

            <div className="flex items-center text-gray-500 mb-8 justify-center">
              <div className="flex items-center ml-6">
                <FaCalendarAlt className="ml-2" />
                <span>{blogPost.date || "تاریخ نامشخص"}</span>
              </div>
              <div className="flex items-center">
                <FaUser className="ml-2" />
                <span>{blogPost.author || "نویسنده نامشخص"}</span>
              </div>
            </div>

            <div
              className="max-w-5xl mx-auto text-justify"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>
        </article>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
          >
            مشاهده تمام مقالات
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
