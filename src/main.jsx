import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Router from "./router/Router.jsx";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  </StrictMode>
);
