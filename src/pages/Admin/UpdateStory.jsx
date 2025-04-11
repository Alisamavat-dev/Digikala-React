import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import AdminMenu from "../../components/Admin/AdminMenu";

const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    video: "",
  });

  const { data: story, isPending: isStoryLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      try {
        let data = await fetch(
          `https://676d71200e299dd2ddff8fef.mockapi.io/story/${id}`
        );
        let res = await data.json();
        return res;
      } catch (error) {
        return error;
      }
    },
  });

  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title || "",
        img: story.img || "",
        video: story.video || "",
      });
    }
  }, [story]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["story-update"],
    mutationFn: async (data) => {
      try {
        let response = await fetch(
          `https://676d71200e299dd2ddff8fef.mockapi.io/story/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        let res = await response.json();
        return res;
      } catch (error) {
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      navigate("/manage/stories");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isStoryLoading) {
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <FaSpinner size={44} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">ویرایش استوری</h1>
          <AdminMenu />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            عنوان استوری
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
            آدرس تصویر
          </label>
          <input
            type="url"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="video"
            className="block text-sm font-medium text-gray-700"
          >
            آدرس ویدیو (اختیاری)
          </label>
          <input
            type="url"
            id="video"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/manage/stories")}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                در حال ذخیره...
              </span>
            ) : (
              "ذخیره"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStory;
