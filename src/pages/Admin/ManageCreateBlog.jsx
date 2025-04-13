import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../../components/Admin/AdminMenu";
import {
  FaSpinner,
  FaHeading,
  FaParagraph,
  FaImage,
  FaLink,
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaUnderline,
  FaHighlighter,
} from "react-icons/fa";

const ManageCreateBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    date: "",
    author: "",
    category: "",
    excerpt: "",
  });

  const [editorState, setEditorState] = useState({
    selectedElement: "p",
    showElementMenu: false,
    cursorPosition: { x: 0, y: 0 },
    previewMode: false,
  });

  const handleElementSelect = (element) => {
    const textarea = document.getElementById("content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);

    let newText;
    switch (element) {
      case "img":
        const imageUrl = prompt("لطفا آدرس تصویر را وارد کنید:");
        const imageAlt = prompt("توضیحات تصویر (alt) را وارد کنید:");
        if (imageUrl) {
          newText =
            formData.content.substring(0, start) +
            `<img src="${imageUrl}" alt="${
              imageAlt || "تصویر"
            }" loading="lazy" class="w-full rounded-lg my-4" />` +
            formData.content.substring(end);
        }
        break;

      case "a":
        const url = prompt("لطفا آدرس لینک را وارد کنید:");
        const title = prompt("عنوان لینک را وارد کنید:");
        if (url) {
          newText =
            formData.content.substring(0, start) +
            `<a href="${url}" title="${
              title || selectedText
            }" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">${
              selectedText || url
            }</a>` +
            formData.content.substring(end);
        }
        break;

      case "ul":
        newText =
          formData.content.substring(0, start) +
          `<ul class="list-disc mr-6 my-4 space-y-2">
  <li>${selectedText || "آیتم لیست"}</li>
</ul>` +
          formData.content.substring(end);
        break;

      case "ol":
        newText =
          formData.content.substring(0, start) +
          `<ol class="list-decimal mr-6 my-4 space-y-2">
  <li>${selectedText || "آیتم لیست"}</li>
</ol>` +
          formData.content.substring(end);
        break;

      case "quote":
        newText =
          formData.content.substring(0, start) +
          `<blockquote class="border-r-4 border-blue-500 pr-4 my-4 italic text-gray-700">
  ${selectedText || "نقل قول"}
</blockquote>` +
          formData.content.substring(end);
        break;

      case "code":
        newText =
          formData.content.substring(0, start) +
          `<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
<code>${selectedText || "کد"}</code>
</pre>` +
          formData.content.substring(end);
        break;

      case "bold":
        newText =
          formData.content.substring(0, start) +
          `<strong>${selectedText}</strong>` +
          formData.content.substring(end);
        break;

      case "italic":
        newText =
          formData.content.substring(0, start) +
          `<em>${selectedText}</em>` +
          formData.content.substring(end);
        break;

      case "underline":
        newText =
          formData.content.substring(0, start) +
          `<u>${selectedText}</u>` +
          formData.content.substring(end);
        break;

      case "highlight":
        newText =
          formData.content.substring(0, start) +
          `<mark class="bg-yellow-200">${selectedText}</mark>` +
          formData.content.substring(end);
        break;

      default:
        newText =
          formData.content.substring(0, start) +
          `<${element} class="mb-4">${selectedText}</${element}>` +
          formData.content.substring(end);
    }

    if (newText) {
      setFormData((prev) => ({ ...prev, content: newText }));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["blog-create"],
    mutationFn: async (data) => {
      try {
        let response = await fetch(
          "https://67f518d0913986b16fa337be.mockapi.io/Blog",
          {
            method: "POST",
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
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/manage/blog");
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

  const togglePreview = () => {
    setEditorState((prev) => ({ ...prev, previewMode: !prev.previewMode }));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">ایجاد وبلاگ جدید</h1>
          <AdminMenu />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              عنوان وبلاگ
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
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700"
            >
              خلاصه
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              محتوا
            </label>
            <button
              type="button"
              onClick={togglePreview}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              {editorState.previewMode ? "حالت ویرایش" : "پیش‌نمایش"}
            </button>
          </div>
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-lg">
              <div className="flex gap-2 border-l border-gray-300 pl-2">
                {["h1", "h2", "h3"].map((element) => (
                  <button
                    key={element}
                    type="button"
                    onClick={() => handleElementSelect(element)}
                    className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                    title={`تیتر ${element}`}
                  >
                    <FaHeading className="inline" /> {element}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 border-l border-gray-300 pl-2">
                <button
                  type="button"
                  onClick={() => handleElementSelect("bold")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="متن ضخیم"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("italic")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="متن مورب"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("underline")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="زیر خط‌دار"
                >
                  <FaUnderline />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("highlight")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="هایلایت"
                >
                  <FaHighlighter />
                </button>
              </div>

              <div className="flex gap-2 border-l border-gray-300 pl-2">
                <button
                  type="button"
                  onClick={() => handleElementSelect("p")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="پاراگراف"
                >
                  <FaParagraph />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("ul")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="لیست نامرتب"
                >
                  <FaListUl />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("ol")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="لیست مرتب"
                >
                  <FaListOl />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("quote")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="نقل قول"
                >
                  <FaQuoteRight />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleElementSelect("img")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="افزودن تصویر"
                >
                  <FaImage />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("a")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="افزودن لینک"
                >
                  <FaLink />
                </button>
                <button
                  type="button"
                  onClick={() => handleElementSelect("code")}
                  className="p-2 text-sm bg-white rounded hover:bg-gray-100"
                  title="بلوک کد"
                >
                  <FaCode />
                </button>
              </div>
            </div>

            {editorState.previewMode ? (
              <div
                className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            ) : (
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="محتوای HTML را وارد کنید..."
                dir="ltr"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              لینک تصویر شاخص
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              تاریخ
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              نویسنده
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              دسته‌بندی
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/manage/blog")}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
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

export default ManageCreateBlog;
