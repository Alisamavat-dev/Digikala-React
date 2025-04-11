import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import ErrorBoundary from "../Error/ErrorBoundary";
import Login from "../../pages/Log/Login";
import ManageLayout from "../../pages/Admin/ManageLayout";
import ManageList from "../../pages/Admin/ManageList";
import ManageCreate from "../../pages/Admin/ManageCreate";
import ManageUpdate from "../../pages/Admin/ManageUpdate";
import ManageStories from "../../pages/Admin/ManageStories";
import CreateStory from "../../pages/Admin/CreateStory";
import UpdateStory from "../../pages/Admin/UpdateStory";
import Blog from "../../pages/Blog/Blog";
import BlogPost from "../../pages/Blog/BlogPost";
import ProductDetails from "../../pages/Product/ProductDetails";
import ManageBlogList from "../../pages/Admin/ManageBlogList";
import ManageCreateBlog from "../../pages/Admin/ManageCreateBlog";
import ManageUpdateBlog from "../../pages/Admin/ManageUpdateBlog";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/blog/:id",
    element: <BlogPost />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/manage",
    element: <ManageLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <ManageList />,
      },
      {
        path: "create",
        element: <ManageCreate />,
      },
      {
        path: "update/:id",
        element: <ManageUpdate />,
      },
      {
        path: "stories",
        element: <ManageStories />,
      },
      {
        path: "stories/create",
        element: <CreateStory />,
      },
      {
        path: "stories/update/:id",
        element: <UpdateStory />,
      },
      {
        path: "blog",
        element: <ManageBlogList />,
      },
      {
        path: "blog/create",
        element: <ManageCreateBlog />,
      },
      {
        path: "blog/update/:id",
        element: <ManageUpdateBlog />,
      },
    ],
  },
]);

export default Router;
