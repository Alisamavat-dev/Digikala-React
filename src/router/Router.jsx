import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/Error/ErrorBoundary";
import Home from "../page/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
]);

export default Router;
