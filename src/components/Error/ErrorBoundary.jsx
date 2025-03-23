import { useAsyncError } from "react-router";

const ErrorBoundary = () => {
  let error = useAsyncError();
  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f0f0] text-[#333]">
      <h1>Oops! Something went wrong.</h1>
      <p>
        {error.message}
      </p>
    </div>
  );
};

export default ErrorBoundary;